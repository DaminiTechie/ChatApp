import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Register = () => {
    const { handleRegister } = useAuth();
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password1 !== credentials.password2) {
            setError('Passwords do not match!');
            return;
        }

        if (credentials.password1.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setError('');
        try {
            await handleRegister(e, credentials);
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className='auth--container'>
            <div className='form--wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='field--wrapper'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Enter your Name.....'
                            value={credentials.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='field--wrapper'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter your email.....'
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='field--wrapper'>
                        <label htmlFor='password1'>Password:</label>
                        <input
                            type='password'
                            id='password1'
                            name='password1'
                            placeholder='Enter your password.....'
                            value={credentials.password1}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='field--wrapper'>
                        <label htmlFor='password2'>Confirm Password:</label>
                        <input
                            type='password'
                            id='password2'
                            name='password2'
                            placeholder='Confirm your password.....'
                            value={credentials.password2}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <div className='field--wrapper'>
                        <input className='btn btn--lg btn--main' type='submit' value="Register" />
                    </div>
                </form>
                <p>Already have an account? Login <Link to="/login">here</Link></p>
            </div>
        </div>
    );
};

export default Register;
