import React from 'react'
import logo from '../assets/logo.png'
import { href, NavLink } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { IoSearch, IoSearchOutline } from "react-icons/io5";
const Header = () => {
  
  const navigation = [
    {
      label : "Dizi",
      href :"tv"
    },
    {
      label:"Film",
      href:"movie"
    }
  ]

  return (

    <header  className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75'>
            <div className='container mx-auto px-3 flex items-center h-full'>

                <div>
                    <img
                            src={logo}
                            alt='logo'
                            width={240}

                    />
                </div>
              <nav className='hidden lg:flex items-center gap-1 ml-5'>
                {
                  navigation.map((nav,index)=>{
                    return(
                      <div>
                        <NavLink key={nav.label} to={nav.href} className={({isActive})=> `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}> 
                          {nav.label}
                        </NavLink>
                      </div>
                    )
                  })
                }
              </nav>
              <div className='ml-auto flex items-center gap-5'>
                <form className='flex items-center gap-2'>
                  <input
                  type='text'
                  placeholder='Search...'
                  className='bg-transparent px-4 py-1 outline-none border-none'
                  />
                  <button className='text-2xl text-white'>
                    <IoSearchOutline/>
                  </button>
                </form>
               
                <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                    <img
                        src={userIcon}
                        width='w-10 h-10'
                        />
                </div>
              </div>
            </div>

    </header>
  )
}

export default Header
