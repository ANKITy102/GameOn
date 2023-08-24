import React from 'react'

const GameLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <h1>Game Heading</h1>
        {children}
    </div>
  )
}

export default GameLayout
