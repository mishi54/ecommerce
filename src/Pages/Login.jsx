import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/yup"; 
import mockUsers from "../mockUsers"; 
import { useAuth } from "../components/AuthContext"; 
import styled from "styled-components";
import "../style/global.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const initialValues = {
      email: "",
      password: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues,
      validationSchema: loginSchema, 
      onSubmit: (values) => handleLogin(values),
    });

    const handleLogin = (values) => {
        if (!mockUsers || mockUsers.length === 0) {
          alert("No users found.");
          return;
        }
      
        const user = mockUsers.find(
          (u) => u.email === values.email && u.password === values.password
        );

        if (user) {
          login(user);
          localStorage.setItem("token", "mockToken");
          localStorage.setItem("role", user.role);
          navigate(user.role === "admin" ? "/admin" : "/user"); 
        } else {
          alert("Invalid credentials");
        }
    };
      
    return (
        <Wrapper>
            <div className="container">
                <div className="modal">
                    <div className="modal-container">
                        <div className="modal-left">
                            <h1 className="modal-title text-center">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-block">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email ? (
                                        <p className="form-error">{errors.email}</p>
                                    ) : null}
                                </div>
                                <div className="input-block">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password ? (
                                        <p className="form-error">{errors.password}</p>
                                    ) : null}
                                </div>
                                <button type="submit">Login</button>
                            </form>
                            <p className="mt-3">Don't have an account? <a href="/signup">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

  const Wrapper = styled.section`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
 .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }
  .modal {
    width: 100%;
    /* height: 60px; */
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;

    transition-duration: 0.3s;
    background: #fff;
  }
  .modal-title {
    margin: 0;
    font-weight: 800;
    font-size:4rem;
    color: #55311c;
  }


  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .login-container h1 {
    font-weight: 400;
    color: #55311c;
    margin-bottom: 20px;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 400px; 
  }

  .input-block label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #8c7569;
    transition: 0.3s;
  }

  .input-block input {
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    width: 100%;
  }

  button {
    padding: 1.2rem 3.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background: rgba(0, 0, 255, 0.5);
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }

  button:hover {
    background: #55311c;
  }

  .login-container p {
    margin-top: 20px;
    text-align: center;
  }

  .login-container a {
    color: #8c7569;
    text-decoration: none;
    font-weight: 600;
  }
      .form-error {
    font-size: 1.4rem;
    color: #b22b27;
  }

  @media (max-width: 750px) {
    .login-container {
      padding: 20px;
    }
  }
`;
export default Login;

