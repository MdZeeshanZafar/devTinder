const express = require("express");
const app = express();

const PORT = 3000;


app.get('/user', (req,res, next) => {
    next()
    res.send('Response 1')
    
}, (req,res) => {
    res.send("Response 2")
})

app.post('/user', (req,res)=> {
    res.send("Data saved successfully to DB");
    
})

app.use("/test", (req, res) => {
    res.send("Hello from the server")
})





app.listen(PORT || 3000, () => {
    console.log(`Server is up and running on Port ${PORT}.`);
    
})