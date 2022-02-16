import { combineReducers } from 'redux'
import feedList from './feedList'
import bdayList from './bdayList'
import personalDetails from './PersonalDetails'

const rootReducers = combineReducers({
  feedList,
  bdayList,
  personalDetails
})

export default rootReducers
