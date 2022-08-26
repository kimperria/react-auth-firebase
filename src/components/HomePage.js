import React, { useState } from 'react'
import axios from 'axios'

export default function HomePage() {

  //use state effect to set books as an initial empty array
  const [books, setBook] = useState([])

  React.useEffect(()=> {
    // define endpoint
    let final_url = "https://www.anapioficeandfire.com/api/books";
    // send get request and equate it the empty array
    axios.get(final_url).then((response)=>{
      let js_response = response.data;
      setBook(js_response)
    })
  },[])
  return (
    <div>
      <h2 className='text-center'>This project consumes Ice and Fire Open API</h2>
      <h5>Here is a list of all name of books currently available</h5>
      <p>
        {books.map((book) => {
          //loop  through books arays to display books name
          return book.name;
        })}
      </p>
    </div>
  )
}
