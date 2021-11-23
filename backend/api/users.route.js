import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

router.route("/").get(UsersCtrl.apiGetUsers)
router.route("/user/:id").get(UsersCtrl.apiGetUserByID)

router.route("/user-new").post(UsersCtrl.apiAddUser)
router.route("/user-edit").put(UsersCtrl.apiUpdateUser)
router.route("/user-delete").delete(UsersCtrl.apiDeleteUser)

router.route("/validate").get(UsersCtrl.apiValidatePhoneNumber)

export default router