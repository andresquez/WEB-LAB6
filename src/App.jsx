import React, {useEffect, useState} from 'react'
import './App.css'
import Card from './components/Card/Card.jsx'

const images = [
  {'src': 'https://i.imgur.com/NPfQXPA.png'},
  {'src': 'https://i.imgur.com/56XOqFh.png'},
  {'src': 'https://i.imgur.com/tNEvx0K.png'},
  {'src': 'https://i.imgur.com/Ka9BKif.png'},
  {'src': 'https://i.imgur.com/gXPwPdV.png'},
  {'src': 'https://imgur.com/w7KOU6k.png'},
  {'src': 'https://imgur.com/yGv2DMH.png'},
  {'src': 'https://i.imgur.com/y37atm0.jpg'},
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turnos, setTurnos] = useState(0)
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const[matched, setMatched] = useState(null)
  const [isGameWon, setIsGameWon] = useState(false)

const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, isFlipped: false, id: Math.random() }))
    setCards(shuffledCards)
    setTurnos(0)
    setMatched(0)
    setIsGameWon(false)
   
    const audio = new Audio('../../public/f1.mp3');
    audio.play();
    console.log("audio playing")
}

  const flipCard = (Card) => {
    firstCard ? setSecondCard(Card) : setFirstCard(Card)
  }

  const newTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurnos( turnos + 1)
  }
  console.log({ cards })
  console.log({firstCard})
  console.log({ secondCard })


  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.src === secondCard.src && firstCard.id !== secondCard.id) {
        console.log('match')
        setMatched(matched + 1)
        setCards(cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return {...card, isFlipped: true}
          }
          return card
        }))
        newTurn()
        if (matched + 1 === 8) { 
          setIsGameWon(true)
        }
  
      } else {
        console.log('no match')
        setTimeout(() => { newTurn() }, 1000)
      }
    }
    
  }, [firstCard, secondCard, matched])
  


  return (
    <div className='App'>
      <h1 className='titulo'>quesoMemoria</h1>
      <div className='header'>
        <h2 className='turnCounter'>Turnos: {turnos}</h2>
        <button onClick={shuffleCards}>Empezar nuevo juego</button>
      </div>
      <div className="tablero">
        {cards.map((card) => (
          <Card
            key={card.id}
            link={card.src}
            card={card}
            flipped={card === firstCard || card === secondCard || card.isFlipped}
            flipCard={flipCard}
          />
        ))}
      </div>
      {isGameWon && (
        <div className="game-won">
          <h1 className = "wonMsj">¡Felicitaciones, has ganado el juego! Te tomo: {turnos} turnos.</h1>
          <button onClick={shuffleCards}>Empezar nuevo juego</button>
        </div>
      )}
    </div>
  )
  
}

export default App
