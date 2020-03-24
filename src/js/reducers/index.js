import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';
const pageNumber = handleActions({
    [actions.changePage] (state, {payload: {pageNum} }) {
        return pageNum
    } 
}, '1');
export default combineReducers({
    pageNumber,
})