import React, {useEffect} from 'react'

const Login = () => {

    useEffect(() => {
        document.title = 'MyPokeApp | Login'
    }, [])

    return (
        <div className="mt-5 text-center">
            <h2 className="text-capitalize">Login using a google account</h2>
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
            <button className="btn btn-dark btn-lg mt-4">
                Login
                <i className="fab fa-google-plus ms-2"></i>
            </button>
        </div>
    )
}

export default Login
