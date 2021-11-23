import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import UserDataService from "../services/user";
import Col from 'react-bootstrap/Col';

function ValidateNumber() {
  const [number, setNumber] = useState()
  const [isvalid, setIsvalid] = useState(false)
  const [show, setShow] = useState(false)
  const [countryCode, setcountryCode] = useState("")
  const [countryName, setcountryName] = useState("")
  const [providerName, setproviderName] = useState("")

  const validate = () => {
    console.log(number)
    UserDataService.validate(number)
      .then(response => {
        console.log(response.data);
        setShow(true)
        if (response.data.valid === true) {
          setIsvalid(true)
          setcountryCode(response.data.country_code)
          setcountryName(response.data.country_name)
          setproviderName(response.data.carrier)
        }else{
          setcountryCode("")
          setcountryName("")
          setproviderName("")
          setIsvalid(false)
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="container" style={{ width: "500px" }}>
      <PhoneInput style={{ width: "500px", height: "5vh", alignItems: "center", justifyContent: "center" }}
        placeholder="Enter phone number"
        value={number}
        onChange={setNumber} />

      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="button"
          onClick={validate}
          style={{ width: "500px" }}
        >
          Validate
        </button>
      </div>
      <div style={{ marginLeft: 0, width: 500, marginTop: 70 }}>
        {show === true ? (
        isvalid === true ? (
          <div>
            <p style={{ marginBottom: 40, textAlign: "center", color: "green", fontSize: 30 }}>
              <strong>This number is valid !</strong>
            </p>
            <Col style={{
              backgroundColor: "#00FFFF",
              marginBottom: 40,
              fontWeight: "bold"
            }}>
              Country Name : {countryName}
            </Col>
            <Col style={{
              backgroundColor: "#00FFFF",
              marginBottom: 40,
              fontWeight: "bold"
            }}>
              Country Code : {countryCode}
            </Col>
            <Col style={{
              backgroundColor: "#00FFFF",
              fontWeight: "bold"
            }}>
              Provider Name : {providerName}
            </Col>
          </div>
        ) : (<p style={{ marginBottom: 40, textAlign: "center", color: "Red", fontSize: 30 }}>
          <strong>This number is not valid !</strong>
        </p>)
        ) :(<p></p>)}
      </div>
    </div>
  )
}

export default ValidateNumber;