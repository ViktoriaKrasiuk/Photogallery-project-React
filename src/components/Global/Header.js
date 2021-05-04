import {NavLink} from 'react-router-dom';
import '../../App.css';
import './Header.css'
import { useHistory} from 'react-router-dom';
import {removeToken} from '../../utils/index';
import {selectUser, resetUser} from "../Authorization/userSlice";
import { useSelector, useDispatch } from 'react-redux';

export const Header = () => {
    const dispatch = useDispatch()
   // const user = useSelector(selectUser)

   const history = useHistory()
     
   const goToLogin = () => {
      history.push("/login");
    };

   const toLogOut = () => {
      removeToken();
      goToLogin();
       dispatch(resetUser())
   };

   return(
        <div className='header'>
            <ul className='navigationList'>
                <li>
                    <NavLink className='navigationListLink'  to="/my_gallery" exact activeStyle={{fontWeight:700}}>My Gallery</NavLink>
                </li>
                <li>
                    <NavLink className='navigationListLink'  to="/categories" exact activeStyle={{fontWeight:700}}>Categories</NavLink>
                </li>
            </ul>
            <button className='logOutButton' type='button' onClick={toLogOut}>Log out</button>            
        </div> 
   )}

