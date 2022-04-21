import React, { useState } from 'react'
import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom'
export default function Home() {
    const { currentUser } = auth
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(null)
    const history = useHistory()
    const newGameOptions = [
        { label: 'Black pieces', value: 'b' },
        { label: 'White pieces', value: 'w' },
        { label: 'Random', value: 'r' },
    ]

    async function startOnlineGame(startingPiece) {
        setLoading(startingPiece)
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
            .then(() => {
                setLoading(null)
                history.push(`/game/${game.gameId}`)
            })
            .catch(error => {
                console.log(error);
                setLoading(null)
            })
    }

    return (
        <>
            <div className='columns home'>
                <div className='column has-background-warning home-columns'>
                    <button className="button is-danger">
                        Play Locally
                    </button>
                </div>
                <div className='column has-background-danger home-columns'>
                    <button className="button is-warning" onClick={() => setShowModal(true)}>
                        Play Online
                    </button>
                </div>
            </div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Please Select the piece you want to start
                            </div>

                        </div>
                        <footer className="card-footer">
                            {newGameOptions.map(({ label, value }) => (
                                <span className="card-footer-item pointer" key={value}
                                    onClick={() => startOnlineGame(value)}>
                                    {loading === value ? <div className="loader" /> : label}
                                </span>
                            ))}
                        </footer>
                    </div>
                </div>
                <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
            </div>
        </>
    )
}
