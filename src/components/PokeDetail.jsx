import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {myPokeDetailAction} from '../redux/pokeDucks'

const PokeDetail = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchData = () => {
            dispatch(myPokeDetailAction())
        }
        fetchData()
    }, [dispatch])

    const selectedPokemon = useSelector(store => store.myPokemons.onePokemon)
    
    return selectedPokemon ? (
        <div className="card mt-5 shadow p-3 mb-4 rounded">
            <div className="card-body">
                <img 
                src={selectedPokemon.image} 
                alt="My selected pokemon" 
                className="img-fluid selected-poke-img d-block mx-auto" />
                <div className="card-title poke-name">{selectedPokemon.name}</div>
                <p 
                className="card-text text-center font-roboto mt-4">
                    <strong className="text-secondary me-2">Weight:</strong>{selectedPokemon.weight} kg | 
                    <strong className="text-secondary ms-2 me-2">Height:</strong>{selectedPokemon.height} m
                </p>
                <hr />
                <p className="card-text font-roboto text-capitalize">
                    <strong className="me-2">Number:</strong>
                    # {selectedPokemon.poke_number}</p>
                <hr />
                <p className="card-text font-roboto text-capitalize"> 
                    <strong className="me-2">Type:</strong>
                    {selectedPokemon.type}</p>
                <hr />
                <p className="card-text font-roboto">
                    <strong className="me-2 text-capitalize">Base Experience:</strong>
                    {selectedPokemon.base_experience} pts</p>
                <hr />
                <div className="card-text font-roboto text-capitalize">
                    <strong className="me-2">Abilities:</strong>
                    <span className="ms-1">{selectedPokemon.abilities}</span>
                </div>
            </div>
        </div>
    ) : null
}

export default PokeDetail
