import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardOfList from './components/BoardOfLists/BoardOfList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './global.scss'
import { Navigate } from 'react-router-dom'
import EditList from './components/EditList/EditList';
import NewList from './components/NewList/NewList';
import ProtectedRoute from './protectedRoute';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Navigate replace to="/login"></Navigate>}></Route> 
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/lists' element={
            <ProtectedRoute>
            <BoardOfList/>
            </ProtectedRoute>
            }/>
            <Route path='/edit-list/:id' element={
             <ProtectedRoute>
            <EditList/>
            </ProtectedRoute>
            }/>
            <Route path='/new-list' element={
            <ProtectedRoute>
            <NewList/>
            </ProtectedRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
