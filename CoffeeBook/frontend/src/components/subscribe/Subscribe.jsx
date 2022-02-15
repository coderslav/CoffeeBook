import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const PORT  = 5000;

export default class Subscribe extends Component {

    createAccount = async (e) => {
        e.preventDefault();
        const subscribeForm = new FormData(e.currentTarget);
        const newClient = {};
        for (let [key, value] of subscribeForm) {
            newClient[key] = value;
        }
        const newUser = await axios.post(`http://localhost:${PORT}/subscribe`, newClient);
        this.props.newUserCreated({ 
            ...newUser.data.user
        })
    }

    render() {
        return (
            <div className='vh-100'>
                <div className='container py-5'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                            <div className='text-white text-center'>
                                <h1>CoffeeBook</h1>
                                <h4>Rejoignez nous !</h4>
                            </div>
                            <div className='card shadow-2-strong' style={{ borderRadius: '1rem' }}>
                                <div className='card-body p-5 text-center'>
                                    <form method='POST' onSubmit={this.createAccount}>
                                        <div className='form-outline mb-4'>
                                            <input type='text' name="firstName" placeholder='Prénom' id='typeFirstName-2' className='form-control form-control-lg' />
                                        </div>

                                        <div className='form-outline mb-4'>
                                            <input type='text' name="lastName" placeholder='Nom de Famille' id='typeLastName-2' className='form-control form-control-lg' />
                                        </div>

                                        <div className='form-outline mb-4'>
                                            <input type='email' name="email" placeholder='Email' id='typeEmailX-2' className='form-control form-control-lg' />
                                        </div>

                                        <div className='form-outline mb-4'>
                                            <input type='password' name="password" placeholder='Mot de passe' id='typePasswordX-2' className='form-control form-control-lg' />
                                        </div>

                                        <button className='btn btn-primary btn-lg btn-block' type='submit'>
                                            Créer mon compte
                                        </button>
                                    </form>
                                    <hr className='my-4' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )   

    }
}
