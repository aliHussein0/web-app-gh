import mongodb from "mongodb"
import fetch from "node-fetch"
const ObjectId = mongodb.ObjectID
let users

export default class UsersDAO {

    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USERS_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }
    }

    static async validatePhoneNumber(phoneNumber) {

        try {
            const fetchNumInfo = await fetch(`http://apilayer.net/api/validate?access_key=6e840465394d273de8720cf183eab9a7&number=${phoneNumber}`);
            const numInfo = await fetchNumInfo.json();
            return numInfo;
        } catch (e) {
            console.error(`Unable to fetch number information, ${e}`)
        }
    }

    static async getUsers() {
        let query = {}
        let cursor
        try {
            cursor = await users
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }

        try {
            const usersList = await cursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async getUserByID(user_id) {
        let user
        try {
            user = await users.findOne({ _id: ObjectId(user_id) })
            return user
        } catch (e) {
            console.error(`Unable to get user, ${e}`)
            return user
        }

    }

    static async addUser(user, date) {
        try {
            const userDoc = {
                name: user.name,
                address: user.address,
                phoneNumber: user.phoneNumber,
                date: date
            }

            return await users.insertOne(userDoc)
        } catch (e) {
            console.log(`users collection was not added !`)
            console.error(`Unable to post user: ${e}`)
            return { error: e }
        }
    }

    static async updateUser(user, date) {
        try {
            const updateResponse = await users.updateOne(
                { _id: ObjectId(user.user_id) },
                { $set: { name: user.name, address: user.address, phoneNumber: user.phoneNumber, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update user: ${e}`)
            return { error: e }
        }
    }

    static async deleteUser(user_id) {

        try {
            const deleteResponse = await users.deleteOne({
                _id: ObjectId(user_id)
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete user: ${e}`)
            return { error: e }
        }
    }





}