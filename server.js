const express = require('express');
const Op = require('./config/db').Op;
const app = express();

const PORT = process.env.PORT || 5000;


//Init middleware
app.use(express.json( { extended: false } ));

//Routes

app.use('/api/users',require('./routes/api/users'));  //Route for registering a user
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));



app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log('Server Running'));