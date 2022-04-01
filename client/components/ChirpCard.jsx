import React from 'react'

const ChirpCard = ({username, content, created}) => {
    return (
        <>
            <h3>{username}</h3>
            <p>{content}</p>
            <small>{created}</small>
        </>
    )
}

export default ChirpCard;