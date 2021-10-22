import axios from 'axios'

// Constants

const initialData = {
    pokeArray : [],
    offset: 0
}

// Types

const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_POKE_NEXT_SUCCESS = 'GET_POKE_NEXT_SUCCESS'

// Reducers

export default function pokeReducer(state=initialData, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, pokeArray: action.payload}
        case GET_POKE_NEXT_SUCCESS:
            return {...state, pokeArray: action.payload.pokeArray, offset: action.payload.offset}
        default:
            return state
    }
}

// Actions

export const getPokemonAction = () => async (dispatch, getState) => {

    // const offset = getState().myPokemons.offset
    const {offset} = getState().myPokemons

    try {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)

        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results
        })

    } catch (error) {
        console.log(error)
    }
}

export const nextPokemonAction = (number) => async (dispatch, getState) => {

    const {offset} = getState().myPokemons
    const next = offset + number

    try {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`)

        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload: {
                pokeArray: res.data.results,
                offset: next
            }
        })

    } catch (error) {
        console.log(error)
    }

}