const express = require("express");
const app = express();

const PORT = 3000;

const { adminAuth, userAuth } = require('./middlewares/auth')

//Handle Auth Middleware for all type of request (Get, post, patch......)

// app.use("/admin", adminAuth)
// app.get('/user', userAuth, (req,res) =>{
//     res.send('User data sent')
// })

// app.get('/admin/getAllData', (req,res) =>{
//     res.send('All data sent')
// })

// app.get('/admin/deleteUser', (req,res) =>{
//     res.send('Deleted a user')
// })

//error handling
app.get("/getUserData", (req, res) =>{

    throw new Error("fghjk")
    res.send("User data sent")
})

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something went wrong ")
    }
})

app.listen(PORT || 3000, () => {
    console.log(`Server is up and running on Port ${PORT}.`);
    
})