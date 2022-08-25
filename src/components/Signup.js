import React , {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'

export default function Signup() {
    //set local referance to useRef lib
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // Points signup Function directly to sign up context
    const { signup, currentUser } = useAuth()
    // Error handler using use state hook
    const [error, setError] = useState('')
    // Create loading state
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        // Prevents form from refreshing

        //conditionals to be met before sign up
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError(" Passwords do not match")
        }

        try {
            //set error back to empty string
            setError('')
            setLoading(true)
            await  signup(emailRef.current.value, passwordRef.current.value)
        }catch{
            setError('Failed to create an account')
        }

        // Set loading status to false after clicking on submit
        setLoading(false)
    }


  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {currentUser && currentUser.email}
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


                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                </Form.Group>

                <Button disabled={loading} className='w-100 mt-2' type="submit">Sign Up</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? Log In
    </div>
    </>
  )
}
