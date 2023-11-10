import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ theme }) {

    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme.color === 'light' ? 'light' : 'dark'} bg-${theme.color}`}>
            <div className="container-fluid bg-opacity-50">
                <Link className="navbar-brand" to="/">🍞BreadBilling</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Panel</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bills">Bills</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="nav-link btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content bg-${theme.color}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to logout?</h5>
                            <button type="button" className={`btn-close bg-${(theme.text === 'white' ? 'light' : 'dark')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <a className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} mx-2 px-4`} href="/" onClick={() => {
                                localStorage.removeItem('breadBilling');
                            }}>YES</a>
                            <button type="button" className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} mx-2 px-4`} data-bs-dismiss="modal">NO</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar