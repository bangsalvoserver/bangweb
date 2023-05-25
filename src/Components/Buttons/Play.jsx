import React from 'react'
import './Button-Play.css'








function Play(props) {
    return (
        <button onClick={props.onClick} className='play-button'>
            PLAY
        </button>
    )
}

export default Play