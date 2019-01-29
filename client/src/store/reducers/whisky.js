import actions from '../actions/constants'


const whiskyReducer = (state = {
  data:[],
  fetching:false,
  fetched:false,
  posting: false,
  posted:false,
  error:null,
  details:{}
  }, 
  action) => {
    switch (action.type) {

      // FETCH WHISKY
      case actions.FETCH_WHISKY_PENDING:
        return {...state, fetching: true, fetched: false};
      case actions.FETCH_WHISKY_FULFILLED:
        return {...state, data: action.payload, fetching: false, fetched: true, posted: false};
      case actions.FETCH_WHISKY_REJECTED:
        return {...state, fetching: false, error: action.payload};

      // DETAILS
      case actions.FETCH_WHISKY_DETAILS_PENDING:
        return {...state, fetching: true, fetched: false};
      case actions.FETCH_WHISKY_DETAILS_FULFILLED:
        return {...state, details: action.payload, fetching: false, fetched: true};
      case actions.FETCH_WHISKY_DETAILS_REJECTED:
        return {...state, fetching: false, error: action.payload};

      // POST WHISKY
      case actions.POST_WHISKY_PENDING: 
        return {...state, posting: true};
      case actions.POST_WHISKY_FULFILLED: 
        return {...state, posting: false, posted: true};
      case actions.POST_WHISKY_REJECTED: 
        return {...state, posting: false, error: action.payload};

      // PUT WHISKY
      case actions.PUT_WHISKY_PENDING: 
        return {...state, posting: true};
      case actions.PUT_WHISKY_FULFILLED: 
        return {...state, posting: false, posted: true};
      case actions.PUT_WHISKY_REJECTED: 
        return {...state, posting: false, error: action.payload};
      
      // DELETE WHISKY
      case actions.DELETE_WHISKY_PENDING: 
        return {...state};
      case actions.DELETE_WHISKY_FULFILLED: 
        return {...state, posted: true};
      case actions.DELETE_WHISKY_REJECTED: 
        return {...state, error: action.payload};

      default:
        return state
    }
}

export default whiskyReducer;
