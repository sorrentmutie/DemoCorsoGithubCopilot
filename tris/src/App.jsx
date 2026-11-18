import { useState } from 'react'
import './App.css'

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

export function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const result = calculateWinner(squares)
  const isDraw = !result && squares.every(Boolean)

  const handleClick = (i) => {
    if (squares[i] || result) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  const reset = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  let status = `Turno di: ${xIsNext ? 'X' : 'O'}`
  if (result) status = `Ha vinto: ${result.winner}!`
  else if (isDraw) status = 'Pareggio!'

  return (
    <main className="game">
      <h1>Tris</h1>
      <p className="status">{status}</p>
      <div className="board">
        {squares.map((value, i) => (
          <button
            key={i}
            className={`square${result?.line.includes(i) ? ' win' : ''}`}
            onClick={() => handleClick(i)}
            aria-label={`Casella ${i + 1}`}
          >
            {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>Nuova partita</button>
    </main>
  )
}

export default App
