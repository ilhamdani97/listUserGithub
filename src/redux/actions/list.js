import axios from 'axios'
import * as types from '../types/type'
import { URL } from 'react-native-dotenv'
export const getData = () => ({
    type: types.SHOW_DATA_LIST,
    payload: axios({
        method: 'GET',
        url: `${URL}users`
    })
})
export const searchData = (username) => ({
    type: types.SEARCH_DATA_LIST,
    payload: axios({
        method: 'GET',
        url: `${URL}users/${username}`
    })
})