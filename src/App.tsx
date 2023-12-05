import { Route, Routes } from "react-router-dom"
import { CreateStudent } from "./page/CeateStudnt/CreateStudnt"
import { Axios } from "./page/axios/axios"
function App() {


  return (
    <Routes>
      <Route path="/create" element={<CreateStudent/>} />
      <Route path="*" element={<h1>page not found</h1>} />
      <Route path="/axios" element={<Axios/>}/>
    </Routes>
  )
}

export default App
