const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

require('./db/conn');

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use('/',require('./router/home'));
app.use('/register',require('./router/register'));
app.use('/',require('./router/uploads'));
app.use('/',require('./router/stream'));
app.use('/',require('./router/signin'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
}) 

            