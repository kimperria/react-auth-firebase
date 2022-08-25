import React , {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Login() {
    //set local referance to useRef lib
    const emailRef = useRef()
    const passwordRef = useRef()
    // Points signup Function directly to sign up context
    const { login } = useAuth()
    // Error handler using use state hook
    const [error, setError] = useState('')
    // Create loading state
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        // Prevents form from refreshing


        try {
            //set error back to empty string
            setError('')
            setLoading(true)
            await  login(emailRef.current.value, passwordRef.current.value)
        }catch{
            setError('Failed to sign in')
        }

        // Set loading status to false after clicking on submit
        setLoading(false)
    }


  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            { error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>

                <Button disabled={loading} className='w-100 mt-2' type="submit">Log In</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
    </div>
    </>
  )
}
