import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

//get user

export const getUser = async(req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)

        if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json("User not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


//update users
export const updateUser = async(req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus, password } = req.body;

    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })

            const token = jwt.sign({
                    username: user.username,
                    id: user._id
                },
                "MERN", { expiresIn: "1h" })
            res.status(200).json({ user, token })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied! You can only update your own profile")
    }
}

//delete user
export const deleteUser = async(req, res) => {
    const id = req.params.id

    const { currentUserId, currentUserAdminStatus } = req.body

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Acces Denied! you can only delete your own profile")
    }
}

//follow user
export const followUser = async(req, res) => {
    const id = req.params.id

    const { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {
            const userToFollow = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (!userToFollow.followers.includes(currentUserId)) {
                await userToFollow.updateOne({
                    $push: {
                        followers: currentUserId
                    }
                })
                await followingUser.updateOne({
                    $push: {
                        following: id
                    }
                })
                res.status(200).json("User followed")
            } else {
                res.status(403).json("You are already following this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


//Unfollow user
export const unFollowUser = async(req, res) => {
    const id = req.params.id

    const { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {
            const userToFollow = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (userToFollow.followers.includes(currentUserId)) {
                await userToFollow.updateOne({
                    $pull: {
                        followers: currentUserId
                    }
                })
                await followingUser.updateOne({
                    $push: {
                        following: id
                    }
                })
                res.status(200).json("User Unfollowed")
            } else {
                res.status(403).json("You are Not following this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}