import React , {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    //set local referance to useRef lib
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // Points currentuser Function directly to current user context
    const { currentUser, updatePassword, updateEmail } = useAuth()
    // Error handler using use state hook
    const [error, setError] = useState('')
    // Create loading state
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError(" Passwords do not match")
        }

        // create promises to check update information
        const promises = []
        // initialization
        setLoading(true)
        setError('')


        if(emailRef.current.value !== currentUser.email){
            //condition that check if the email input value is not equal to current user email
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            // condition that checks password entered
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            //runs whenever promises have been execute
            navigate('/')
        }).catch(()=>{
            //set errors
            setError('Failed to update account')
        }).finally(()=>{
            //runs eventually whether we fail or succeed
            setLoading(false)
        })

        // return loading status to false to minimize requests sent
        setLoading(false)
    }


  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            { error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same'></Form.Control>
                </Form.Group>


                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'></Form.Control>
                </Form.Group>

                <Button disabled={loading} className='w-100 mt-2' type="submit">Update</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
    <Link to="/">Cancel</Link>
    </div>
    </>
  )
}
