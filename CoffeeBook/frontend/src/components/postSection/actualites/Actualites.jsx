import React from 'react'
import PostActu from '../postActu/PostActu.jsx'
import './actualites.css'


export default function Actualites({feedMessage, posts}) {
   return (
      <div className='container'>
         <p className='actuTitle'>{feedMessage}</p>
         { posts.map(p => <PostActu key={p.id} post={p}/>) }
      </div>
   )
}
