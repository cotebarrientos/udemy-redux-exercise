import axios from 'axios'

// Constants

const initialData = {
    pokeArray : []
}

// Types

const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'

// Reducers

export default function pokeReducer(state=initialData, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, pokeArray: action.payload}
        default:
            return state
    }
}

// Actions

export const getPokemonAction = () => async (dispatch, getState) => {
    try {

        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results
        })

    } catch (error) {
        console.log(error)
    }
}