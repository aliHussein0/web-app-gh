import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {

    static async apiValidatePhoneNumber(req, res, next) {
        try {
            const phoneNumber = req.query.phoneNumber
            const numInfo = await UsersDAO.validatePhoneNumber(phoneNumber)
            res.json(numInfo)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetUsers(req, res, next) {

        try {
            const { usersList, totalNumUsers } = await UsersDAO.getUsers();
            let response = {
                users: usersList,
                total_results: totalNumUsers,
            }
            res.json(response)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }

    }

    static async apiGetUserByID(req, res, next) {
        try {
            let user_id = req.params.id
            let user = await UsersDAO.getUserByID(user_id)
            if (!user) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(user)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }

    }

    static async apiAddUser(req, res, next) {
        try {
            const validNum = await UsersDAO.validatePhoneNumber(req.body.phoneNumber)
            if (validNum.valid == true) {
                const userInfo = {
                    name: req.body.name,
                    address: req.body.address,
                    phoneNumber: req.body.phoneNumber,
                }
                const date = new Date()

                const UserResponse = await UsersDAO.addUser(
                    userInfo,
                    date
                )
                const Response = {
                    UserResponse,
                    validNum
                }
                return res.json(Response)
            } else {
                return res.json("phone number not valid")
            }

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const validNum = await UsersDAO.validatePhoneNumber(req.body.phoneNumber)
            if (validNum.valid == true) {
                const userInfo = {
                    user_id: req.body.user_id,
                    name: req.body.name,
                    address: req.body.address,
                    phoneNumber: req.body.phoneNumber,
                }
                const date = new Date()

                const userResponse = await UsersDAO.updateUser(
                    userInfo,
                    date,
                )

                var { error } = userResponse
                if (error) {
                    res.status(400).json({ error })
                }
                const Response = {
                    status: "success",
                    validNum
                }
                return res.json(Response)
            } else {
                return res.json("phone number not valid")
            }

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const user_id = req.query.user_id
            const userResponse = await UsersDAO.deleteUser(
                user_id
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


}