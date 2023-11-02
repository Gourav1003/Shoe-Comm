import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyState } from './app.reducers';

// export const isLoggedIn = (state:{ myFeature: MyState: { isLogin: Boolean }}) => {
//   return state;
// }

const selectMyState = createFeatureSelector<MyState>('myFeature');

export const selectIsLogin = createSelector(
  selectMyState,
  (state) => state.islogin
);

export const selectIsAdmin = createSelector(
  selectMyState,
  (state) => state.isAdmin
);
