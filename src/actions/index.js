import axios from 'axios'
import { toast } from 'react-semantic-toasts'

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
      .catch(() => {
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
      .catch(() => {
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
      .catch(() => {
        toast({
          type: 'error',
          title: 'Error',
          description: 'Some error occured while reporting',
          animation: 'fade up',
          icon: 'frown up',
          time: 3000
        })
      })
  }
}
