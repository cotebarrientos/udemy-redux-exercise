import { auth, firebase, db, storage } from '../firebase'

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
        
        console.log(res.user)

        const user = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL   
        }

        const userDB = await db.collection('users').doc(user.email).get()
        console.log(userDB)

        if(userDB.exists){
            dispatch({
                type: USER_SUCCESS,
                payload: userDB.data()
            })
            localStorage.setItem('user', JSON.stringify(userDB.data()))

        }else{
            await db.collection('users').doc(user.email).set(user)
            dispatch({
                type: USER_SUCCESS,
                payload: user
            })
            localStorage.setItem('user', JSON.stringify(user))
        }
        
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

export const updateUserAction = (newName) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {user} = getState().user

    try {

        await db.collection('users').doc(user.email).update({
            displayName: newName
        })

        const editedUser = {
            ...user,
            displayName: newName
        }

        dispatch ({
            type: USER_SUCCESS,
            payload: user
        })
        localStorage.setItem('user', JSON.stringify(editedUser))
        
    } catch(error){
        console.log(error)
    }

}

export const editUserPicAction = (newPic) =>  async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {user} = getState().user
    
    try {

        const refImg = storage.ref().child(user.email).child('user pic')
        await refImg.put(newPic)
        const urlDownload = await refImg.getDownloadURL()

        await db.collection('users').doc(user.email).update({
            photoURL: urlDownload
        })

        const editedUser = {
            ...user,
            photoURL: urlDownload
        }
        dispatch({
            type: USER_SUCCESS,
            payload: editedUser
        })
        localStorage.setItem('user', JSON.stringify(editedUser))

    } catch (error) {
        console.log(error)
    }
}