//get
export const getFromLocalStorage = (key) => {
    const localAuth = localStorage.getItem(key)
    if(localAuth) {
        return JSON.parse(localAuth)
    }
    return null
}


//set
export const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//remove
export const removeFromLocalStorage = (key) => {
    const localAuth = localStorage.getItem("auth")
    if(localAuth) {
        localStorage.removeItem("auth")
    }
}