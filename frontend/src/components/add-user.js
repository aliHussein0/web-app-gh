import React, { useState, useEffect } from "react";
import UserDataService from "../services/user";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const AddUser = () => {

    const location = useLocation();

    let initialUserId = ""
    let initialUserName = "";
    let initialUserAddress = "";
    let initialUserNumber = "";
    let editing = false;

    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);


    if (location.state != null) {
        editing = true;
        initialUserId = location.state._id
        initialUserName = location.state.name
        initialUserAddress = location.state.address
        initialUserNumber = location.state.phoneNumber
    }

    const [userName, setUserName] = useState(initialUserName);
    const [userAddress, setUserAddress] = useState(initialUserAddress);
    const [number, setNumber] = useState(initialUserNumber);

    useEffect(() => {
        console.log(location);
    },[location])

    const handleNameChange = event => {
        setUserName(event.target.value);
    };

    const handleAddressChange = event => {
        setUserAddress(event.target.value);
    };

    const addUser = () => {
        setSubmitted(true);
        if (userName && userAddress && number) {
            var userInfo = {
                name: userName,
                address: userAddress,
                phoneNumber: number
            }
            if (editing) {
                userInfo.user_id = initialUserId
                console.log(userInfo)
                UserDataService.editUser(userInfo)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.validNum.valid === true) {
                            setIsValid(true);

                        } else {
                            setIsValid(false)
                        }
                        setShow(true);
                    })
                    .catch(e => {
                        setIsValid(false)
                        setShow(true);
                        console.log(e);
                    });
            } else {
                UserDataService.addUser(userInfo)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.validNum.valid === true) {
                            setIsValid(true);

                        } else {
                            setIsValid(false)
                        }
                        setShow(true);
                    })
                    .catch(e => {
                        setIsValid(false)
                        setShow(true);
                        console.log(e);
                    });
            }
        }
    }


    return (
        <div>
            {isValid === false ? (
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
                        <Form.Control type="Name" placeholder="Enter name" value={userName} onChange={handleNameChange} required />
                        {userName === "" && submitted ? (
                            <p style={{ color: "#ff0000" }}>Name is Empty !</p>
                        ) : ("")}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupAddress">
                        <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                        <Form.Control type="Address" placeholder="Enter address" value={userAddress} onChange={handleAddressChange} required />
                        {userAddress === "" && submitted ? (
                            <p style={{ color: "#ff0000" }}>Address is Empty !</p>
                        ) : ("")}
                    </Form.Group>
                    <br /><p style={{ fontWeight: "bold" }}>Phone Number </p>
                    <PhoneInput style={{ width: "500px", height: "5vh", alignItems: "center", justifyContent: "center" }}
                        placeholder="Enter phone number"
                        value={number}
                        onChange={setNumber}
                        required />
                    {number === "" && submitted ? (
                        <p style={{ color: "#ff0000" }}>Phone Number is Empty !</p>
                    ) : ("")}
                    {isValid === false && submitted && show? (
                        <p style={{ color: "#ff0000" }}>Phone Number is not Valid !</p>
                    ) : ("")}
                    <div className="input-group-append" style={{ marginTop: 50 }}>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={addUser}
                            style={{ width: "100px" }}
                        >
                            {editing ? ("Edit") : ("Add")}
                        </button>
                    </div>
                </Form>
            ) : (
                <div>
                    <h4>You submitted successfully!</h4>
                    <Link to={`/users`} className="btn btn-success">
                        Back to Customers
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AddUser;