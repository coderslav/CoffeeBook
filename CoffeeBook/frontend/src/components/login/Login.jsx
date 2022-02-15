import React, { Component } from 'react';
import axios from 'axios';
const PORT = 5000;

export default class Login extends Component {

    loginUser = async (e) => {
        e.preventDefault();
        const userInfo = {
            email: e.target.email,
            password: e.target.password
        }
        const connectedUser = await axios.post(`http://localhost:${PORT}/login`, userInfo);
        this.props.loggedUser({ 
            userId: connectedUser.userId, 
            firstName: connectedUser.firstName,
            lastName: connectedUser.lastName,
            isAdmin: connectedUser.isAdmin 
        });
    }  

    render() {
        return (
            <div className='vh-100'>
                <div className='container py-5'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                            <div className='text-white text-center'>
                                <h1>CoffeeBook</h1>
                                <h4>La reseau sociale du partage l'actualité</h4>
                            </div>
                            <div className='card shadow-2-strong' style={{ borderRadius: '1rem' }}>
                                <div className='card-body p-5 text-center'>
                                    <form method='POST' onSubmit={this.loginUser}>
                                        <div className='form-outline mb-4'>
                                            <input type='email' name="email" placeholder='Email' id='typeEmailX-2' className='form-control form-control-lg' />
                                        </div>

                                        <div className='form-outline mb-4'>
                                            <input type='password' ame="password" placeholder='Mot de passe' id='typePasswordX-2' className='form-control form-control-lg' />
                                        </div>

                                        <button className='btn btn-primary btn-lg btn-block' type='submit'>
                                            Se connecter
                                        </button>
                                    </form>
                                    <hr className='my-4' />

                                    <button className='btn btn-lg btn-success' onClick={this.props.createUser}>
                                        Créer un nouveau compte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
