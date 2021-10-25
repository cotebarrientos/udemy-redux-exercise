import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {signInUserAction} from '../redux/userDucks'

import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const dispatch = useDispatch()
    const loading = useSelector(store => store.user.loading)
    const active = useSelector(store => store.user.active)

    useEffect(() => {
        console.log(active)
        if(active){
            props.history.push('/')
        }
    }, [active, props.history])

    useEffect(() => {
        document.title = 'MyPokeApp | Login'
    }, [])

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
            
            <div className="mt-5 text-center">
                <h2 className="text-capitalize font-roboto">Login using a google account</h2>
                <hr />
                <div className="row mt-5">
                    <div className="col-6 mt-5">
                        <img 
                            src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokemon_Trainer_Girl-256.png" 
                            alt="poke master 1" 
                            className="img-fluid d-block float-end" 
                        />
                    </div>
                    <div className="col-6 mt-5">
                        <img 
                            src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokemon_Trainer_Boy-256.png" 
                            alt="poke master 2" 
                            className="img-fluid d-block float-start" 
                        />
                    </div>
                </div>
                <button 
                    className="btn btn-dark btn-lg mt-4 mb-5"
                    onClick={() => dispatch(signInUserAction())}
                    disabled={loading}
                >
                    Login
                    <i className="fab fa-google-plus ms-2"></i>
                </button>
            </div>
        </>
    )
}

export default withRouter(Login)
