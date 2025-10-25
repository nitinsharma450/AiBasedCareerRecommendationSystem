import { BrowserRouter, Route, Routes } from "react-router"
import CareerRecommandation from "./pages/CareerRecommandation"

import Layout from "./component/Layout"
import Signup from "./pages/Signup"
import { ToastContainer } from "react-toastify"
 
import Login from "./pages/Login"
import Logout from "./pages/Logout"


 
 

function App() {
 

  return (
    <>

 <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

     <BrowserRouter>
     
     <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route  path="/logout" element={<Logout />}/>
      <Route element={<Layout />}>
<Route path="/" element={<CareerRecommandation />} />
       </Route>
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
