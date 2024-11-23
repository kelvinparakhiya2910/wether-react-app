import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const userInputData = Object.fromEntries(form.entries());

        // Validation
        if (Object.values(userInputData).some((value) => value === "")) {
            toast.error("Please fill all the details before submitting");
        } else if (userInputData.password !== userInputData.confirmPasword) {
            toast.error("Passwords do not match");
        } else if (userInputData.phoneNumber.length !== 10) {
            toast.error("Phone number must contain exactly 10 digits");
        } else if (!/^\d+$/.test(userInputData.phoneNumber)) {
            toast.error("Please enter a valid phone number");
        } else {
            // Save the new user
            addUser({
                userName: userInputData.userName,
                email: userInputData.email,
                password: userInputData.password,
                phoneNumber: userInputData.phoneNumber,
            });
            toast.success("Sign up successfully completed");
            navigate('/home');
        }
    };

    return (
        <div className="outerDiv">
            <form className="form" onSubmit={handleSubmit}>
                <span className="signup">Sign Up</span>
                <input type="text" placeholder="User name" className="form--input" name="userName" />
                <input type="email" placeholder="Email address" className="form--input" name="email" />
                <input type="tel" placeholder="Contact Number" className="form--input" maxLength="10" name="phoneNumber" />
                <input type="password" placeholder="Password" className="form--input" name="password" />
                <input type="password" placeholder="Confirm password" className="form--input" name="confirmPasword" />

                <div className="buttons-div">
                    <button type="submit" className="form--submit">
                        Save & Verify
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;