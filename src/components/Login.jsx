import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {signInUserAction} from '../redux/userDucks'

import {withRouter} from 'react-router-dom'

import img3 from '../img/img3.png'
import img7 from '../img/img7.png'
import img4 from '../img/img4.png'
import img5 from '../img/img5.png'
import img6 from '../img/img6.png'

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
            <div className="app-welcoming-box shadow p-3 mb-4 rounded col-md-6 col-11 mx-auto">
                <h1 className="mt-3 font-roboto text-uppercase text-center text-dark title-size-1">Welcome to </h1>
                <h1 className="pb-3 mt-1 font-oswald text-uppercase text-center">
                    <span className="text-danger">My</span>
                    <span className="text-warning">Poke</span>
                    <span className="text-dark">App</span>
                </h1>
                <img 
                    src={img6}
                    alt="my pokemons"
                    className="my-pokemon-list-img img-fluid d-block mx-auto" />
            </div>
            
            <div className="mt-5 text-center">
                <h2 className="text-capitalize font-roboto">Login using a google account</h2>
                <hr />
                <div className="row mt-5">
                    <div className="col-6 mt-5">
                        <img 
                            src={img5} 
                            alt="poke master 1" 
                            className="img-fluid d-block float-end poke-img" 
                        />
                    </div>
                    <div className="col-6 mt-5">
                        <img 
                            src={img4}
                            alt="poke master 2" 
                            className="img-fluid d-block float-start poke-img" 
                        />
                    </div>
                </div>
                <button 
                    className="btn btn-dark btn-lg mt-5 mb-5"
                    onClick={() => dispatch(signInUserAction())}
                    disabled={loading}
                >
                    Login
                    <i className="fab fa-google-plus ms-2"></i>
                </button>
            </div>
            <div className="col-12 mx-auto">
                <img 
                    src={img7}
                    alt= "Box info"
                    className="img-fluid d-block mx-auto p-5 poke-img-info-arrow"
                />
            </div>
            <div className="col-md-6 col-11 mx-auto info-box shadow mb-5 rounded ">
                <h4 className="text-capitalize font-roboto pb-3">
                    Did you know
                    <span className="ms-1"><i className="fas fa-question-circle"></i></span>
                </h4>
                <h6 className="font-roboto">
                    Through 2021, the pokemon franchise has more than 800 of our epic little 
                    friends and the list continues to add up.
                </h6>
                <img 
                    src={img3}
                    alt="Did you know" 
                    className="img-fluid d-block mx-auto poke-img-info-box" 
                />
            </div>
        </>
    )
}

export default withRouter(Login)
