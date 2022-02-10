import { combineReducers } from 'redux'
import feedList from './feedList'
import bdayList from './bdayList'
import whoami from './PersonalDetails'

const rootReducers = combineReducers({
  feedList,
  bdayList,
  whoami
})

export default rootReducers
