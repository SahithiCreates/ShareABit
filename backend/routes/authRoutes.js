const express=require("express");
const router=express.Router();
const jwt = require("jsonwebtoken");
const User=require("../models/User");
const bcrypt = require("bcrypt");
const verifiedNgos = require("../config/verifiedNgos");


router.post("/signup",async (req,res)=>{
    try{
        console.log("came");

        const {name,email,password,role}=req.body;
    if(!name || !email || !password || !role){
        return res.status(404).json({message :"Fillup required Credentials"});
    }
    const normalizedEmail = email.trim().toLowerCase();
    if(role === "ngo" && !verifiedNgos.includes(normalizedEmail)) {
        return res.status(403).json({
        message: "NGO is not verified. Contact admin."
        });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({name,email,password: hashedPassword,role});
    const token = jwt.sign({ id: newUser._id, role: newUser.role },process.env.JWT_SECRET, { expiresIn: "1d" } );
    res.status(201).json({ message: "Signup successful!",token, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET, { expiresIn: "1d" } );
        res.status(200).json({ message: "Login successful",token,user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports=router;
