import {Route, Outlet, Navigate} from 'react-router-dom'

function ProtectedRoutes() {
    const token = localStorage.getItem('token')
  return (
    <Route>
        {
            token? <Outlet/> : <Navigate to='/login'/>
        }
      
    </Route>
  )
}

export default ProtectedRoutes
