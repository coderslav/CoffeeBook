import React, { Component } from 'react';

export default class HomeSubscribe extends Component {
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
                                    <form method='POST'>
                                        <div className='form-outline mb-4'>
                                            <input type='email' placeholder='Email' id='typeEmailX-2' className='form-control form-control-lg' />
                                        </div>

                                        <div className='form-outline mb-4'>
                                            <input type='password' placeholder='Mot de pass' id='typePasswordX-2' className='form-control form-control-lg' />
                                        </div>

                                        <button className='btn btn-primary btn-lg btn-block' type='submit'>
                                            Se connecter
                                        </button>
                                    </form>
                                    <hr className='my-4' />

                                    <button className='btn btn-lg btn-success' type='submit'>
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
