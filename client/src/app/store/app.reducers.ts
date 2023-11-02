import { createReducer, on } from '@ngrx/store';
import * as MyActions from './app.actions';

export interface MyState {
  islogin: boolean;
  isAdmin: boolean;
}

export const initialState: MyState = {
  islogin: false,
  isAdmin: false
};

export const myReducer = createReducer(
  initialState,
  on(MyActions.login, (state) => {
    console.log('called1');
    return { ...state, islogin: true }
  }),
  on(MyActions.logout, (state) => {
    console.log('called2');
    return { ...state, islogin: false };
  }),
  on(MyActions.adminLogin, (state) => {
    console.log('called3');
    return { ...state, isAdmin: true };
  }),
  on(MyActions.adminLogout, (state) => {
    console.log('called4');
    return { ...state, isAdmin: false };
  }),

);

// export function reducer(
//   state: MyState | undefined,
//   action: MyActions.MyActionsUnion
// ): MyState {
//   return myReducer(state, action);
// }