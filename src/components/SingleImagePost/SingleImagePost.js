import { Header } from "../Global/Header";
import { request } from '../../index.js';
import {getToken} from '../../utils/index'
import { useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import './SingleImagePost.css'

const SingleImagePost = () => {
    const [singlePost, setSinglePost] = useState({})
    
    const { id } = useParams();
       
     const getSingleCategory = () => {
    
        return request.get(`/api/posts/${id}`, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            }
        }).then(r =>{
          setSinglePost(r.data.model)
        }).catch(e => {
           alert(e)     
        });
    }
      useEffect(() => {
        getSingleCategory()
      }, []);
      
    return(
        <div>
            <Header/>
            <div className='singleImagePostWrapper'>
              <h1>{singlePost.title||''}</h1>
              <div  className='singleImageItem' alt="Img"><img src={ singlePost.img?.filename ? `${process.env.REACT_APP_MAIN_URL}/uploads/${singlePost.img?.filename}`:null}></img></div>
            </div>
        </div>
        
    )
}

export default SingleImagePost;