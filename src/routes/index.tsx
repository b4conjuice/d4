import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'

export const Route = createFileRoute('/')({ component: Home })

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MAX_DAYS: Record<number, number> = {
  0: 31,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
}

function getMaxDays({ month, year }: { month: number; year: number }) {
  if (month === 1) {
    return year % 4 === 0 ? 29 : 28
  }
  return MAX_DAYS[month]
}

function getRandomDate(year: number) {
  const randomMonth = Math.floor(Math.random() * 12)
  const maxDays = getMaxDays({ month: randomMonth, year })
  const randomDay = Math.floor(Math.random() * maxDays)
  const randomDate = new Date(year, randomMonth, randomDay)
  return randomDate
}

function Home() {
  const now = new Date()
  const year = now.getFullYear()
  const piDay = new Date(year, 2, 14)
  const doomsday = format(piDay, 'E')
  const defaultGameState = {
    date: getRandomDate(year),
    selectedDay: '',
    guess: null,
  }
  const [gameState, setGameState] = useState<{
    date: Date
    selectedDay: string
    guess: string | null
  }>(defaultGameState)
  const { date, selectedDay, guess } = gameState
  return (
    <main className='flex grow flex-col p-4'>
      <div className='flex grow flex-col items-center justify-center space-y-4'>
        <h1 className='font-bold'>d4</h1>
        <p>year: {year}</p>
        <p>doomsday: {doomsday}</p>
        <p>guess the day of {format(date, 'M.d.yy')}</p>
        <select
          className='bg-cobalt'
          value={selectedDay}
          onChange={e =>
            setGameState({ ...gameState, selectedDay: e.target.value })
          }
        >
          <option value=''>day</option>
          {DAYS.map((day, index) => (
            <option key={day} value={index}>
              {day}
            </option>
          ))}
        </select>
        {guess === null ? (
          <button
            type='button'
            className='bg-cobalt hover:bg-cobalt/75 border-cb-dusty-blue rounded border-2 p-2 text-white'
            onClick={() => {
              setGameState({ ...gameState, guess: selectedDay })
            }}
          >
            submit guess
          </button>
        ) : (
          <>
            <p>guess: {DAYS[Number(guess)]}</p>
            <p>actual: {format(date, 'E')}</p>
            <button
              type='button'
              className='bg-cobalt hover:bg-cobalt/75 border-cb-dusty-blue rounded border-2 p-2 text-white'
              onClick={() => {
                setGameState({
                  ...defaultGameState,
                  date: getRandomDate(year),
                })
              }}
            >
              play again
            </button>
          </>
        )}
      </div>
    </main>
  )
}
