import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {user} = useSelector((state) => state.users);
  const firstName = user.name.split(' ')[0];
  return (
    <div>
      <h1>Home</h1>
      {user && <h1>{firstName}</h1>}
    </div>
  )
}

export default Home
