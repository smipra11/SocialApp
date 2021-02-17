import {combineReducers} from 'redux'
import {user} from './user'

const Reducers =  combineReducers({
    userstate:user
})

export default Reducers