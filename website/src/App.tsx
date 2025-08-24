import { BrowserRouter, Route, Routes } from "react-router"
import CareerRecommandation from "./pages/CareerRecommandation"

 
 

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
<Route path="/" element={<CareerRecommandation />} />
       
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
