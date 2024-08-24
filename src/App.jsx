import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import supabase from './supabase'
import Login from './projeck/dashboard/Login'
import Register from './projeck/dashboard/Register'
import Layout from './projeck/Layout'
import TicTacTo from './projeck/TicTacTo'




const App = () => {

  const [session, setSession] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)  
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  
  if(!session) {
    return (
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    )
  }

  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path='/tictacto' element={<TicTacTo/>}/>
      </Route>
    </Routes>
  )


}

export default App


