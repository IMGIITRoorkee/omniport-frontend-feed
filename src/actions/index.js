import axios from 'axios'

import { getCookie } from 'formula_one'
import { urlFeedList, urlFeedBit } from '../urls'

export const initialiseList = () => {
  return dispatch => {
    dispatch({
      type: 'SET_LOADED',
      payload: false
    })
    axios
      .get(urlFeedList())
      .then(res => {
        dispatch({
          type: 'SET_FEED_LIST',
          payload: {
            isLoaded: true,
            list: res.data
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'SET_LOADED',
          payload: true
        })
      })
  }
}
export const getMoreFeed = page => {
  return dispatch => {
    dispatch({
      type: 'SET_LOADED',
      payload: false
    })
    axios
      .get(page)
      .then(res => {
        dispatch({
          type: 'SET_FEED_LIST_NEXT_PAGE',
          payload: {
            isLoaded: true,
            list: res.data
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'SET_LOADED',
          payload: true
        })
      })
  }
}
export const changeReport = (id, status) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .patch(urlFeedBit(id), { newReported: status }, { headers: headers })
      .then(res => {
        dispatch({
          type: 'SET_REPORTED',
          payload: res.data
        })
      })
      .catch(err => {})
  }
}