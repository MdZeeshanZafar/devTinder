const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
app.use(express.json());

app.post("/signup", async (req,res) => {
    
    
    const user = new User(req.body)
    try {
        if(req.body?.skills.length > 10) {
            throw new Error("Skills can't be more than 10")
        }
        await user.save()
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send("Error saving the user "+ err.message)
    }
    
    
})



//Find user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    const lastName = req.body.lastName;
    
    //using findOne method (using last name)
    try {
        const user = await User.findOne({lastName : lastName})
        if(!user) {
            res.status(404).send("User not found")
        }else {
            res.send(user)
            
        }
    }
    // try {
    //     const users = await User.find({ email: userEmail})
    //     if(users.length === 0) {
    //         res.status(404).send("User not found")
    //     } else {
    //         res.send(users)
    //     }
    // } 
    catch(err) {
        res.status(400).send("Something went wrong")
    }
    
})


//Feed API (GET) get all the users

app.get("/feed", async (req, res) => {
    try{
        const user = await User.find({});
        res.send(user)
        
        
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id:userId})
        res.send("User deleted Successfully")
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message)
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId
    const data = req.body
    
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills", "age"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
            )
        if(!isUpdateAllowed) {
            throw new Error ("Update not allowed")
            }
        if(data?.skills.length > 10) {
            throw new Error("Skills can't be more than 10")
        }
        await User.findByIdAndUpdate({_id: userId}, data, {
            runValidators: true
        });
        res.send("User updated successfully");
    } catch(err) {
        res.status(400).send("Something went wrong " + err.message)
    }
})


connectDB()
    .then(() => {
        console.log("Database connection established....");
        app.listen(3000, () => {
            console.log(`Server is up and running on Port 3000...`);
        })
    })
    .catch((err) => {
        console.log("Database can't be connected: " +err.message);
    
    })
