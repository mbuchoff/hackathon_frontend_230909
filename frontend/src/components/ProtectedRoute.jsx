import { Navigate, Outlet, useLocation} from "react-router-dom"

const ProtectedRoute = () =>{

    const location = useLocation()

    let enabled

    if(location.state === undefined || location.state === null)
        enabled = false
    else if(location.state.number === undefined || location.state.language === undefined || location.state.displayLang === undefined)
        enabled = false
    else if(location.state.number === null || location.state.language === null || location.state.displayLang === null)
        enabled = false
    else
        enabled = true

    

    return( enabled?  <Outlet/> : <Navigate to= '/choose-game'/>
    )
  }
  
  export default ProtectedRoute