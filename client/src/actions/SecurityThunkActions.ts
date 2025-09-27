import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/Store.ts';
import { AppAction } from './AppAction.ts';
import { SecurityActions } from './SecurityActions.ts';
import { Login } from '../types/Login.ts';
import * as API from '../services/Api.ts';
import { AlertMessage, MessageType } from '../types/AlertTypes.ts';
import { AlertActions } from './AlertAction.ts';
import { UserProfile } from '../types/Login.ts';

const SecurityThunkActions = {
    /**
     *login user
     */
    doLogin: (login: Login) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.login(login).then(
                (response) => {
                 
                    if (response?.data) {
                        const user: UserProfile = {
                            token: response.data.token,
                            email: response.data.email,
                            username: response.data.username,
                            firstname: response.data.firstname,
                            lastname: response.data.lastname,
                        };
                        dispatch(SecurityActions.loginActionSuccess(user));
                    }

                    dispatch(
                        AlertActions.addMessage({
                            content: 'login successful',
                            show_notification: true,
                            type: MessageType.SUCCESS,
                        })
                    );
                },
                (error) => {
                    let errorMessage = 'Cannot login: ' + error.toString();
                    if (error.response && error.response.status === 401) {
                        errorMessage = 'Login Fail';
                    }
                    // dispatch(LoginActions.);
                    const alertMessage: AlertMessage = {
                        content: errorMessage,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };

                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },

      doLogout: () => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
            const { token } = getState().loginState.user || {};

            // Optional: Call a backend endpoint to invalidate the token/session
            // if (token) {
            //     API.logout(token).catch(err => console.error("Logout API call failed:", err));
            // }

            dispatch(SecurityActions.singOutSuccess());
            dispatch(
                AlertActions.addMessage({
                    content: 'Sign out was successful! Bye bye!',
                    show_notification: true,
                    type: MessageType.SUCCESS,
                })
            );
        };
    },
    
    loadUserProfile: (username: string, token: string) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.fetchAccountInfo(username, token).then(
                (_response) => {
                    dispatch(
                        SecurityActions.userProfileLoadSuccess(_response?.data)
                    );
                },
                (error) => {
                    const errorMessage =
                        'Cannot fetch account info: ' + error.toString();
                    const alertMessage: AlertMessage = {
                        content: errorMessage,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };

                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },
};

export default SecurityThunkActions;
