import { request } from '../index.js';
import {getToken} from '../utils/index'

export const getImages = (params) => {
  return request.get('/api/posts', {
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

export const loadImage = (formData) => {
  return request.post('/api/posts', formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e)  
  });
}

export const editPost = (formData, id) => {
  return request.put(`/api/posts/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e) 
  });
}

export const deletePost = (id) => {
  return request.delete(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(r =>{
    return r
  }).catch(e => {
    alert(e)     
  });
}

export const deletePosts = (selectedPosts) => {
  const params = {ids: JSON.stringify(selectedPosts)}
  return request.delete('/api/posts', {
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