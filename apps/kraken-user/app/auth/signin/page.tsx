"use client"
import { signIn } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';
import { BackgroundLines } from '../../../@/components/ui/background-lines';
import Link from 'next/link';


export default function SignIn() {
    const [identifier, setIdentifier] = useState(''); // For phone number or email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlSignIn = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const result = await signIn('credentials', {
            email: identifier,
            number: identifier,
            password,
            redirect: false
        })
        if (result?.error) {
            setError("Invalid Credentials, try Sign-up")
            return {
                message: "Error while signin"
            }
        } else {
            window.location.href = '/'
        }
    };
    return (
        <div className='w-screen h-[100vh]'>
            <div className="w-full h-full bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
                <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-transparent">
                    <div className="flex flex-col items-center justify-center border w-96 h-100 backdrop-blur-sm text-white">
                        <h1 className="text-2xl font-bold py-4">Sign-In to Kraken-Wallet</h1>
                        <div className="flex space-x-4 py-2">
                            <button 
                            onClick={() => signIn('github')}
                            className="text-white hover:bg-white hover:text-black hover:fill-black py-1  border flex items-center justify-evenly w-24 group">
                                <GitHubSvg /> GitHub
                            </button>
                            <button
                            onClick={() => signIn('google')}
                            className="text-white hover:bg-white hover:text-black py-1 border flex items-center justify-evenly w-24">
                                <GoogleSvg /> Google
                            </button>
                        </div>
                        <p className="text-gray-500">or</p>
                        <form className="w-full max-w-xs">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
                                    Email or Phone-number
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="shadow appearance-none border w-full py-2 px-3 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline rounded-none"
                                    placeholder="email or phone"

                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border w-full py-2 px-3 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline rounded-none"
                                    placeholder="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <button
                                onClick={handlSignIn}
                                type="submit"
                                className="bg-white text-black hover:bg-[#8905FF] hover:text-white py-2 px-4 focus:outline-none focus:shadow-outline rounded-none"
                            >
                                Sign-in
                            </button>
                        </form>
                        <div className="py-6">
                            <p className="text-gray-500">
                                Need an account?{' '}
                                <Link href="/auth/signup" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-up
                                </Link>
                                <div className='h-2 flex justify-center'>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                </div>
                            </p>
                        </div>
                    </div>
                </BackgroundLines>
            </div>
        </div>
    )
}
function GoogleSvg() {
    return (
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.706 8.16699C15.706 7.64699 15.6593 7.14699 15.5727 6.66699H8.66602V9.50699H12.6127C12.4393 10.4203 11.9193 11.1937 11.1393 11.7137V13.5603H13.5193C14.906 12.2803 15.706 10.4003 15.706 8.16699Z" fill="#4285F4"></path><path d="M8.66581 15.3337C10.6458 15.3337 12.3058 14.6804 13.5191 13.5604L11.1391 11.7137C10.4858 12.1537 9.65247 12.4204 8.66581 12.4204C6.75914 12.4204 5.13914 11.1337 4.55914 9.40039H2.11914V11.2937C3.32581 13.6871 5.79914 15.3337 8.66581 15.3337Z" fill="#34A853"></path><path d="M4.55967 9.39289C4.41301 8.95289 4.32634 8.48622 4.32634 7.99956C4.32634 7.51289 4.41301 7.04622 4.55967 6.60622V4.71289H2.11967C1.61967 5.69956 1.33301 6.81289 1.33301 7.99956C1.33301 9.18622 1.61967 10.2996 2.11967 11.2862L4.01967 9.80622L4.55967 9.39289Z" fill="#FBBC05"></path><path d="M8.66581 3.58699C9.74581 3.58699 10.7058 3.96033 11.4725 4.68033L13.5725 2.58033C12.2991 1.39366 10.6458 0.666992 8.66581 0.666992C5.79914 0.666992 3.32581 2.31366 2.11914 4.71366L4.55914 6.60699C5.13914 4.87366 6.75914 3.58699 8.66581 3.58699Z" fill="#EA4335"></path></svg>
    )
}
function GitHubSvg() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-4 w-4 fill-white group-hover:fill-black  transition-colors" aria-label="GitHub"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0183 0.405518C5.73469 0.405518 0.655029 5.50047 0.655029 11.8036C0.655029 16.8421 3.90974 21.107 8.42489 22.6165C8.9894 22.73 9.19618 22.3712 9.19618 22.0695C9.19618 21.8052 9.17757 20.8995 9.17757 19.9558C6.01659 20.6352 5.35835 18.597 5.35835 18.597C4.85036 17.2761 4.09768 16.9365 4.09768 16.9365C3.06309 16.2383 4.17304 16.2383 4.17304 16.2383C5.32067 16.3138 5.92286 17.4083 5.92286 17.4083C6.9386 19.1443 8.57538 18.6538 9.23386 18.3518C9.32782 17.6158 9.62904 17.1063 9.94886 16.8233C7.42775 16.5591 4.77523 15.5778 4.77523 11.1996C4.77523 9.95415 5.22647 8.93516 5.94146 8.14266C5.82866 7.85966 5.43348 6.68944 6.05451 5.12321C6.05451 5.12321 7.01396 4.82122 9.17733 6.2932C10.1036 6.0437 11.0587 5.91677 12.0183 5.91571C12.9777 5.91571 13.9558 6.04794 14.8589 6.2932C17.0226 4.82122 17.982 5.12321 17.982 5.12321C18.603 6.68944 18.2076 7.85966 18.0948 8.14266C18.8287 8.93516 19.2613 9.95415 19.2613 11.1996C19.2613 15.5778 16.6088 16.5401 14.0688 16.8233C14.4828 17.1818 14.8401 17.861 14.8401 18.9368C14.8401 20.4653 14.8215 21.692 14.8215 22.0692C14.8215 22.3712 15.0285 22.73 15.5928 22.6167C20.1079 21.1068 23.3626 16.8421 23.3626 11.8036C23.3813 5.50047 18.283 0.405518 12.0183 0.405518Z"></path></svg>
    )
}
