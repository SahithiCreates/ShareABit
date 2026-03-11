import axios from "axios";

const API=axios.create({baseURL: "http://localhost:5000/api"});

export const signup = (data) => {
  console.log("api");
  return API.post("/auth/signup", data);
};

export const login=(data)=>{
    return API.post("/auth/login",data);
};

export const addFood=(data,token)=>{
    return API.post("/food/add",data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
};

export const acceptFood=(foodId,token)=>{
    return API.put(`/food/accept/${foodId}`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
};

export const editFood = (foodId, data, token) => {
  return API.put(`/food/edit/${foodId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFood = (foodId, token) => {
  return API.delete(`/food/delete/${foodId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllDonations = (token) => {
  return API.get("/food/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export default API;
