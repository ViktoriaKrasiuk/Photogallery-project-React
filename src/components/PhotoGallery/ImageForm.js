import { useFormik } from 'formik';
import {useState, useEffect } from 'react';
import * as Yup from 'yup'
import {getSelectCategories} from '../../Requests/CategoriesRequests'


export const ImageForm = (props) => {
   const [allCategories, setAllCategories] = useState([])
   useEffect(()=>{
    getSelectCategories().then( r => setAllCategories(r.data))
   },[])

   const renderSelectCategories = () => {
    return allCategories.map(i => {
        return(
            <option key={i.id} value={i.id}>{i.title}</option>
        )
    }) 
   }

    let formikObject = {
        initialValues: {
            title: props.editedImage?.title || '',
            description: props.editedImage?.description ||  '',
            category_id: props.editedImage?.category_id || '',
            image: {}
        },
        validateOnChange: false,
        validateOnBlur: true,
        
        onSubmit: values => {    
            let formData = new FormData();
            for (let key in values) {
                let item = values[key];
                formData.append(key, item);
            }
            props.handleImageUpload(formData)  
            props.closeModal()  
        }
    }

    if (!props.editedImage) {
        formikObject.validationSchema = Yup.object().shape({
            title: Yup.string()
                .required('Please enter title'),
            description: Yup.string()
                .required('Please enter description'),
            category_id: Yup.string()
                .required('Please enter category'),
            image: Yup.string().required('Please upload image')
        })
    }

    const formik = useFormik(formikObject);

    return (
    
    <form  className="ImageForm" onSubmit={formik.handleSubmit}> 
        <div className='formWrapper'>
            <div>
                <h1>{props.title || 'Modal'}</h1>
            </div>    
            <div className="inputWrapper">
                <div>
                    <label htmlFor="title">Title</label>
                </div>      
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Image Title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <div>{formik.errors.title}</div>
            </div>
            <div className="inputWrapper">
                <div>
                    <label htmlFor="category_id">Category</label>
                </div>      
                <select
                    id="category_id"
                    name="category_id"
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                >
                    {renderSelectCategories()}
                    
                </select>
                <div>{formik.errors.category_id}</div>
            </div>
            <div className="inputWrapper">
                <div>
                    <label htmlFor="description">Description</label>
                </div>      
                <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Image Description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                <div>{formik.errors.description}</div>
            </div>
            <div className="inputWrapper">
                <div>
                    <label htmlFor="file">Upload Image</label>
                </div>      
                <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => {
                        formik.setFieldValue('image', e.currentTarget.files[0])
                    }}
                />
                <div>{formik.errors.userName}</div>
            </div>
            <div className="ImageBtnWrapper"> 
                <button className="myBtn" type="submit">Save</button>
                <button  className="myBtn" onClick={props.closeModal}>Cancel</button>
            </div> 
        </div>      
    </form>
    
  );
};

