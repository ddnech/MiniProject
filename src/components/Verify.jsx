import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EmailVerification () {
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState(false);


    const { token } = useParams()

    useEffect(() => {
        axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', null, { headers: {Authorization: `Bearer ${token}`}})
        .then(() => {
            setVerify(true)})
        .catch(() => setError(true))
    }, [])

    return (
        <div className='w-screen h-screen grid content-center justify-center'>
            <div className='w-[28rem] h-[25rem] grid grid-flow-row rounded overflow-hidden shadow-2xl'>
                <div className='bg-header w-full h-32 object-cover bg-no-repeat bg-center bg-cover grid'>
                    <div className='font-monts font-bold text-6xl text-center text-ivory drop-shadow-5xl m-6'>
                    </div>
                </div>
                <div className='mt-14 h-fit w-full'>
                    <div className='grid grid-flow-row gap-2 w-full'>
                        {verify ? (
                            <>
                            <div className='font-monts font-bold text-xl text-center text-darkcho m-4'>
                            <h3>Thank you for verifying your email, you may log in now!</h3>
                            </div>
                            <Link to="/home" className='m-auto grid grid-flow-row w-60 content-center'><button
                            className='w-full py-2 my-4 bg-olive text-ivory hover:bg-sage hover:text-black hover:font-bold'
                            type='submit'
                            >
                            Go to Home
                            </button>
                            </Link>
                            </>
                            ) : 
                            (
                            <>
                            <div className='font-monts font-bold text-xl text-center text-darkcho m-4'>
                            <h3>You have not verify your email.</h3>
                            </div>
                            <span className='m-auto grid grid-flow-row w-60 content-center'><button
                            className='w-full py-2 my-4 bg-gray-400 text-ivory'
                            type='submit' disabled={true} // ---> 
                            >
                            Go to Home
                            </button>
                            </span>
                            </>
                            )}
                    </div>
                </div>                 
            </div>
        </div>
    );
}