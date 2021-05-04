import '../PhotoGallery/PhotoGallery.css';
import '../../App.css'
import {PaginationSelect} from './PaginationSelect'
import {OrderBySelect} from './OrderBySelect'
import {OrderSelect} from './OrderSelect'
import {TitleSearch} from './TitleSearch'
import {PaginationComponent} from './PaginationComponent'
import {useState, useEffect} from 'react'
import {Modal} from './Modal'
import {ImageForm} from '../PhotoGallery/ImageForm'
import {
   getImages,
   loadImage,
   deletePost,
   deletePosts,
   editPost
} from '../../Requests/ImagesRequests.js'
import moment from 'moment';
import {goToNextPage, goToPriviousPage, handleStateChange, updateLimit} from '../../utils/index'
import {useHistory} from 'react-router-dom';
import { CommonForm } from './CommonForm';


const ImageListComponent = (props) => {
   const history = useHistory();
   const goToSingleImage = (id) => {
      history.push(`/my_gallery/${id}`);
   }

   const goToSingleCategory = (id) => {
     history.push(`/categories/${id}`);
   }

   const [imageList, setImageList] = useState([]);
   const [showEditImageForm, setShowEditImageForm] = useState(false);
   const [showDeleteSelectedImagesModal, setShowDeleteSelectedImagesModal] = useState(false);
   const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
   const [showLoadImageModal, setShowLoadImageModal] = useState(false)
   const [editedImage, setEditedImage] = useState('')
   const [deletingImageId, setDeletingImageId] = useState('')
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(5);
   const [order, setOrder] = useState('desc');
   const [orderBy, setOrderBy] = useState('created_at');
   const [imageTitle, setImageTitle] = useState('');
   const [lastPage, setLastPage] = useState(1);
   

   const getImagesMethod = () => {
      const params = {
        "page": page,
        "limit": props.limit||limit,
        "orderBy": orderBy,
        "order": order,
        "q": imageTitle
      }
      return getImages(params).then(r => {
        let data = r.data.data;
        if(props.filterByCategory){
            data = data.filter(i => i.category?.id==props.selectedCategoryId)
        }
        setImageList(data.map(i => {
          i.isSelected = false
          return i
        }))
        setLastPage(r.data.lastPage);  
        
        return r
      })
    }

    const openDeleteModal = (id) =>{
      setShowDeleteImageModal(true);
      setDeletingImageId (id)
   }

    const deleteImage = (e) => {
      e.preventDefault()
      deletePost(deletingImageId)
      getImagesMethod()
      setShowDeleteImageModal(false)

    }
   const handleSearch = () => {
      getImagesMethod().then(r => {
        if (page === 1) return
        setPage(1)
      })
   }

   const toggleImageById = (index, value) => {
      const imageListClone = JSON.parse(JSON.stringify(imageList))
      imageListClone[index].isSelected = value;
      setImageList(imageListClone)
   }

   const deleteSelectedImages = (e) => {
      e.preventDefault()
      const selectedImages = imageList.filter(i => i.isSelected).map(i => i.id)
      deletePosts(selectedImages)
      getImagesMethod()
      setShowDeleteSelectedImagesModal(false)
    }

   const loadImageMethod = (formData) => {
      
      loadImage(formData).then(r => {
         getImagesMethod();
      })
   }


   const openEditModal = (i) =>{
      setShowEditImageForm(true);
      setEditedImage (i)
   }
    
    const editImageMethod = (formData) => {
      
      editPost(formData, editedImage.id).then(r => {
         getImagesMethod();
      })
   }
   
   const renderImageList = () => {
      return imageList.map((i, index) => {
        return (
          <li key={i.id} className={i.isSelected ? "selectedImageListItem ImageListItem" : 'ImageListItem'}>
            <div  className='ImageItem' alt="Img"><img src={ i.img ? `${process.env.REACT_APP_MAIN_URL}/uploads/${i.img.filename}`:null} width="auto" height="300"></img></div>
            <div className="ImageItemInfoWrapper">
               <div className='pointer' onClick={() => goToSingleImage(i.id)} style={{fontWeight:700}}>{i.title }</div>
               <div>{i.description }</div>
               <div  style={{display:'flex', justifyContent:'space-between', margin:'5px'}}>
                  <div  className='pointer' onClick={() => goToSingleCategory(i.category?.id)}>{i.category?.title }</div>
                  <div className='date' title='date'>{moment(i.created_at).format('DD-MM-YYYY HH:MM')}</div>
               </div>
            </div>
            <div className="ImageItemRefWrapper">
              { !i.isSelected ? 
               <div onClick={() => toggleImageById(index, true)} className='ImageItemRef' title='Delete'>Select</div>
               : 
               <div onClick={() => toggleImageById(index, false)} className='ImageItemRef' title='Delete'>Unselect</div>
               }
               <div onClick={() => openEditModal(i)} className='ImageItemRef editIcon icon' title='Edit'></div>
               <div onClick={() => openDeleteModal(i.id)} className='ImageItemRef deleteIcon icon' title='Delete'></div>
            </div>
            
          </li>
        )
      })
   }

   useEffect(getImagesMethod, [])
   useEffect(() => {
      getImagesMethod()
    }, [limit, page, order, orderBy])

  

   return(
      <div>
         <div className="">
            <div className='actionsWrapper'>
               {!props.filterByCategory ?
               <div className='loadBtnWrapper' onClick={() => setShowLoadImageModal(true)}><div className='loadNewImage uploadIcon icon'></div><span>Load New Image</span></div>
               : null }
               <TitleSearch handleSearch={() => handleSearch()} handleInputChange={(value) => handleStateChange(value, setImageTitle) } value={imageTitle} />

            </div>
            <div className='navigationWrapper'>
               <div className='navigationSelects'>
                  {!props.filterByCategory ?
                  <PaginationSelect handleChange={(value) => updateLimit(value, setLimit)}/>
                  : null }
                  <OrderBySelect handleChange={(value) => handleStateChange(value, setOrderBy) }/>
                  <OrderSelect handleChange={(value) => handleStateChange(value, setOrder) }/>
                  <div className="updateIcon icon" onClick={getImagesMethod}></div>
               </div>
               {!props.filterByCategory ?
               <PaginationComponent pageNumber={page} goToPriviousPage={() => goToPriviousPage(page, setPage)} goToNextPage={() => goToNextPage(page, lastPage, setPage)} />
               : null }
            </div>
            
         </div>
         {
            imageList.filter(i => i.isSelected).length ?
            <button onClick={() => setShowDeleteSelectedImagesModal(true)}>Delete selected images</button>
            :
            null
         }
         <ul className='photogalleryList'>
            {renderImageList()}
         </ul>
         { showLoadImageModal ? 
          <Modal>
             <ImageForm handleImageUpload={(formData) => loadImageMethod(formData)}  closeModal={() => setShowLoadImageModal(false)} title='Upload image'/>
          </Modal> 
        : null }
         {showEditImageForm ? 
         <Modal>
           <ImageForm editedImage={editedImage} handleImageUpload={(formData) => editImageMethod(formData,  setEditedImage)} closeModal={() => setShowEditImageForm(false)} title='Edit image'/>
         </Modal>
        : null}
        {
           showDeleteSelectedImagesModal?
           <Modal>
              <CommonForm headerName='Delete selected images?' onSubmitHandler={(e) => deleteSelectedImages(e)} closeModal={() => setShowDeleteSelectedImagesModal(false)}/>
           </Modal>
           : null        
         }
         {
           showDeleteImageModal?
           <Modal>
              <CommonForm headerName='Delete image?' onSubmitHandler={(e) => deleteImage(e)} closeModal={() => setShowDeleteImageModal(false)}/>
           </Modal>
           : null        
         }
      </div>
    
   )}

export default ImageListComponent;