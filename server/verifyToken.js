import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "Not an authenticated user."));

    jwt.verify(token, process.env.JWT, (err, user) => {
        console.log(user);
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;

        req.user.isAdmin = user.id === "64bdfb27517127dede700a2a";
        next();
    });
};
