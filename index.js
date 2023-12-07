const express = require('express');
const dotenv  = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');
const router = require('./transport/routes');


const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
    res.send("welcome to Time Table Maker");
})
app.use("/" ,router)

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() =>
        app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))
    )
    .catch(err => console.log(err))

