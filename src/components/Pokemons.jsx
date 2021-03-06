import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    getPokemonAction, 
    nextPokemonAction, 
    previousPokemonAction,
    myPokeDetailAction} from '../redux/pokeDucks'
import PokeDetail from './PokeDetail'

import img1 from '../img/img1.png'
import img8 from '../img/img8.png'


const Pokemons = () => {

    const currentUser = useSelector(store => store.user.user)

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

    useEffect(() => {
        document.title = 'MyPokeApp'
    }, [])

    return (
        <>
            <div className="app-welcoming-box shadow p-3 mb-4 rounded col-md-6 col-11 mx-auto">
                <h1 className="mt-3 font-roboto text-uppercase text-center text-dark title-size-1">Welcome to </h1>
                <h1 className="pb-3 mt-1 font-oswald text-uppercase text-center">
                    <span className="text-danger">My</span>
                    <span className="text-warning">Poke</span>
                    <span className="text-dark">App</span>
                </h1>
                <img 
                    src={currentUser.photoURL} 
                    alt="Current logged user pic"
                    className="profile-pic img-fluid rounded d-block mx-auto" />
                <h4 className="font-roboto text-center pt-3 text-success">{currentUser.displayName}</h4>
            </div>
            <hr />

            <div className="row pb-5">
                <div className="col-md-6 col-11 mx-auto">
                    <h3 className="text-center font-roboto mt-3">My Pokemon List
                    <img 
                        src={img8}
                        alt="Pokemon list"
                        className="poke-img-title ms-2"
                    />
                    </h3>
                    <hr />
                    
                    <ul className="list-group mt-1 col-md-8 mx-auto mt-5 shadow rounded">
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
                    <div className="d-flex justify-content-center">
                        {
                            pokemons.length === 0 &&
                            <button 
                                className="btn btn-lg btn-success mt-4 mb-4 text-uppercase"
                                onClick={() => dispatch(getPokemonAction())}
                            >
                                Get Pokemons
                                <i className="fab fa-get-pocket ms-2"></i>
                            </button>
                        }
                            
                        {
                            previous && 
                            <button 
                                className="btn btn-sm btn-secondary mt-4 mb-4 text-uppercase ms-2"
                                onClick={() => dispatch(previousPokemonAction())}
                            >
                                <i className="fas fa-chevron-circle-left me-2"></i>
                                Previous
                            </button>

                        }

                        {
                            next && 
                            <button 
                                className="btn btn-sm btn-dark mt-4 mb-4 text-uppercase ms-2"
                                onClick={() => dispatch(nextPokemonAction())}
                            >
                                Next
                                <i className="fas fa-chevron-circle-right ms-2"></i>
                            </button>
                        }
                    </div>
                </div>
                <div className="col-md-6 col-11 mx-auto">
                    <h3 className="text-center font-roboto mt-3">Pokemon Detail
                    <img 
                        src={img1}
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
