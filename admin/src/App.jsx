import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddItems from "./components/AddItems"
import EditItem from './components/EditItem';
import AddNew from './components/AddNew';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view' element={<AddItems />} />
        <Route path='/add' element={<AddNew />} />
        <Route path='/view/:id' element={<AddItems />} />
        <Route path='/view/edit/:id' element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App