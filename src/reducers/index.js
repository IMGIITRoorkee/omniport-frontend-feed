import { combineReducers } from 'redux'
import feedList from './feedList'
import bdayList from './bdayList'

const rootReducers = combineReducers({
  feedList,
  bdayList
})

export default rootReducers
