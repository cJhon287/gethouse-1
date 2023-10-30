import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Main from '../components/Main'
import { UserAuth } from '../context/AuthContext';

const Login = (viewValue,toggleNavbar) => {

    const  [navbar,setNavbar] = useState('NavbarLogIn');
    const navigate = useNavigate();

    const [email,setEmail] = useState('')
    const [password,setPassword] =useState('') 
    const {user,logIn} = UserAuth()
    const [error,setError]=useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError('')
        try{
            await logIn(email,password)
            navigate('/')
        }catch(error){
            console.log(error)
            setError(error.message)
        }
    }



    useEffect(() => {
        // Check if we are on the /display route
        if (window.location.pathname === '/login') {
              // Set the navbar to 'NavbarDisplay' if on the /display route
              setNavbar('NavbarLogIn');
        }else if(window.location.pathname === '/'){
              setNavbar('NavbarHome');
        }else if(window.location.pathname === '/display'){
          setNavbar('NavbarDisplay');
          }else if(window.location.pathname === '/account'){
          setNavbar('NavbarAccount');
          }else if(window.location.pathname === '/signup'){
              setNavbar('NavbarSignUp');
          }
        }, []);
        
        useEffect(() => {
        // Check if we should navigate to /display
        if (navbar === 'NavbarHome') {
              navigate('/');
        }else if(navbar === 'NavbarDislay'){
              navigate('/display');
        }else if(navbar === 'NavbarAccount'){
              navigate('/account');
        }else if(navbar === 'NavbarLogIn'){
          navigate('/login');
          }
          else if(navbar === 'NavbarSignUp'){
              navigate('/signup');
              }
        }, [navbar, navigate]);

  return (
    <>
        <Main/>
        <div className = "mt-[-500px] w-full h-screen">

            <div className='absolute'></div>
            <div className = 'relative w-full px-4 py-24 z-50'>
                <div className= 'max-w-[450px] h-[600px] mx-auto bg-gray-300 text-black-600 rounded-lg'>
                    <div className ='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'> Login</h1>
                        {error? <p className='p-3 bg-blue-400'>{error}</p>:null}
                        <form onSubmit = {handleSubmit} className='w-full flex flex-col py-4'>
                            <input onChange = {(e)=> setEmail(e.target.value)} className = 'p-3 my-2 bg-gray-600 rounded' type = 'email' placeholder = 'Email' autoComplete='email' />
                            <input onChange = {(e)=> setPassword(e.target.value)} className = 'p-3 my-2 bg-gray-600 rounded' type='password' placeholder='Password'autoComplete='current-password'/>

                            <button className='bg-blue-600 py-3 my-6 rounded font-bold '>Login</button>

                            <p className = 'py-4'><span className='text-black-600'>Not registered?</span>{'  '}
                            
                            <Link to = '/signup'>
                                    <button onClick ={()=>
                                        setNavbar('NavbarSignUp')
                                    }>Register</button>
                                </Link>
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