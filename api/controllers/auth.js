import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};
export const login = async(req, res, next) => {
    try {
        //nadjemo user-a
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) return next(createError(404, "User not found!"));

        //kriptujemo password i uporedimo sa passwordom iz baze
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user.dataValues;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: {...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};


export const logout = async(req, res, next) => {
    try {
        //ispraznimo cookie
        res
            .clearCookie("access_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            .status(200)
            .json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};