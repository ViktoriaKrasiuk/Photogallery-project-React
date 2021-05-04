import { useFormik } from 'formik';
import * as Yup from 'yup'
import './AuthorizationForms.css';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  loginUserAsync,
} from './userSlice'

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToRegistration = () => {
    history.push("/registration");
  }
  const goToPhotoGallery = () =>{
    history.push("/my_gallery");
  }
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
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
    }),
    
    onSubmit: values => {
      let sendData = {
        username: values.userName,
        password: values.password
      }
      dispatch(loginUserAsync({userData: sendData, callback: goToPhotoGallery}))
    },
  });
  return (
    <div className="mainLayout">
      <form  className="loginForm" onSubmit={formik.handleSubmit}> 
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
          <div className="btnWrapper"> 
            <div>
              <button className="myBtn" type="submit">Log in</button>
            </div>
            <div>Don't have an account yet?</div> 
            <div>
              <button className="registrationBtn myBtn" type="button" onClick={goToRegistration}>Sign up</button>
            </div> 
          </div> 
        </div>      
      </form>
    </div>
  );
};

export default LoginForm