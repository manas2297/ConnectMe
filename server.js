const express = require('express');
const sequelize = require('./config/db').sequelize;
const Op = require('./config/db').Op;
const app = express();

const PORT = process.env.PORT || 5000;


//Init middleware
app.use(express.json( { extended: false } ));

//Routes

app.use('/api/users',require('./routes/api/users'));



app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log('Server Running'));