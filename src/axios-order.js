import axios from 'axios'

const instance = axios.create({
   baseURL: 'https://react-burger-pavolhalas.firebaseio.com/',
})

export default instance