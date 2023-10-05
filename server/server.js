const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
require("dotenv").config();
app.use(express.json());

const userRoute = require('./routes/usersRoute')
app.use('/api/users', userRoute);


app.listen(port, () => console.log(`Node JS Server Started at ${port}`));