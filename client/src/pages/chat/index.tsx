import { PaperPlaneRight, Power } from "phosphor-react";
import { ChatContainer, Container, Chats, ChatText, User, Text, InputText, TextArea, UserContainer, Disconnect, SendMessage } from "./styles";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io('http://localhost:3000');

interface User {
  user: string
}

interface AllUser {
  __user: string
}

interface Message {
  sender: string,
  message: string 
}
export function Chat({ user }: User) {
    const [userConnected, setUserConnected] = useState('')
    const [usersConnected, setUsersConnected] = useState(['']);
    const [selectedUser, setSelectedUser] = useState('');
    const [allUsers, setAllUsers] = useState([])
    const [messages, setMessages] = useState([]);
    
    const [socketId, setSocketId] = useState('');

    function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const message = form.message.value.trim();
        if (message !== '') {
          const sender = user;
          const recipient = selectedUser;
          socket.emit('privateMessage', { sender, recipient, message });
    
          form.message.value = '';
        }
    }

    function statusConnection(e: string) {
      if(usersConnected != undefined) {
        const user = usersConnected.find((user) => user === e);
        
        if(user == undefined) {
            return true
        }else {
            return false
        }
      }
      return false
    }

    function checkIfMessageIsAllowed() {
      const userFound = usersConnected.find(item => item === selectedUser);

      if(userFound) {
        return false
      }else {
        return true
      }

    }

    async function fetchUsers() {
      const response = await axios.get('http://localhost:3000/users')
      setAllUsers(response.data)
    }

    function joinPrivateRoom(userID: string) {
      setSelectedUser(userID);
      setMessages([]);

      const sender = user;
      const recipient = userID;
      socket.emit('joinPrivateRoom', { sender, recipient });
    }

    function messageListener(data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }

    useEffect(() => {
      setUserConnected(user)
      setSocketId(user);
      
      socket.emit('connectedusers');
      
      socket.on('userSockets', (data) => { 
        fetchUsers();
        const keys = Object.keys(data);
        setUsersConnected(keys);
      });
      
      socket.on('chat message', messageListener);
      socket.on('privateMessage', messageListener);

      return () => {
        socket.off('message');
        socket.off('chat message', messageListener);
        socket.off('privateMessage', messageListener);
      };
    }, [user]);

    return (
      <Container>
          <button onClick={() => {console.log(usersConnected)}}></button>
        <ChatContainer>
          <Chats>
            <Disconnect href="/">
              <Power size={20} />
            </Disconnect>
            {allUsers.length > 0 ?
              <UserContainer>
                {allUsers.map((user:AllUser, index) => (
                      <User 
                          key={index} 
                          disabled={statusConnection(user.__user)}
                          onClick={() => { joinPrivateRoom(user.__user) }} 
                          style={{
                              background: user.__user === selectedUser ? '#66e9bd' : '#ffffff'
                          }}
                      >
                        <h3>{user.__user} {userConnected != user.__user ? '': '(Eu)'}</h3>
                        <div>
                          <p>Hey...</p>
                          <span>16/05/2023</span>
                        </div>
                      </User>
                    
                  
                ))}
              </UserContainer>
              :
              <UserContainer>Nenhum usuário</UserContainer>
            }
          </Chats>
          <ChatText>
            <Text>
              <ul>
                {messages.map((msg: Message, index) => (
                  <li key={index} style={{
                    background: msg.sender === socketId ? '#8debbf' : '#aff8f4',
                    marginLeft: msg.sender === socketId ? '9rem' : '-2rem'
                  }}>
                    <p>{msg.sender}: {msg.message}</p>
                  </li>
                ))}
              </ul>
            </Text>
            <InputText onSubmit={sendMessage}>
              <TextArea
                name="message"
              />  
              <SendMessage disabled={checkIfMessageIsAllowed()}>
                <PaperPlaneRight />
              </SendMessage>
            </InputText>
          </ChatText>
        </ChatContainer>
      </Container>
    );
}
