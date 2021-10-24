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
const GET_POKE_INFO_SUCCESS = 'GET_POKE_INFO_SUCCESS'

// Reducers

export default function pokeReducer(state=initialData, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, ...action.payload}
        case GET_POKE_NEXT_SUCCESS:
            return {...state, ...action.payload}
        case GET_POKE_PREVIOUS_SUCCESS:
            return {...state, ...action.payload}
        case GET_POKE_INFO_SUCCESS:
            return {...state, onePokemon: action.payload}
        default:
            return state
    }
}

// Actions

export const myPokeDetailAction = (url) => async (dispatch, getState) => {

    if(url === undefined){
        url = 'https://pokeapi.co/api/v2/pokemon/1/'
    }
    if(localStorage.getItem(url)){
        dispatch({
            type: GET_POKE_INFO_SUCCESS,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }

    try {

        const res = await axios.get(url)
        const pokeWeight = res.data.weight / 10
        const pokeHeight = res.data.height / 10
        console.log(res.data)
        dispatch({
            type: GET_POKE_INFO_SUCCESS,
            payload: {
                name: res.data.name,
                weight: pokeWeight,
                height: pokeHeight,
                image: res.data.sprites.front_default,
                type: res.data.types[0].type.name,
                ability1: res.data.abilities[0].ability.name,
                ability2: res.data.abilities[1].ability.name,
                base_experience: res.data.base_experience,
                poke_number: res.data.id

            }
        })
        localStorage.setItem(url, JSON.stringify({
            name: res.data.name,
            weight: pokeWeight,
            height: pokeHeight,
            image: res.data.sprites.front_default,
            type: res.data.types[0].type.name,
            ability1: res.data.abilities[0].ability.name,
            ability2: res.data.abilities[1].ability.name,
            base_experience: res.data.base_experience,
            poke_number: res.data.id
        }))

    } catch (error) {
        console.log(error)
    }

}

export const getPokemonAction = () => async (dispatch) => {

    if(localStorage.getItem('offset=0')){
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=15`)

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
