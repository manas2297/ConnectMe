import React from 'react';

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Connect To Grow</h1>
                    <p className='lead'>Create your account, connect with developers all over the world and enhance your knowledge</p>
                    <div className='buttons'>
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing; 