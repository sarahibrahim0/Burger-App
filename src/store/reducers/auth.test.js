import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';


describe('auth reducer ', ()=>{
    it('should return the initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authPath : '/'
          })
    });
    it('should store the token when log in', ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authPath : '/'
          },{type: actionTypes.AUTH_SUCCESS, token: 'someToken' , userID: 'someUserId'}).toEqual({
            token: 'someToken',
            userId: 'someUserId',
            error: null,
            loading: false,
            authPath : '/'
          })
    })
})