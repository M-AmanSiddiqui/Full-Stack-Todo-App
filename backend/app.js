import express from "express";
const app = express()
import ("./connection/conn.js")
import auth from "./routes/auth.js";
import list from "./routes/list.js";
app.use(express.json())

app.get("/" , (req,res) => {
  res.send("Hello Node")
    
})
app.use("/api/v1" , auth)
app.use("/api/v2" , list)
app.listen(1000, () => {
    console.log("Server started");
    
})