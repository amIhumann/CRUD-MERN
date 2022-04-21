import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const refreshToken=async(setToken,setName,setExpire,navigate)=>{
  try {
      const response=await axios.get('http://localhost:5000/token')
      setToken(response.data.accessToken)
      const decoded=jwt_decode(response.data.accessToken)
      setName(decoded.name)
      setExpire(decoded.exp)
  } catch (error) {
      if(error.response)navigate('/')
  }
}