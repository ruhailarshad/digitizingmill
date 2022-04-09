import jwt_decode from "jwt-decode"

export const getUserData=()=> {
    const token=localStorage.getItem('access_token')
    
    if(token){
      return jwt_decode(token);
    } 
    return false
    
  };