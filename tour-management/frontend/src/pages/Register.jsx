import React, { useState,useContext } from "react";
import "../style/login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link,useNavigate } from "react-router-dom";

import loginIMg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../Utilis/config";

const Register = () => {
  const [credential, setCredential] = useState({
    email: undefined,
    password: undefined,
  });

  const {dispatch} =useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res =await fetch(`${BASE_URL}/auth/register`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(credential)
      })
      const result =await res.json()
      if(!res.ok) alert(result.message)
      dispatch({type:'REGISTER_SUCESS'})
      navigate('/login')
    } catch (err) {
      alert(err.message)
    }
  };

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginIMg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Register
                  </Button>
                  <p>
                    Already have an Account ? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
