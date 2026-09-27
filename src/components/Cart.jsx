import { RestaurantMenu } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'
import RestaurantMenueList from './RestaurantMenueList'

function Cart() {
    const cartItem=useSelector((store)=>store.cart.items)
  return (

    <div>
        <RestaurantMenueList itemCards={cartItem}></RestaurantMenueList>
      
    </div>
  )
}

export default Cart
