const router = require("express").Router();
const UserModel = require("../models/signup");
const bcrypt = require("bcrypt");

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            res.status(422).json({error: "Fill the required fields"})
        }
        const check = await UserModel.findOne({email: email});
        if(check) {
            res.status(409).json({message: "Email already exists"});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const signup = await UserModel({ email, password: hashedPassword });
            await signup.save()
            res.status(201).json({ message: "User Created Successfully"});
        }
    } catch (error) {
        console.log(error);
    }
});

// Signin Route
router.post("/signin", async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if(!user) {
            res.status(400).json({ message: "Invalid email"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            res.status(401).json({message: "Invalid password"});
        }
        if(!email || !password) {
            res.status(422).json({error: "Fill the required fields"})
        }
        res.status(200).json({_id: user._id, message: "You are now logged in successfully"});
    } catch (error) {
        console.log(error);
    }
});

// Get All Users Route
router.get("/getAllUsers", async (req, res) => {
    const allUsers = await UserModel.find();
    res.json(allUsers);
});

module.exports = router;
