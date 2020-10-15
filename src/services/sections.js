import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

const getAll = () => {
  const request = axios.get(`${baseURL}/sections`);
  return request.then(response => response.data);
};

const create = newSection => {
  const request = axios.post(`${baseURL}/sections`, newSection);
  return request.then(response => response.data);
};

export default { create, getAll };
