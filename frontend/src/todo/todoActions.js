import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    payLoad: event.target.value
})

export const search = () => {
    const request = axios.get(`${URL}?sort=-createdAt`)    
    return {
        type: 'TODO_SEARCHED',
        payLoad: request
    }
}