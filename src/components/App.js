import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./HomePage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import ForgotPassword from './ForgotPassword'

function App() {
  return (
    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh"}}>
      <div className="w-100" style={{ maxWidth: '400px'}}>
        <Router>
          <AuthProvider>
            <Routes>
            {/* <Route exact path="/" element={<HomePage/>}/> */}
            <Route path="/" element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
            }/>
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/forgot-password' element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>

    )
}

export default App;
