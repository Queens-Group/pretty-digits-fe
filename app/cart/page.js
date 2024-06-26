import { auth } from '../../auth'
import { Container } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar';



const Cart = async () => {
  const session = await auth();
 
  return (
    <Container maxWidth="xl" sx={{ pt: 15, pr: 5, pl:5 }}>
       <Navbar username={session?.user?.username} />
     
    </Container>
  )
}

export default Cart