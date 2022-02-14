import React from 'react'
import PostActu from '../postActu/PostActu.jsx'
import './actualites.css'


export default function Actualites() {
   return (
      <div className='container'>
         <p className='actuTitle'>Vos dernières actualités</p>
         <PostActu />
      </div>
   )
}
