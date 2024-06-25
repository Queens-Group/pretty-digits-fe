import { auth } from '../../auth'
import { Container } from '@mui/material'
import React from 'react'

const Cart = async () => {
  const session = await auth();
  console.log({session})
  return (
    <Container maxWidth="xl" sx={{ pt: 15, pr: 5, pl:5 }}>
      <div>Cart {session?.expires}</div>
    </Container>
  )
}

export default Cart