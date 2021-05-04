import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import './AuthorizationForms.css';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  registerUserAsync,
  selectUser
} from './userSlice';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const goToLogin = () => {
    history.push("/home");
  }
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''     
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .required('Please enter username')
        .min(5, 'Minimal length is 5')
        .max(16, 'Maximum length is 5'),      
      password: Yup.string()
        .required('Please enter password')
        .min(6, 'Minimal length is 6')
        .max(30, 'Maximum length is 30'),
      confirmPassword: Yup.string()
      .required('Password must match')
      .oneOf(
          [Yup.ref('password'), null],
          'Password must match'
      ), 
      firstName: Yup.string()
        .required('Please enter your first name')
        .min(5, 'Minimal length is 5')
        .max(16, 'Maximum length is 16'),
      lastName: Yup.string()
        .required('Please enter your last name')
        .min(5, 'Minimal length is 5')
        .max(16, 'Maximum length is 16'),
      phone: Yup.string()
        .required('Please enter your phone number')
        .min(7, 'Minimal length is 7')
        .max(16, 'Maximum length is 16'),          
    }),
    
    onSubmit: values => {
      let sendData = {
        username: values.userName,
        password: values.password,
        first_name: values.firstName,
        last_name: values.firstName,
        phone: values.phone
      }
      dispatch(registerUserAsync({userData: sendData, callback: goToLogin}))
    },
  });
  return (
    <div className="mainLayout">
      <form  className="registrationForm" onSubmit={formik.handleSubmit}> 
        <div className='formWrapper'>
          <div>
            <h1>My Photogallery</h1>
          </div>    
          <div className="inputWrapper">
            <div>
              <label htmlFor="userName"></label>
            </div>      
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <div>{formik.errors.userName}</div>
          </div>
        
        
          <div className="inputWrapper">
            <div>
              <label htmlFor="password"></label>
            </div>        
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password" 
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div>{formik.errors.password}</div>
          </div>
          <div className="inputWrapper">
            <div>
              <label htmlFor="confirmPassword"></label>
            </div>        
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password" 
              placeholder="confirm your password"        
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <div>{formik.errors.confirmPassword}</div>        
          </div>
          <div className="inputWrapper">
            <div>
              <label htmlFor="firstName"></label>
            </div>      
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="first name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <div>{formik.errors.firstName}</div>
          </div>
          <div className="inputWrapper">
            <div>
              <label htmlFor="lastName"></label>
            </div>        
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <div>{formik.errors.lastName}</div>
          </div>
          <div className="inputWrapper">
            <div>
              <label htmlFor="phone"></label>
            </div>        
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <div>{formik.errors.phone}</div>
          </div>
          <div className="btnWrapper"> 
            <div>
              <button className="registrationBtn myBtn" type="submit" >Register now</button>
            </div> 
            <div>Already have an account?</div>
            <div>
              <button className="myBtn" type="button" onClick={goToLogin}>Log in</button>
            </div> 
          </div> 
        </div>      
      </form>
    </div>
  );
};

export default RegistrationForm