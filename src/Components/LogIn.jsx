import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ userName: "", password: "" });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userName, password } = credentials;

        if (!userName || !password) {
            toast.error("Please fill in all fields");
        } else {
            const user = loginUser(userName, password);
            if (user) {
                toast.success("Logged in successfully");
                navigate('/home');
            } else {
                toast.error("Invalid username or password");
            }
        }
    };

    return (
        <div className="outerDiv">
            <form className="form" onSubmit={handleSubmit}>
                <span className="signup">Login</span>
                <input
                    type="text"
                    placeholder="User name"
                    className="form--input"
                    name="userName"
                    value={credentials.userName}
                    onChange={handleInput}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    value={credentials.password}
                    onChange={handleInput}
                />

                <div className="buttons-div">
                    <button type="submit" className="form--submit">
                        Login
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;