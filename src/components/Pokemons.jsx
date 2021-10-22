import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getPokemonAction} from '../redux/pokeDucks'
import {nextPokemonAction} from '../redux/pokeDucks'

const Pokemons = () => {

    const dispatch = useDispatch()

    const pokemons = useSelector(store => store.myPokemons.pokeArray)

    return (
        <div>
            <h1 className="pb-3 mt-3 font-roboto text-uppercase">My Pokemons List
            <span className="ms-2">
                <img 
                src="https://cdn3.iconfinder.com/data/icons/pokemon-go-3/512/pokemon_go_play_game_charcter-256.png" 
                alt="my pokemons"
                className="my-pokemon-list-img" />
            </span>
            </h1>

            <button 
                className="btn btn-success mt-2 mb-4 text-uppercase"
                onClick={() => dispatch(getPokemonAction())}
            >
                Get Pokemons
                <i className="fab fa-get-pocket ms-2"></i>
            </button>
            <button 
                className="btn btn-secondary mt-2 mb-4 text-uppercase ms-2"
                onClick={() => dispatch(nextPokemonAction(20))}
            >
                Next
            </button>
            <ul>
                {
                    pokemons.map(item => (
                       <li 
                        className="font-oswald"
                        key={item.name}
                       >
                           {item.name}
                        </li> 
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemons
