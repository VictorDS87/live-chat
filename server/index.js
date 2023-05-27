const express = require('express');
const cors = require('cors');

const http = require('http');
const mongoose = require('mongoose');
const User = require('./models/User');

const socketIO = require('socket.io');
const bodyParser = require('body-parser');

// Express server and socket.io configuration
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Authorization'], 
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB database setup using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
  User.createIndexes();
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});


const userSockets = {};

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);
  
  io.emit('userSockets', userSockets);

  socket.on('login', ({ username }) => {
    // add the user to the list of connected users
    const socketId = socket.id;
    userSockets[username] = socketId;
  });
  

  socket.on('connectedusers', () => {
    // fetch connected users
    io.emit('userSockets', userSockets);
  });
  
  socket.on('joinPrivateRoom', ({ sender, recipient }, callback) => {
    // enter the private room
    const senderSocketId = userSockets[sender];
    const recipientSocketId = userSockets[recipient];

    if (senderSocketId && recipientSocketId) {
      const room = getPrivateRoomId(sender, recipient);
      socket.join(room);
      console.log('sucesso ao entrar na sala privada') 
    } else {
      console.log('erro ao entrar na sala privada') 
    }
  });

  socket.on('privateMessage', ({ sender, recipient, message }) => {
    // send private message
    const senderSocketId = userSockets[sender];
    const recipientSocketId = userSockets[recipient];

    if (senderSocketId && recipientSocketId) {
      const room = getPrivateRoomId(sender, recipient);
      io.to(room).emit('privateMessage', { message, sender: sender });
    }
  });

  socket.on('disconnect', () => {
    // Remove disconnected user from socket
    const username = Object.keys(userSockets).find(key => userSockets[key] === socket.id);
    if (username) {
      console.log('cheguei aqui')
      delete userSockets[username];

      io.emit('userSockets', userSockets);
    }

  });
  
});

// generate private room id
function getPrivateRoomId(user1, user2) {
  // create id based on users name
  const sortedUsers = [user1, user2].sort();
  return `${sortedUsers[0]}_${sortedUsers[1]}`;
}

app.get('/usersconnected', (req, res) => {
  const connectedUsers = Object.keys(userSockets);
  res.json(connectedUsers);
});

io.listen(3001);


app.post('/users', async (req, res) => {
  // Create new User
  try {
    const { user, nickname, password, passwordRepeat, securyQuestion, securyQuestionPassword } = req.body;

    if (password.length < 5) {
      res.status(400).json({ error: 'A senha deve ter no mínimo 5 caracteres.' });
      return;
    }

    if (password != passwordRepeat) {
      res.status(400).json({ error: 'As senhas não coincidem.' });
      return;
    }
    
    const newUser = new User({
      __user: user,
      __nickname: nickname,
      __password: password,
      __securyQuestion: securyQuestion,
      __securyQuestionPassword: securyQuestionPassword
    });

    // Save new user in db
    await newUser.save()

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Usuário já existe' });
    } else {
      res.status(500).json({ error: 'Preencha todas as informações' });
    }
  }
});

app.get('/users', (req, res) => {
  // fetch all registered users
  User.find({}, { _id: 0, __user: 1})
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Erro ao obter os usuários:', error);
      res.status(500).json({ error: 'Erro ao obter os usuários' });
    });
});

app.post('/users/login', (req, res) => {
  // Sign in to an account.
  const { user, password } = req.body;

  User.findOne({ __user: user, __password: password })
    .then((user) => {
      if (user) {
        res.sendStatus(200);

      } else {
        res.status(404).json({ error: 'Usuário ou senha incorretos' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    });
  
});

app.post('/users/login/forgetpassword', (req, res) => {
  // search for user to change password and search for security question
  const { user } = req.body;

  User.findOne({ __user: user })
    .then((user) => {
      if (user) {
        res.json({
          user: user.__user,
          securyQuestion: user.__securyQuestion
        });
      } else {
        res.status(404).json({ error: 'Usuário não existe' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    });
  
});

app.post('/users/login/forgetpassword/securyquestion', (req, res) => {
  // Check if the security question password is correct
  const { user, passwordSecuryQuestion } = req.body;

  User.findOne({ __user: user, __securyQuestionPassword: passwordSecuryQuestion })
    .then((user) => {
      if (user) {
        res.json({
          user: user.__user,
          securyQuestion: user.__securyQuestion
        });
      } else {
        res.status(404).json({ error: 'Senha incorreta' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    });
  
});

app.post('/users/login/forgetpassword/securyquestion/changepassword', (req, res) => {
  // change user password in database
  const { user, password, passwordRepeat } = req.body;

  User.findOne({ __user: user})
    .then((user) => {
      if (password.length < 5) {
        res.status(400).json({ error: 'A senha deve ter no mínimo 5 caracteres.' });
        return;
      }
  
      if (password != passwordRepeat) {
        res.status(400).json({ error: 'As senhas não coincidem.' });
        return;
      }

      user.__password = password;
      return user.save();
    })
    .then(() => {
      // updated user
      res.json('sucess');
    })
    .catch((error) => {
      // error
      res.status(500).json({ error: password });
    });
  
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});