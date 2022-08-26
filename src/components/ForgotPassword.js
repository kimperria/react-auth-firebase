import React , {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    //set local referance to useRef lib
    const emailRef = useRef()
    // Points signup Function directly to sign up context
    const { resetPassword } = useAuth()
    // Success message
    const [message, setMessage] = useState('')
    // Error handler using use state hook
    const [error, setError] = useState('')
    // Create loading state
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        // Prevents form from refreshing


        try {
            //set error and message to empty string
            setMessage('')
            setError('')
            setLoading(true)
            await  resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        }catch{
            setError('Failed to reset password')
        }

        // Set loading status to false after clicking on submit
        setLoading(false)
    }


  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            { error && <Alert variant='danger'>{error}</Alert>}
            { message && <Alert variant='success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>

                <Button disabled={loading} className='w-100 mt-2' type="submit">Reset Password</Button>
            </Form>
            <div className='w-100 text-center mt-2'>
                <Link to="/login">Login</Link>
            </div>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
    </div>
    </>
  )
}
