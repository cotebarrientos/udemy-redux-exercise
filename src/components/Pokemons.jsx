import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    getPokemonAction, 
    nextPokemonAction, 
    previousPokemonAction,
    myPokeDetailAction} from '../redux/pokeDucks'
import PokeDetail from './PokeDetail'


const Pokemons = () => {

    const dispatch = useDispatch()

    const pokemons = useSelector(store => store.myPokemons.results)
    const next = useSelector(store => store.myPokemons.next)
    const previous = useSelector(store => store.myPokemons.previous)

    useEffect(() => {

        const fetchData = () => {
            dispatch(getPokemonAction())
        }
        fetchData()
    }, [dispatch])

    return (
        <>
            <div className="app-welcoming-box shadow p-3 mb-4 rounded col-md-6 col-12 mx-auto">
                <h1 className="mt-3 font-roboto text-uppercase text-center text-dark title-size-1">Welcome to </h1>
                <h1 className="pb-3 mt-1 font-oswald text-uppercase text-center">
                    <span className="text-danger">My</span>
                    <span className="text-warning">Poke</span>
                    <span className="text-dark">App</span>
                </h1>
                <img 
                    src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokemon_Location-256.png" 
                    alt="my pokemons"
                    className="my-pokemon-list-img img-fluid d-block mx-auto" />
            </div>
            <hr />

            <div className="row pb-5">
                <div className="col-md-6 col-xs-12">
                    <h3 className="text-center font-roboto mt-3">My Pokemon List
                    <img 
                        src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokeballs-256.png"
                        alt="Pokemon list"
                        className="poke-img-title ms-2"
                    />
                    </h3>
                    <hr />
                    <div className="d-flex justify-content-center">
                        {
                            pokemons.length === 0 &&
                            <button 
                                className="btn btn-lg btn-success mt-2 mb-4 text-uppercase"
                                onClick={() => dispatch(getPokemonAction())}
                            >
                                Get Pokemons
                                <i className="fab fa-get-pocket ms-2"></i>
                            </button>
                        }
                            
                        {
                            previous && 
                            <button 
                                className="btn btn-sm btn-secondary mt-2 mb-4 text-uppercase ms-2"
                                onClick={() => dispatch(previousPokemonAction())}
                            >
                                <i className="fas fa-chevron-circle-left me-2"></i>
                                Previous
                            </button>

                        }

                        {
                            next && 
                            <button 
                                className="btn btn-sm btn-dark mt-2 mb-4 text-uppercase ms-2"
                                onClick={() => dispatch(nextPokemonAction())}
                            >
                                Next
                                <i className="fas fa-chevron-circle-right ms-2"></i>
                            </button>
                        }
                    </div>
                    
                    <ul className="list-group mt-1 col-md-8 col-xs-10 mx-auto">
                        {
                            pokemons.map(item => (
                            <li 
                                className="font-oswald list-group-item p-list list-group-item-action list-group-item-secondary"
                                key={item.name}
                            >
                                {item.name}
                                <button 
                                className="btn btn-sm btn-dark float-end text-uppercase"
                                onClick={() => dispatch(myPokeDetailAction(item.url))}
                                >
                                    Info
                                    <i className="fas fa-info-circle ms-2"></i>
                                </button>
                                </li> 
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-6 col-xs-12">
                    <h3 className="text-center font-roboto mt-3">Pokemon Detail
                    <img 
                        src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Mobile_Phone-256.png"
                        alt="Pokemon list"
                        className="poke-img-title ms-2"
                    />
                    </h3>
                    <hr />
                    <PokeDetail />
                </div>
            </div>
        </>
    )
}

export default Pokemons
