import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        //todo
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            throw err;
        }
    } else {
        return next(createError(403, "You are not authorized to update this account."));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
        //todo
        try {
            await User.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("User has been deleted");
        } catch (err) {
            throw err;
        }
    } else {
        return next(createError(403, "You are not authorized to delete this account."));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscriberCount: 1 },
        });
        res.status(200).json("Subscription successful.");
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscriberCount: -1 },
        });
        res.status(200).json("Unsubscribed.");
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });
        res.status(200).json("The video has been liked.");
    } catch (err) {
        next(err);
    }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json("The video has been disliked.");
    } catch (err) {
        next(err);
    }
};

export const count = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
