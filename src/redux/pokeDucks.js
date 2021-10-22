import axios from 'axios'

// Constants

const initialData = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    offset: 0
}

// Types

const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_POKE_NEXT_SUCCESS = 'GET_POKE_NEXT_SUCCESS'
const GET_POKE_PREVIOUS_SUCCESS = 'GET_POKE_PREVIOUS_SUCCESS'

// Reducers

export default function pokeReducer(state=initialData, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, ...action.payload}
        case GET_POKE_NEXT_SUCCESS:
            return {...state, ...action.payload}
        case GET_POKE_PREVIOUS_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

// Actions

export const getPokemonAction = () => async (dispatch, getState) => {

    if(localStorage.getItem('offset=0')){
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)

        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }
}

export const nextPokemonAction = () => async (dispatch, getState) => {

    const {next} = getState().myPokemons

    if(localStorage.getItem(next)){
        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {

        const res = await axios.get(next)

        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }

}

export const previousPokemonAction = () => async (dispatch, getState) => {
    
    const {previous} = getState().myPokemons

    if(localStorage.getItem(previous)){
        dispatch({
            type: GET_POKE_PREVIOUS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous)

        dispatch({
            type: GET_POKE_PREVIOUS_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}
