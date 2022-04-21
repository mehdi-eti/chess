import React, { useState } from 'react'
import { auth } from './firebase'

export default function UserForm() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        localStorage.setItem('userName', name)
        await auth.signInAnonymously()
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen" style={{ padding: 0 }}>
                            <form action="" className="box" onSubmit={handleSubmit}>
                                <div className="field">
                                    <label htmlFor="" className="label">Name</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            name='name'
                                            id='name'
                                            className='input'
                                            placeholder='Name'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="checkbox">
                                        <input type="checkbox" style={{ marginRight: 5 }} />
                                        Remember me
                                    </label>
                                </div>
                                <div className="field">
                                    <button className="button is-success" type='submit'>
                                        {loading ? <span className='loader' /> : "Login"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}