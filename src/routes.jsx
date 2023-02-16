import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Repository from './pages/Repository'

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repository' element={<Repository />} >
        <Route path=':reponame' element={<Repository />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}