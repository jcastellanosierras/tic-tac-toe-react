import { Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react"
import styles from '@/components/Styles.module.css'
import Cell from "./Cell"

const PLAYER_X = 'X'
const PLAYER_O = 'O'

const checkRow = (row: ('' | 'X' | 'O')[]) => row[0] === row[1] && row[1] === row[2] && row[0] !== ''

const checkColumn = (rows: ('' | 'X' | 'O')[][], columnIndex: number) =>
  rows[0][columnIndex] === rows[1][columnIndex] && rows[1][columnIndex] === rows[2][columnIndex] && rows[0][columnIndex] !== ''

const checkDiagonals = (rows: ('' | 'X' | 'O')[][]) =>
  (rows[0][0] === rows[1][1] && rows[1][1] === rows[2][2] && rows[0][0] !== '') ||
  (rows[0][2] === rows[1][1] && rows[1][1] === rows[2][0] && rows[0][2] !== '')

const checkWinner = (rows: ('' | 'X' | 'O')[][]): 'X' | 'O' | false => {
  for (let i = 0; i < 3; i++) {
    if (checkRow(rows[i])) return rows[i][0] || false
    if (checkColumn(rows, i)) return rows[0][i] || false
  }
  if (checkDiagonals(rows)) return rows[1][1] || false

  return false
}

export default function Table({
  setStarted
}: {
  setStarted: Dispatch<SetStateAction<boolean>>
}) {
  const [winner, setWinner] = useState<'X' | 'O' | false>(false)
  const [player, setPlayer] = useState<'X' | 'O'>(PLAYER_X)
  const [rows, setRows] = useState<('' | 'X' | 'O')[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])

  useEffect(() => {
    const winner = checkWinner(rows)
    if (winner) {
      alert(`El ganador es ${winner}`)
      setWinner(winner)
    }
  }, [rows])

  const handleClick = (_e: MouseEvent<HTMLDivElement>, rowIndex: number, boxIndex: number) => {
    if (rows[rowIndex][boxIndex] !== '') {
      alert('No puedes seleccionar esta casilla')
      return
    }

    const newRows = rows.map((row, i) => (
      i === rowIndex ? row.map((box, j) => (j === boxIndex ? player : box)) : row
    ))

    setRows(newRows)
    setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X)
  }

  const handleReboot = () => {
    setRows([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setWinner(false)
    setPlayer(winner === PLAYER_X ? PLAYER_O : PLAYER_X)
  }

  return (
    <>
      {winner && (
        <>
          <h2>El ganador es {winner}</h2>
          <button onClick={() => setStarted(false)}>Volver al inicio</button>
          <button onClick={handleReboot}>Reiniciar juego</button>
        </>
      )}
      <h2>Turno del jugador: {player}</h2>
      <div className={styles.table}>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.row}>
            {row.map((box, boxIndex) => (
              <Cell
                key={`box-${boxIndex}`}
                value={box}
                onClick={(e) => handleClick(e, rowIndex, boxIndex)}
                disabled={Boolean(winner)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
