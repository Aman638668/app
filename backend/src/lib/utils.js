import jwt from 'jsonwebtoken';

export const generateToken = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevents client side JS from reading the cookie and xss attacks
        sameSite: "strict", //csrf protection , prevents cross site request forgery
        secure: process.env.NODE_ENV !== "development" // cookie will only be sent in production mode
    })

    return token;
}