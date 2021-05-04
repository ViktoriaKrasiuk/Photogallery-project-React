import { Header } from "../Global/Header";
import { request } from '../../index.js';
import {getToken} from '../../utils/index'
import { useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import ImageListComponent from "../Global/ImageListComponent";

const SingleCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState('')
    
    const { id } = useParams();
       
     const getSingleCategory = () => {
    
        return request.get(`/api/categories/${id}`, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            }
        }).then(r =>{
          setCategoryTitle(r.data.model.title)
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
        <div>
          <h1 className='singleCategoryTitle'>{categoryTitle}</h1>
          <ImageListComponent filterByCategory={true} selectedCategoryId={id} limit={200}/>
        </div>
       </div>
        
    )
}

export default SingleCategory;