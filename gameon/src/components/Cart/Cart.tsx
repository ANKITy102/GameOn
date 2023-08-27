"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { toggleCart } from "@/redux/features/cartSlice";
import { FC } from "react";

const Cart: FC = () => {
    const {cart: {showCart,cartItems}} = useAppSelector((state)=>state)
    const dispatch = useAppDispatch();
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

            </div> )
        : <p>Your Cart is Empty</p> }
      </div>
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