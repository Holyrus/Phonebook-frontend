import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const remove = (id, theObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, theObject)
    return request.then(response => response.data);
}

const replace = (id, theObject) => {
    const request = axios.put(`${baseUrl}/${id}`, theObject);
    return request.then(response => response.data)
}

export default { getAll, create, remove, replace }