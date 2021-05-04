

const TOKEN_KEY = 'gallery_project_token';


export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const handleStateChange = (value, setter) => {
    setter(value)
  }  

export const updateLimit = (value, setLimit) => {
    handleStateChange(Number(value), setLimit)
  }

export const goToPriviousPage = (page, setPage) => {
    if (page <= 1) {
      return null 
    }  else {
      setPage(page - 1)
    }        
  }

export const goToNextPage = (page, lastPage, setPage) => {
    if (page >= lastPage) {
       return null 
    }  else {
       setPage(page + 1)
    }
 }


 