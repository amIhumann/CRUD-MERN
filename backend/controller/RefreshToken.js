import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken =async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await Users.findAll({
            where: {
                refreshToken: refreshToken
            }
        })
        if (!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const [userId, name, email] = [user[0].id, user[0].name, user[0].email]
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "20s"
            })
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}