const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const Chat = require('./models/chat');



const app = express();
const server = http.createServer(app);
app.use(express.json());


const io = socketIO(server, {
  cors: {
    origin: 'exp://192.168.43.143:8081',
    methods: ['GET', 'POST'],
  },
});

const corsOptions = {
// origin: 'http://localhost:19006',
origin: 'exp://192.168.43.143:8081',
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,
optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


const dbURI = 'mongodb+srv://sanamaryam:testdatabase@cluster0.hv7uxwm.mongodb.net/Project?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.set('view engine', 'ejs')
app.listen(3000);




app.get('/initial-messages', async (req, res) => {
  try {
    const { chatID } = req.query;

    // Fetch messages for the specified chatID from your database
    const chat = await Chat.findById(chatID);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const messages = chat.messages;

    res.json({ messages });
  } catch (error) {
    console.error('Error fetching initial messages:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// io.on('connection', (socket) => {
//   console.log('a user connected');

//     // Listen for incoming messages
//     socket.on('chat message', (message) => {
//       // Broadcast the message to all connected clients
//       io.emit('chat message', message);
//     });
  
//     socket.on('send message', async ({ chatID, senderID, text }) => {
//       try {
//         // Find the chat by ID
//         const chat = await Chat.findById(chatID);
    
//         if (!chat) {
//           // Return an error or handle the case when the chat is not found
//           console.error('Chat not found');
//           return;
//         }
    
//         // Add the new message to the chat
//         chat.messages.push({
//           senderId: senderID,
//           text: text,
//         });
    
//         // Save the updated chat to the database
//         await chat.save();
    
//         // Perform any additional actions related to saving to the database
    
//       } catch (error) {
//         console.error('Error saving message to the database:', error.message);
//         // Handle the error, return an error response, or perform additional actions
//       }
//     });
    

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });





//Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const TutorRoutes = require('./routes/tutors');
const StudentRoutes = require('./routes/students')
const chatRoutes = require('./routes/chat')




app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/tutor', TutorRoutes);
app.use('/student', StudentRoutes);
app.use('/chat', chatRoutes);

  





// app.get('/chat', async (req, res) => {
//   try {
//     // Replace these IDs with the actual IDs from your example
//     const tutorID = '65a5615c39d219aeba1b8792';
//     const studentID = '65a5625039d219aeba1b879c';
//     const tutorUserID = '65a5611139d219aeba1b8790';
//     const studentUserID = '65a5622939d219aeba1b879a';

//     // Create a new chat
//     const chat = new Chat({
//       tutorID: tutorID,
//       studentID: studentID,
//       messages: [
//         {
//           senderId: tutorUserID,
//           text: 'Hello from the tutor!',
//         },
//         {
//           senderId: studentUserID,
//           text: 'Hello from the student!',
//         },
//         {
//           senderId: tutorUserID,
//           text: 'How can I help you?',
//         },
//         {
//           senderId: studentUserID,
//           text: 'I have some questions about the lesson.',
//         },
//         // Add more messages as needed
//       ],
//     });

//     // Save the chat to the database
//     await chat.save();

//     console.log('Chat created successfully:', chat);
//   } catch (error) {
//     console.error('Error creating chat:', error);
//   }
// });
