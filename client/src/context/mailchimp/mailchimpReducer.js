import {
  GET_REPORTS,
  GET_REPORT,
  GET_CAMPAIGN,
  GET_CLICKED,
  SET_LOADING,
  REPORTS_ERROR,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_REPORTS:
      return {
        ...state,
        reports: action.payload,
        loading: false,
      }
    case GET_REPORT:
      return {
        ...state,
        report: action.payload,
        loading: false,
      }
    case GET_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload,
        loading: false,
      }
    case GET_CLICKED:
      return {
        ...state,
        urlsClicked: action.payload,
        loading: false,
      }
    case REPORTS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
