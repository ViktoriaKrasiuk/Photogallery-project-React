import { request } from '../index.js';
import {getToken} from '../utils/index'



export const createCategories = (category) => {
  const newCategorie = {
    title: category
  }
  return request.post('/api/categories', newCategorie, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e) 
  });
}

export const editCategory = (value, id) => {
  const newCategorie = {
    "title": value
  }
  return request.put(`/api/categories/${id}`, newCategorie, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e)       
  });
}

export const getAllCategories = (params={}) => {
  return request.get('/api/categories', {
    params: params,
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e)     
  });
}

export const getSelectCategories = (params={}) => {
  return request.get('/api/categories/all', {
    params: params,
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e) 
  });
}

export const deleteCategory = (id) => {
  return request.delete(`/api/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e)    
  });
}

export const deleteCategories = (selectedCategories) => {
  const params = {ids: JSON.stringify(selectedCategories)}
  return request.delete('/api/categories', {
    params: params,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e)      
  });
}
