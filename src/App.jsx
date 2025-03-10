import './App.css'
import AphroditeChat from './components/Pages/AphroditeChat'
import HomePage from './components/Pages/HomePage'
import Minigame from './components/Pages/Minigame'

import { Routes, Route } from 'react-router-dom';


function App()
{
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} ></Route>
                <Route path='/chat' element={<AphroditeChat />} ></Route>
                <Route path='/minigame' element={<Minigame />} ></Route>
            </Routes>
        </>
    )

}

export default App