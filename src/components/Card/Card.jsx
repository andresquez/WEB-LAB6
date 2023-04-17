import React from 'react'
import './Card.css'

const Card = ({link,flipped,flipCard,card}) => {

  const handleClick = () => {
    flipCard(card)
}

  return (
    <div className="Card">
      <div className = {flipped ? "flipped" : ""} onClick={handleClick}>
        <img src={link} className="front"></img>
        <img src="../../public/f1tire.png" className="back"></img>
      </div>
    </div>
  )
}

export default Card