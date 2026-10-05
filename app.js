const express = require('express');
const { authRouter } = require('./routes/authRoute');
const app = express();
const cors = require('cors')
const port = 3000;

app.use(cors({ origin: ["http://localhost:5173"] }))

const passport = require("passport");
const jwtStrategry  = require("./strategies/jwt");
const { messagesRoute } = require('./routes/messagesRoute');
passport.use(jwtStrategry);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter);
app.use("/api", messagesRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});