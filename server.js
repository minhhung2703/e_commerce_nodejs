const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/addRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
dbConnect();


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})