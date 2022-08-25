import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"

function App() {
  return (
    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh"}}>
      <div className="w-100" style={{ maxWidth: '400px'}}>
        <Router>
          <AuthProvider>
            <Routes>
            <Route exact path="/" element={<HomePage/>}/>
              <Route path='/signup' element={<Signup/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>

    )
}

export default App;
