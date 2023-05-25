import React from 'react'

export type PlayProps = {
    onClick: () => void
};

function Play({onClick}: PlayProps) {
    return (
        <button onClick={onClick}>PLAY</button>
    )
}

export default Play