import React from 'react';
import PostActu from '../postActu/PostActu.jsx';
import './actualites.css';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Actualites({ feedMessage, posts, addActualites }) {
    return (
        <div className='container'>
            <p className='actuTitle'>{feedMessage}</p>
            {posts.map((p) => (
                <PostActu key={p.id} post={p} />
            ))}
            <IconButton aria-label='add to shopping cart' onClick={addActualites} sx={{ color: 'orange' }}>
                <AddBoxIcon fontSize='large' />
            </IconButton>
        </div>
    );
}
