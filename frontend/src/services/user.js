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

  /*get(id) {
    return http.get(`?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/review-new", data);
  }

  updateReview(data) {
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getCuisines() {
    return http.get(`/cuisines`);
  }
  */
}

export default new UserDataService();