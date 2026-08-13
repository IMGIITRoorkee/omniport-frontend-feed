import axios from 'axios'
import { toast } from 'react-semantic-toasts'

import { getCookie } from 'formula_one'
import {
  urlFeedList,
  urlFeedBit,
  urlBdayList,
  urlPersonalDetails,
} from '../urls'

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

    const pageUrl = new URL(page)
    const pageNo = pageUrl.searchParams.get('page')

    axios
      .get(urlFeedList(), {
        params: {
          page: pageNo
        }
      })
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

export const getBdays = day => {
  return dispatch => {
    dispatch({
      type: 'SET_BDAY_LIST_LOADED',
      payload: false,
    })
    axios
      .get(urlBdayList(day))
      .then(res => {
        dispatch({
          type: 'SET_BDAY_LIST',
          payload: {
            isLoaded: true,
            list: res.data,
          },
        })
      })
      .catch(() => {
        dispatch({
          type: 'SET_BDAY_LIST_LOADED',
          payload: true,
        })
      })
  }
}

export const getPersonalDetails = () => {
  return dispatch => {
    dispatch({
      type: 'SET_DETAILS_LOADED',
      payload: false,
    })
    axios
      .get(urlPersonalDetails())
      .then(res => {
        dispatch({
          type: 'SET_PERSONAL_DETAILS',
          payload: {
            isLoaded: true,
            details: res.data,
          },
        })
      })
      .catch(() => {
        dispatch({
          type: 'SET_DETAILS_LOADED',
          payload: true,
        })
      })
  }
}
