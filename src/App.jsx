import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './Pages/Login/Login'
import Ajouter from './Pages/Ajouter/Ajouter'
import Lister from './Pages/Lister/Lister'
import Dashbord from './Pages/Dashbord/Dashbord'
import Inscrire from './Pages/Inscrire/Inscrire'
import ProtectedRoute from './Components/ProtectedRoute'
import Profile from './Pages/Profil/Profile'
import Oublier from './Pages/Oublier/Oublier'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/*Routes Publiques */}
          <Route path="/" element={<Login />} />
          <Route path='/inscrire' element={<Inscrire/>}/>
          <Route path='/forgetpassword' element={<Oublier/>}/>

          {/*Routes Privées (Toutes protégées d'un coup) */}
          <Route 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path='/ajouter' element={<Ajouter />} />
            <Route path='/lister' element={<Lister />} />
            <Route path='/dashbord' element={<Dashbord />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
