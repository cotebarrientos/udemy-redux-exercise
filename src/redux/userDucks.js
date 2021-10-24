import { auth, firebase } from '../firebase'

// Constants

const initialData = {
    loading: false,
    active: false
}

// Types

const LOADING = 'LOADING'
const USER_ERROR = 'USER_ERROR'
const USER_SUCCESS = 'USER_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

// Reducers

export default function userReducer (state = initialData, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...initialData}
        case USER_SUCCESS:
            return {...state, loading: false, user: action.payload, active: true}
        case LOGOUT_SUCCESS:
            return {...initialData}
        default: 
            return {...state}
    }

}

// Actions

export const signInUserAction = () => async (dispatch) => {

    dispatch({
        type: LOADING
    })

    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        console.log(res)
        dispatch({
            type: USER_SUCCESS,
            payload: {
                user: {
                    uid: res.user.uid,
                    email: res.user.email
                }
            }
        })
        localStorage.setItem('user', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

export const readUserActiveAction = () => async (dispatch) => {
    if(localStorage.getItem('user')){
        dispatch({
            type: USER_SUCCESS,
            payload: {
                user: JSON.parse(localStorage.getItem('user'))
            }
        })
    }
}

export const logoutUserAction = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: LOGOUT_SUCCESS
    })
    localStorage.removeItem('user')
}
