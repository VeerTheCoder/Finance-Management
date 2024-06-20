const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db.js");
const path=require('path')

dotenv.config();
connectdb();

const userRoute = require("./routes/userRoutes.js");
const transactionRoute = require("./routes/transactionRoute.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/transaction", transactionRoute);

app.use(express.static(path.join(__dirname,'./client/dist')))

app.get('*',(req,resp)=>{
resp.sendFile(path.join(__dirname,"./client/dist/index.html"))
})

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

const PORT = 8001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
