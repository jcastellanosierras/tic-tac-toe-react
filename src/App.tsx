import { useState } from 'react'
import './App.css'
import Table from '@/components/Table'

function App() {
  const [started, setStarted] = useState<boolean>(false)

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {!started
        ? (
          <button onClick={() => setStarted(true)}>
            Empezar juego
          </button>
        )
        : <Table setStarted={setStarted} />
      }
    </>
  )
}

export default App
