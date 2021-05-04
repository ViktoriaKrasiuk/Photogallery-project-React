import {useState, useEffect} from 'react'
import {
  getAllCategories, 
  createCategories, 
  deleteCategories, 
  deleteCategory, 
  editCategory
} from '../../Requests/CategoriesRequests'
import './CategoriesPage.css'
import '../Global/Icons/icons.css'
import {MyInput} from '../Global/MyInput'
import {Header} from '../Global/Header'
import {CommonForm} from '../Global/CommonForm'
import {Modal} from '../Global/Modal'
import {PaginationSelect} from '../Global/PaginationSelect'
import {OrderBySelect} from '../Global/OrderBySelect'
import {OrderSelect} from '../Global/OrderSelect'
import {TitleSearch} from '../Global/TitleSearch'
import {PaginationComponent} from '../Global/PaginationComponent'
import moment from 'moment';
import {goToNextPage, goToPriviousPage, handleStateChange, updateLimit} from '../../utils/index'
import {useHistory} from 'react-router-dom';


const CategoriesNavBar = () => {
  
  const history = useHistory();
  
  const goToSingleCategory = (id) => {
    history.push(`/categories/${id}`);
  }

  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [showCreateCatForm, setShowCreateCatForm] = useState(false)
  const [showEditCatForm, setShowEditCatForm] = useState(false)
  const [showDeleteSelectedCats, setShowDeleteSelectedCats] = useState(false)
  const [editedCategoryId, setEditedCategoryId] = useState('')
  const [editNameValue, setEditNameValue] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [lastPage, setLastPage] = useState(1);
 
  
  
  const createCat = () => {
    createCategories(category).then(r => {
      handleStateChange('', setCategory)
      getAllCats()
    }).catch(e => {
      alert(e)
    })
  }

  const getAllCats = () => {
    const params = {
      "page": page,
      "limit": limit,
      "orderBy": orderBy,
      "order": order,
      "q": categoryTitle
    }
    return getAllCategories(params).then(r => {
      setCategoryList(r.data.data.map(i => {
        i.isSelected = false
        return i
      }))
      setLastPage(r.data.lastPage);  
      
      return r
    })
  }

  const openEditModal = (id) =>{
    setShowEditCatForm(true)
    setEditedCategoryId (id)
  }

  const closeModal = () =>{
    setShowEditCatForm(false)
  }

  const editCat = (e) => {
    e.preventDefault()
    editCategory(editNameValue, editedCategoryId)
    getAllCats()
    closeModal()
    setEditNameValue('')
  }

  const deleteCat = (id) => {
    deleteCategory(id)
    getAllCats()
  }
 
  const toggleCategoryById = (index, value) => {
    const categoryListClone = JSON.parse(JSON.stringify(categoryList))
    categoryListClone[index].isSelected = value;
    setCategoryList(categoryListClone)
  }

  const showSelectedCatsDeletingModal = () => {
    setShowDeleteSelectedCats(true)
  }

  const closeDeletingModal = () =>{
    setShowDeleteSelectedCats(false)
  }
  const deleteSelectedCats = (e) => {
    e.preventDefault()
    const selectedCategories = categoryList.filter(i => i.isSelected).map(i => i.id)
    deleteCategories(selectedCategories)
    getAllCats()
    closeDeletingModal()
  }

  useEffect(() => {
    getAllCats()
  }, [limit, page, order, orderBy])

  const handleSearch = () => {
    getAllCats().then(r => {
      if (page === 1) return
      setPage(1)
    })
  }

  

  const renderList = () => {
    return categoryList.map((i, index) => {
      return (
        <li key={i.id} className='ListItem'>
          <input className='categoryChekbox' type="checkbox" checked={i.isSelected} onChange={(e) => toggleCategoryById(index, e.target.checked )} />
          <div onClick={() => goToSingleCategory(i.id)} className='category' title='category'>{i.title }</div>
          <div className='category' title='id'>{i.id }</div>
          <div className='date' title='date'>{moment(i.created_at).format('DD-MM-YYYY HH:MM')}</div>
          <div onClick={() => openEditModal(i.id)} className='editIcon icon' title='Edit'></div>
          <div onClick={() => deleteCat(i.id)} className='deleteIcon icon' title='Delete'></div>
        </li>
      )
    })
  }


  useEffect(getAllCats, [])
  
  return ( 
    <div>
      <Header/>
      <div className="layout">
        <div className='actionsWrapper'>
          <button onClick={()=> setShowCreateCatForm(true)}>Create new category</button>
          <TitleSearch handleSearch={() => handleSearch()} handleInputChange={(value) => handleStateChange(value, setCategoryTitle) } value={categoryTitle} />
        </div>
        <div className='navigationWrapper'>
          <div className='navigationSelects'>
            <PaginationSelect handleChange={(value) => updateLimit(value, setLimit) }/>
            <OrderBySelect handleChange={(value) => handleStateChange(value, setOrderBy) }/>
            <OrderSelect handleChange={(value) => handleStateChange(value, setOrder) }/>
            <div className="updateIcon icon" onClick={getAllCats}></div>
          </div>
          <PaginationComponent pageNumber={page} goToPriviousPage={() => goToPriviousPage(page, setPage)} goToNextPage={() => goToNextPage(page, lastPage, setPage)} />
        </div>
        
        {showCreateCatForm ? 
         <Modal>
           <CommonForm onSubmitHandler={createCat} closeModal={()=> setShowCreateCatForm(false)} headerName='Create category'>
              <MyInput handleInputChange={(value) => handleStateChange(value, setCategory) } value={category} />      
           </CommonForm> 
         </Modal>
        : null}
        {showEditCatForm ? 
         <Modal>
           <CommonForm onSubmitHandler={editCat} closeModal={closeModal} headerName='Edit category'>
             <input value={editNameValue} onChange={e => setEditNameValue(e.target.value)} /> 
           </CommonForm> 
         </Modal>
        : null}
        {showDeleteSelectedCats ? <Modal onSubmitHandler={deleteSelectedCats} closeModal={closeDeletingModal} headerName='Delete selected categories?' /> : null}
      </div>
      <ul className='categoriesList'>
        {renderList()}
      </ul>
      <button className='deleteSelectedBtn' onClick={showSelectedCatsDeletingModal}> Delete Selected Categories</button>
    </div>
)}

export default CategoriesNavBar;