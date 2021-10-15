import axios from 'axios'
export const JSONdata = axios.create({
    baseURL: `data.json`,
})