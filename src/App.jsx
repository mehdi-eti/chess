import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import UserForm from './UserForm'
import GameApp from './GameApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Loader from './Loader'
import Message from './Message'

export default function App() {
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <Loader />
    if (error) return <Message>There wa an error</Message>
    if (!user) return <UserForm />
    else return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route path="/game/:id">
                    <GameApp />
                </Route>
            </Switch>
        </Router>
    )
}