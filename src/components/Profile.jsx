import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {updateUserAction, editUserPicAction} from '../redux/userDucks'

import img9 from '../img/img9.png'

const Profile = () => {

    const myUser = useSelector(store => store.user.user)
    console.log(myUser)
    const loading = useSelector(store => store.user.loading)

    const [displayName, setDisplayName] = useState(myUser.displayName)
    const [editName, setEditName] = useState(false)

    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const editNameButton = () => {
        if(!displayName.trim()){
            console.log('Empty Name')
            return
        }
        dispatch(updateUserAction(displayName))
        setEditName(false)
    }

    const selectThisFile = (e) => {
        console.log(e.target.files[0])   
        const image = e.target.files[0]

        if(image === undefined){
            console.log('no image')
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            dispatch(editUserPicAction(image))
            setError(false)
        }else{
            console.log('This file is not valid')
            setError(true)
            return
        }
    }

    useEffect(() => {
        document.title = 'MyPokeApp | Profile'
    }, [])

    return (
        <div className="mt-5 text-center">
            <h2 className="text-capitalize font-roboto">My profile
                <span>
                    <img 
                        src={img9}
                        alt="My profile" 
                        className="poke-img-title ms-2" 
                    />
                </span>
            </h2>
            <hr />
            <div className="card col-md-6 col-11 mx-auto text-dark bg-light mt-5 mb-5 pb-4 shadow p-3">
                <div className="card-body">
                    <img 
                        src={myUser.photoURL} 
                        alt="my pic" 
                        className="img-fluid rounded mt-5 mb-5 profile-pic" 
                    />
                    <h4 
                        className="card-title pb-2 font-roboto">
                            Nickname: <span className="text-success">{myUser.displayName}</span>
                    </h4>
                    <p 
                        className="card-text"> 
                            <strong>Email:</strong> <span className="text-success">{myUser.email}</span>
                    </p>
                    <div>
                        <button 
                            className="btn btn-dark mt-4 mb-4"
                            onClick={() => setEditName(true)}
                        >
                            Edit my user name
                            <i className="fas fa-edit ms-2"></i>
                        </button>
                        <div className="custom-file">

                        {
                            error &&
                            <div className="alert alert-warning">
                                You must upload an image with the following formats: "PNG or JPG"
                            </div>
                        }
                        
                            <input 
                                type="file" 
                                className="custom-file-input" 
                                id="validatedCustomFile" 
                                onChange={e => selectThisFile(e)}
                                required 
                                disabled={loading}
                                style={{display:'none'}}
                            />
                            <label 
                                className={loading ? "btn btn-dark disabled" : "btn btn-dark"}
                                htmlFor="validatedCustomFile"
                            >
                                Edit my pic
                                <i className="fas fa-user-edit ms-2"></i>
                            </label>
                        </div>
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
