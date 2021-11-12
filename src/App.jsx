import React from 'react'

import Pokemons from './components/Pokemons'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Footer from './components/Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

// Firebase
import {auth} from './firebase'


function App() {

  // Firebase
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
  }, [])

  const PrivateRoute = ({component, path, ...rest}) => {
    if(localStorage.getItem('user')){
      const userStorage = JSON.parse(localStorage.getItem('user'))
      if(userStorage.uid === firebaseUser.uid){
        console.log('are the same')
        return <Route component={component} path={path} {...rest} />
      }else{
        console.log("it doesn't exist")
        return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }

  return firebaseUser !== false ? (

    <Router>
      <div className="container-fluid p-0">
        <Navbar />
        <main>
          <Switch>
            <PrivateRoute component={Pokemons} path="/" exact/>
            <PrivateRoute component={Profile} path="/profile" exact/>
            <Route component={Login} path="/login" exact/>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  ): (<div>loading...</div>)
}

export default App;
