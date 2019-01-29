import actions from '../actions/constants'


const tagReducer = (state = {
  data:[],
  fetching:false,
  fetched:false,
  posting: false,
  posted:false,
  error:null,
  filteredWhisky:[],
  filterToggled:false,
  filterTagId:""
  }, 
  action) => {
    switch (action.type) {

      // FETCH TAG
      case actions.FETCH_TAG_PENDING:
        return {...state, fetching: true, fetched: false};
      case actions.FETCH_TAG_FULFILLED:
        return {...state, data: action.payload, fetching: false, fetched: true, posted: false};
      case actions.FETCH_TAG_REJECTED:
        return {...state, fetching: false, error: action.payload};

      // DETAILS
      case actions.FETCH_TAG_DETAILS_PENDING:
        return {...state, fetching: true, fetched: false};
      case actions.FETCH_TAG_DETAILS_FULFILLED:
        return {...state, details: action.payload, fetching: false, fetched: true};
      case actions.FETCH_TAG_DETAILS_REJECTED:
        return {...state, fetching: false, error: action.payload};

      // FILTER BY TAGS
      case actions.FILTER_BY_TAG_ID:
        return {...state, filterTagId: action.payload }

      case actions.DISABLE_FILTER:
        return {...state, filterTagId: "", filterToggled:false }

      case actions.FETCH_WHISKY_TAGS_PENDING:
        return {...state, fetching: true, fetched: false};
      case actions.FETCH_WHISKY_TAGS_FULFILLED:
        return {...state, filteredWhisky: action.payload, fetching: false, fetched: true, filterToggled:true};
      case actions.FETCH_WHISKY_TAGS_REJECTED:
        return {...state, fetching: false, error: action.payload};

      // POST TAG
      case actions.POST_TAG_PENDING: 
        return {...state, posting: true};
      case actions.POST_TAG_FULFILLED: 
        return {...state, posting: false, posted: true};
      case actions.POST_TAG_REJECTED: 
        return {...state, posting: false, error: action.payload};

      // PUT TAG
      case actions.PUT_TAG_PENDING: 
        return {...state, posting: true};
      case actions.PUT_TAG_FULFILLED: 
        return {...state, posting: false, posted: true};
      case actions.PUT_TAG_REJECTED: 
        return {...state, posting: false, error: action.payload};
      
      // DELETE TAG
      case actions.DELETE_TAG_PENDING: 
        return {...state};
      case actions.DELETE_TAG_FULFILLED: 
        return {...state, posted: true};
      case actions.DELETE_TAG_REJECTED: 
        return {...state, error: action.payload};

      default:
        return state
    }
}

export default tagReducer;
