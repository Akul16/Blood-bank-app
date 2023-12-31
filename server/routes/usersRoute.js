const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    try {
        // check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // save user
        const user = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }

        // check if userType matches
        if (user.userType !== req.body.userType) {
            return res.send({
                success: false,
                message: `User is not registered as a ${req.body.userType}`,
            });
        }

        // compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }

        // generate token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });

        return res.send({
            success: true,
            message: "User logged in successfully",
            data: token,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router