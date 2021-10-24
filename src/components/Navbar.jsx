import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'
import {logoutUserAction} from '../redux/userDucks'

const Navbar = (props) => {

    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(logoutUserAction())
        props.history.push('/login')
    }

    return (
            
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark mb-4">
            <Link to="/" className="navbar-brand text-uppercase">
                <img 
                src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_pikachu-256.png"
                className="ms-3" 
                alt="img logo" width="40" height="40"/>
                <span className="text-danger ms-2">My</span>
                <span className="text-warning">Poke</span>
                <span className="text-light">App</span>
            </Link>
            <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse me-3" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto text-uppercase">
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link me-3 ms-3" 
                            to="/"
                            exact
                        >
                            My Pokemon Info
                            <i className="fas fa-file-alt ms-2"></i>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            className="nav-link me-3 ms-3" 
                            onClick={() => signOut()}
                            to="/login"
                        >
                            Login
                            <i className="fas fa-user-cog ms-2"></i>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className="nav-link me-3 ms-3"
                            to="/login"
                        >
                            Logout
                            <i className="fas fa-sign-out-alt ms-2"></i>
                        </NavLink>
                    </li>
   
                </ul>
                
            </div>
        </nav>
    )
}

export default withRouter(Navbar)
