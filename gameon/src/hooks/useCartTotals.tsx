"use client"
import {useState, useEffect} from "react"
import { useAppSelector } from "./storeHook";
interface CartTotals{
    totalPrice: number;
    totalQuantity: number;
}
const useCartTotals = () : CartTotals =>{
    const [totals, setTotals] = useState<CartTotals>({totalPrice:0, totalQuantity:0})
    const {cartItems} = useAppSelector(state=>state.cart)
    useEffect(()=>{
        const calculateCartTotals = (): void => {
            let totalPrice = 0;
            let totalQuantity = 0;
        
            cartItems.forEach((item)=>{
              totalPrice += (item.price * item.quantity);
                totalQuantity+=item.quantity;
            })
            console.log(totalPrice,totalQuantity)
           setTotals({totalPrice,totalQuantity})
          };
          calculateCartTotals();
    },[cartItems]);
    return totals;
}
export default useCartTotals;