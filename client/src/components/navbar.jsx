import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

function Navbar() {
    const popupRef = useRef(null);
    const backdropRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginClick = () => {
        popupRef.current.classList.add('show');
        backdropRef.current.classList.add('show');
    };


    const handleCloseClick = () => {
        popupRef.current.classList.remove('show');
        backdropRef.current.classList.remove('show');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

      
        navigate('/dashboardEMP');
    };

    return (
        <div>
            <header>
                <div className="nav">
                <div className='fuckingbug'>
                    <div className="fuck1">My logo</div>
                    <div className="fuck2">
                        <ul>
                            <li>
                                <button onClick={handleLoginClick}>Login</button>
                                <a href="#con" id="contect">
                                    <button>Contact us</button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
          
            </header>

            <div ref={backdropRef} className="backdrop" onClick={handleCloseClick}></div>

            <div ref={popupRef} className="box-popup">
                <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
                    <h2>Login</h2>
                    <div className="form-group">
                        <input type="text" id="username" placeholder="" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" placeholder="" />
                        <label htmlFor="password">Password</label>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
                <button onClick={handleCloseClick} className="close-button">X</button>
            </div>
        </div>
    );
}

export default Navbar;
