import { createReducer, on } from '@ngrx/store';
import * as MyActions from './app.actions';

export interface MyState {
  islogin: boolean;
}

export const initialState: MyState = {
  islogin: false
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
  })
);

// export function reducer(
//   state: MyState | undefined,
//   action: MyActions.MyActionsUnion
// ): MyState {
//   return myReducer(state, action);
// }