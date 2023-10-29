const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/userModel')
const show = require('./models/showModel')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
var cors = require('cors');
const User = require('./models/userModel');
const Show = require('./models/showModel');
const app = express();
app.use(cors({
  origin: "https://netflix-kartikdhumal.vercel.app",
  methods: ["POST" , "GET"],
  credentials: true 
}));
app.use(express.json());

const PORT = 8000;


const mongoURI = 'mongodb+srv://kartikdhumal:guddupandit2023@cluster0.dtpx5rn.mongodb.net/netflixapp?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((error) => {
    console.log(`The error is ${error}`);
  });

app.listen(PORT,() => {
    console.log(`the server is running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
  try{
  res.send('Hello, World!');
  console.log("I am here");
  }
  catch(err){
    console.log(err);
  }
});

app.post('/users' , async (req,res) => {
    try{
      const bodyData = req.body;
      const user = new User(bodyData);
      const userData = await user.save();
      res.send(userData);
    }
    catch(error){
     console.log(error);
    }
  })

  app.post('/shows', async (req, res) => {
    try {
      const bodyData = req.body;
      const show = new Show(bodyData);
      const showData = await show.save();
      res.send(showData);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating the show.');
    }
  });
  


app.get('/finduser',async (req,res) => {
    try{
        const userData = await user.find().sort({ _id: -1 })
        .exec();
        res.send(userData);
      }
       catch{
       console.log(error);
      }
})

app.delete('/deleteuser/:id' , async (req,res)=>{
    try{
       const id = req.params.id;
       const userData = await User.findByIdAndDelete({_id: id});
       res.send(userData);
     }
      catch(error){
      console.log(error);
     }
  })

  app.get('/findshow',async (req,res) => {
    try{  
        const showData = await Show.find().sort({ _id: -1 })
        .exec();
        res.send(showData);
      }
       catch(error){
       console.log(error);
      }
})

app.get('/getShowUpdateData/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid ID' });
  }
  try {
    const data = await Show.findById(id);
    if (!data) {
      return res.status(404).send({ error: 'Data not found' });
    }

    res.send(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/register' , async (req,res) => {
  try{
    const email = req.body.email;
    const existingUser = await User.find({ email : email });
    if (existingUser.length > 0) {
      return res.status(400).send({  error :'User already exists' });
    } 

    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    const userid = user._id;
    console.log('Registration successful:', userData);
    res.send({ userData, userid });
  }
  catch(error){
      console.error(error);
      res.status(500).send({ error: 'Server error : Something went wrong' });
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email , password } = req.body;
    if(!email || !password ){
      return res.send({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    const userid = user._id;
    const isadmin = user.isAdmin;
    if(!user){
      return res.send({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.send({message:'Incorrect password or email' }) 
    }
     res.status(201).send({ message: "User logged in successfully", success: true ,userid , isadmin});
  } catch (error) {
    console.error(error);
  }
});

app.post('/logout', (req, res) => {
  res.status(200).send({ message: 'User logged out successfully' });
});


app.get('/fetcheditprofile/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid ID' });
  }
  try {
    const data = await User.findById(id);
    if (!data) {
      return res.status(404).send({ error: 'Data not found' });
    }

    res.send(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});
// put editshow/id
app.put('/editshow/:id' , async (req,res) => {
    try{
      const id = req.params.id;
      const showData = await Show.findByIdAndUpdate({_id: id},req.body,{new:true});
      res.send(showData);
    }
     catch{
     console.log(error);
     alert(error);
    }
  })
// put edit profile

app.put('/editprofile/:id' , async (req,res) => {
    try{
      const id = req.params.id;
      const showData = await User.findByIdAndUpdate({_id: id},req.body,{new:true});
      res.send(showData);
    }
     catch{
     console.log(error);
    }
  })

  app.get('/countAdminUsers', async (req, res) => {
    try {
      const count = await User.countDocuments({ isAdmin: false });
      res.send({ count });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });

  app.get('/countShows', async (req, res) => {
    try {
      const count = await Show.countDocuments({ isSeries : true });
      res.send({ count });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });

  app.delete('/deleteshow/:id' , async (req,res)=>{
    try{
       const id = req.params.id;
       const userData = await Show.findByIdAndDelete({_id: id});
       res.send(userData);
     }
      catch{
      console.log(error);
     }
  })

  app.get('/countMovies', async (req, res) => {
    try {
      const count = await Show.countDocuments({ isSeries : false });
      res.send({ count });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });
  
  app.get('/watch/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const showData = await Show.find({_id : id});
      res.send(showData);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred' });
    }
  });
  
  app.get('/findshow/:type', async (req, res) => {
    try {
      const type = req.params.type;
      if(type == "movie")
      {
        const showData = await Show.find({ isSeries : false});
        res.send(showData);
      }
      else if( type == "series"){
        const showData = await Show.find({ isSeries : true});
        res.send(showData);
      }
      else{
        const showData = await Show.find();
        res.send(showData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred' });
    }
  });
 
  app.get('/findgenre/:genre', async (req, res) => {
    try {
      const genre = req.params.genre;
        const genredata = await Show.find({ genre : genre});
        res.send(genredata);
      // else{
      //   const showData = await Show.find();
      //   res.send(showData);
      // }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred' });
    }
  });
