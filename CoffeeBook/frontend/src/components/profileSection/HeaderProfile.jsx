import React, { Component } from 'react'
import styles from './HeaderProfile.module.css'

export class HeaderProfile extends Component {
    render() {
        return (
            <div className={styles.imgProfile}>
                <img className={styles.imgProfile} src="https://st4.depositphotos.com/5479794/20515/i/450/depositphotos_205157168-stock-photo-front-view-young-male-adult.jpg" alt="" width="90px" height="120px" />
                <span>Prénom</span>
                <span>Nom</span>
                <i class="bi bi-gear-fill"></i>
            </div>
        )
    }
}

export default HeaderProfile