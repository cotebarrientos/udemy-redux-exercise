import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {updateUserAction} from '../redux/userDucks'

const Profile = () => {

    const myUser = useSelector(store => store.user.user)
    console.log(myUser)
    const loading = useSelector(store => store.user.loading)

    const [displayName, setDisplayName] = useState(myUser.displayName)
    const [editName, setEditName] = useState(false)

    const dispatch = useDispatch()

    const editNameButton = () => {
        if(!displayName.trim()){
            console.log('Empty Name')
            return
        }
        dispatch(updateUserAction(displayName))
        setEditName(false)
    }

    useEffect(() => {
        document.title = 'MyPokeApp | Profile'
    }, [])

    return (
        <div className="mt-5 text-center">
            <h2 className="text-capitalize font-roboto">My profile
                <span>
                    <img 
                        src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_poke_trainer_three_star-256.png" 
                        alt="My profile" 
                        className="poke-img-title ms-2" 
                    />
                </span>
            </h2>
            <hr />
            <div className="card col-md-6 col-sm-12 mx-auto text-dark bg-light mt-5">
                <div className="card-body">
                    <img src={myUser.photoURL} alt="my pic" className="img-fluid rounded mt-5 mb-5 profile-pic" />
                    <h4 className="card-title pb-2 font-roboto">Nickname: <span className="text-success">{myUser.displayName}</span></h4>
                    <p className="card-text"> <strong>Email:</strong> <span className="text-success">{myUser.email}</span></p>
                    <div>
                        <button 
                            className="btn btn-dark mt-4 mb-4"
                            onClick={() => setEditName(true)}
                        >
                            Edit my user name
                            <i className="fas fa-edit ms-2"></i>
                        </button>
                    </div>
                </div>

                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }

                {
                  editName && 
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username" 
                                        value={displayName}  
                                        onChange={ e => setDisplayName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-dark" 
                                            type="button" 
                                            onClick={() => editNameButton()}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Profile
