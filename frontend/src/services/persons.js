import axios from 'axios'
const db = '/api/persons'

const getAll = () => {
    const response = axios.get(db)
    return (response.then(response => response.data))
}

const add = (newPerson) => {
    const response = axios.post(db,newPerson)
    return (response.then(response => response.data))
}

const remove = (id) => {
    const response = axios.delete(`${db}/${id}`)
    return (response)
}

const changenumber = (newPerson) => {
    const response = axios.put(`${db}/${newPerson.id}`,newPerson)
    return (response.then(response => response.data))
}


export default {getAll, add, remove, changenumber};