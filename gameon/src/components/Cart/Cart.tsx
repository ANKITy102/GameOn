"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { removeItemFromCart, toggleCart } from "@/redux/features/cartSlice";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {RiCloseLine} from "react-icons/ri"

const Cart: FC = () => {
    const {showCart,cartItems} = useAppSelector((state)=>state.cart)
    const [renderComponent, setRenderComponent] = useState(false);

    const dispatch = useAppDispatch();

    const handleRemoveItem = (id:string) => dispatch(removeItemFromCart({_id:id}));

     useEffect(()=>{
        setRenderComponent(true);
     },[])   
     if(!renderComponent) return <></>
  return (
    <div
			className={`${classNames.container} ${
				showCart ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
      <div className={classNames.header}>
        <h2 className={classNames.title}>
            Shopping Cart
        </h2>
        <button className={classNames.closeBtn} onClick={()=>dispatch(toggleCart())}>X</button>
      </div>
      <div className={classNames.itemContainer}>
        {cartItems && cartItems.length>0 ?
            cartItems.map(item=> <div key={item._id} className={cartItemClassNames.container}>
                {/* Cart Content */}
                <Image
                    width={100}
                    height={100}
                    src={item.image[0].url}
                    alt={item.name}
                    className={cartItemClassNames.image}
                />
                <div className={cartItemClassNames.details}>
                    <h3 className={cartItemClassNames.name}>
                        {item.name}
                    </h3>
                    <p className={cartItemClassNames.price}>
                        $ {item.price.toFixed(2)}
                    </p>
                </div>
                <div className={cartItemClassNames.quantityContainer}>
                    <span className={cartItemClassNames.quantity}>
                        2
                    </span>
                    <button onClick={()=>handleRemoveItem(item._id)} className={cartItemClassNames.removeButton}>
                        <RiCloseLine/>
                    </button>
                </div>
            </div> )
        : <p>Your Cart is Empty</p> }
      </div>

      <div className={classNames.subtotalContainer}>
        <span className={classNames.subtotalText}>SubTotal</span>
        <span className={classNames.subtotalPrice}>
            999
        </span>
      </div>
      <button className={classNames.checkoutBtn}>
        Checkout
      </button>
    </div>
  )
}

export default Cart

const classNames = {
	container:
		'fixed top-0 right-0 z-50 h-screen w-4/5 md:w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
	header: 'px-4 py-2 bg-gray-200 flex items-center justify-between',
	title: 'text-lg font-semibold',
	closeBtn: 'text-gray-600 hover:text-gray-800',
	itemContainer: 'p-4 flex flex-col items-center border-b',
	subtotalContainer: 'px-4 py-2 bg-gray-200 flex items-center justify-between',
	subtotalText: 'text-gray-600',
	subtotalPrice: 'font-semibold',
	checkoutBtn:
		'w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600',
};

const cartItemClassNames = {
	container: 'flex items-center py-2 border-b',
	image: 'w-12 h-12 object-cover mr-4',
	details: 'flex-1',
	name: 'text-sm md:text-base font-medium',
	price: 'text-gray-600',
	quantityContainer: 'flex items-center',
	quantity: 'px-2',
	removeButton:
		'w-6 h-6 bg-gray-200 text-gray-600 flex items-center justify-center rounded ml-2',
};