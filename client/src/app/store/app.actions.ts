import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login');
export const logout = createAction('[Auth] Logout');

export const adminLogin = createAction('[Auth] AdminLogin' );
export const adminLogout = createAction('[Auth] AdminLogout' );

export const getLoginState = createAction('[Auth] Get Login State');
export type MyActionsUnion = typeof login | typeof logout | typeof adminLogin | typeof adminLogout;