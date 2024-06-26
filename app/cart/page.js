import { auth } from '../../auth'
import { Container } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar';



const Cart = async () => {
  const session = await auth();
 
  return (
    <Container maxWidth="xl" sx={{ mb: "100vh"}}>
       <Navbar username={session?.user?.username} />
     
    </Container>
  )
}

export default Cart