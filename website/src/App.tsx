import { BrowserRouter, Route, Routes } from "react-router"
import CareerRecommandation from "./pages/CareerRecommandation"

import Layout from "./component/Layout"
import Signup from "./pages/Signup"
import { ToastContainer } from "react-toastify"


 
 

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
      <Route element={<Layout />}>
<Route path="/" element={<CareerRecommandation />} />
       </Route>
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
