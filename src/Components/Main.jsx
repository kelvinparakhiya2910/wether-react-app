import { useState } from 'react';
import logIn from './LogIn';
import Signup from './Signup';

const Main = () => {
    const [flag, setFlag] = useState(true);

    let handleToggle = () => {
        setFlag(!flag);
    }

    let Component = flag ? logIn : Signup;

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='outerContainer'>
                <div className='container'>
                    <div className='toggle-outer'>
                        <div id="btn" style={{ left: flag ? '0%' : '50%' }} ></div>
                        <button
                            type="button"
                            className='toggle-btn'
                            onClick={handleToggle}
                            style={{ color: flag ? 'green' : 'red' }}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            className='toggle-btn'
                            onClick={handleToggle}
                            style={{ color: flag ? 'red' : 'green' }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className='ContentBox'>
                    <div className='formContent'>
                        <Component />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
