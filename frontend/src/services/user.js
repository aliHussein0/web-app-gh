import http from "../http-common";

class UserDataService {

  getAll() {
    return http.get();
  }

  validate(number) {
    return http.get(`/validate?phoneNumber=${number}`)
  }

  addUser(user){
    return http.post(`/user-new`, user)
  }

  editUser(user){
    return http.put(`/user-edit`,user)
  }

  deleteUser(user_id){
    return http.delete(`/user-delete?user_id=${user_id}`)
  }

}

export default new UserDataService();
