import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
        <div className = "w-full h-screen">

            <div className='absolute'></div>
            <div className = 'relative w-full px-4 py-24 z-50'>
                <div className= 'max-w-[450px] h-[600px] mx-auto bg-gray-300 text-black-600 rounded-lg'>
                    <div className ='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'> Login</h1>
                        <form className='w-full flex flex-col py-4'>
                            <input className = 'p-3 my-2 bg-gray-600 rounded' type = 'email' placeholder = 'Email' autoComplete='email' />
                            <input className = 'p-3 my-2 bg-gray-600 rounded' type='password' placeholder='Password'autoComplete='current-password'/>

                            <button className='bg-blue-600 py-3 my-6 rounded font-bold '>Login</button>

                            <p className = 'py-4'><span className='text-black-600'>Not registered?</span>{'  '}
                            
                                <Link to = '/signup'>Register</Link>
                            </p>

                        </form>

                    </div>

                </div>

            </div>


        </div>
    </>

  )
}

export default Login