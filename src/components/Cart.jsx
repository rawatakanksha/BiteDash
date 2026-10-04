import { RestaurantMenu } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantMenueList from './RestaurantMenueList'
import { clearCart } from '../store/cartSlice'

function Cart() {
    const cartItem=useSelector((store)=>store.cart.items)
    const dispatch=useDispatch()
    const handleCartEmpty=()=>{
       dispatch(clearCart())
    }
  return (

    <div>
      <button onClick={()=>handleCartEmpty()}>Clear Cart</button>
        <RestaurantMenueList itemCards={cartItem}></RestaurantMenueList>
      
    </div>
  )
}

export default Cart
