const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config(); // env variables

require('./db/conn'); // database initialization

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended: true , limit:'50mb'}));
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'})); // cookies

app.use('/',require('./router/home'));
app.use('/register',require('./router/register'));
app.use('/',require('./router/uploads'));
app.use('/',require('./router/stream'));
app.use('/',require('./router/signin'));
app.use('/',require('./router/search'));
app.use('/',require('./router/logout'));
app.use('/',require('./router/yourvideos'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
}) 

            