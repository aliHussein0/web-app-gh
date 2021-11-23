import React, { useState, useEffect } from "react";
import UserDataService from "../services/user";
import { Link } from "react-router-dom";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        UserDataService.getAll()
            .then(response => {
                console.log(response.data);
                setUsers(response.data.users);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
      };

    const deleteUser = (e) => {
        UserDataService.deleteUser(e.target.value)
        .then(response => {
            console.log(e.target.value+ " is deleted");
            refreshList();
        })
        .catch(err => {
          console.log(err);
        });
    }

    return (
        <div>
            <div><Link to={`/users/add-user`} className="btn btn-primary btn-lg">
                Add Customer
            </Link>
            </div>
            <br />
            <div className="row">
                {users.map((user) => {
                    return (
                        <div className="col-lg-4 pb-1" key={user._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">
                                        <strong>Address: </strong>{user.address} <br />
                                        <strong>Phone Number: </strong>{user.phoneNumber}<br />
                                    </p>
                                    <div className="row">
                                        <Link to={`/users/${user._id}/edit`} className="btn btn-info col-lg-5 mx-1 mb-1" state={user}>
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger col-lg-5 mx-1 mb-1"
                                            type="button"
                                            value={user._id}
                                            onClick={deleteUser}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div>
        </div>
    );
};

export default UsersList;