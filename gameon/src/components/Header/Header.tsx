"use client"
import Link from "next/link";
import {useState} from "react";
import headerClassNames from "./headerClassNames";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";
import Signup from "../Signup/Signup";
import headerlogo from "../../../public/images/GameOnLogo2.png"
import Image from "next/image";
import { signIn, useSession, signOut } from 'next-auth/react';
const Header = () => {
  const {
    header,
    container,
    li,
    logoContainer,
    link,
    logo,
    nav,
    ul,
    orders,
    contactUs,
    signupBtn,
    signinBtn,
    logoutBtn,
    cart,
    link2
  } = headerClassNames;
  const [isSignupFormOpen, setIsSignupForm] = useState(false);
  const dispatch = useAppDispatch();
  const {totalQuantity} = useCartTotals();

  const toggleForm =() =>{
    setIsSignupForm((prev)=>!prev)
  }
	const { status, data: session } = useSession({
		required: true,
		onUnauthenticated() {
			// handle user not authenticated
		},
	});
  // console.log(status,session)
  const signinHandler = async () => {
		try {
			await signIn();
		} catch (error) {
			console.log('SIGN IN ERROR', error);
		}
	};
  return (
    <>
    <Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
    <div className={header}>
        <div className={container}>

      <Link href="/" className={logoContainer}>
        <h1 className={` ${logo}`}>
          <Image
           src={headerlogo}
           alt="Logo"
           height={45}
          
        
          />
        </h1>
      </Link>
      <nav className={nav}>
        <ul className={ul}>
          <li>
            <button onClick={()=>dispatch(toggleCart())} className={link2}>
              <div className="md:flex block md:items-center">
                <span className="md:block hidden">
                Cart
                </span>
                 <AiOutlineShoppingCart className="inline-block text-3xl" />
              </div>
              <div className={cart}>{totalQuantity}</div>
            </button>
          </li>
          <li className="flex md:flex-row  items-center justify-center h-7 ">
          {session?.user && (
									<>
										<Link href='/orders' className={orders}>
											Orders
										</Link>
										<button onClick={() => signOut()} className={logoutBtn}>
											Logout
										</button>
									</>
								)}
                {/* <div className="ml-3"></div> */}
								{!session?.user && (
									<>
										<button onClick={toggleForm} className={signupBtn}>
											Sign Up
										</button>
										<button onClick={signinHandler} className={` ${signinBtn}`}>
											Sign In
											<FcGoogle
												
												
												className={link}
											/>
										</button>
									</>
								)}
          </li>
        </ul>
      </nav>
        </div>
    </div>
    </>
  );
};
export default Header;
