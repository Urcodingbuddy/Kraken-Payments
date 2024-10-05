"use client"
import { div } from 'framer-motion/client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AuthCard } from '../../../components/AuthCard'
import { AuthInputs } from '@repo/ui/AuthInputs'
import Link from 'next/link'
import { BackgroundLines } from '../../../@/components/ui/background-lines'
import { Button } from '@repo/ui/button'
import { GoogleBtn } from '@repo/ui/GoogleBtn'
import { Gitbtn } from '@repo/ui/GitBtn'


export default function SignIn() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    let name = "harsh"
    const handleSubmit = async () => {
        console.log("i am signin")
        const result = await signIn("credentials", {
            email,
            phone,
            name,
            password,
            callbackUrl: "/home"
        })
        console.log("email");
        console.log(email);
        console.log(result);
        if (result?.error) {
            console.error("Error while signing in:", result.error);
            alert("Sign-in failed. Please check your credentials.");
            // handle error by setting it in the UI or showing an alert
        } else if (result?.url) {
            window.location.href = result.url;
        } else {
            console.error("Unexpected result:", result);
        }
    }

    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <BackgroundLines>
                <div className="w-full h-full flex justify-center items-center absolute">
                    <AuthCard title={'Sign-In to Kraken'}>
                        
                        <AuthInputs placeholder={'Email or Phone number'}
                            onChange={(value: string) => setEmail(value)}
                            label={'Email or Phone'}
                            type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Phone number'}
                            onChange={(value) => setPhone(value)}
                            label={'phone'} type={'text'}
                            onInput={undefined} />

                        <AuthInputs placeholder={'Password'}
                            onChange={(value) => setPassword(value)}
                            label={'Password'} type={'password'}
                            onInput={undefined} />
                        <Button type={"submit"} onClick={handleSubmit}>Signin</Button>
                        <div className="py-4 text-center">
                            <p className="text-gray-500">or</p>
                            <GoogleBtn/><Gitbtn/>
                            <p className="text-gray-500">
                                Need an account?{' '}
                                <Link href="/signup" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-up
                                </Link>
                            </p>
                            <div className='h-6 flex justify-center'>
                                {/* {{error && <p style={{ color: 'red' }}>{error}</p>} */}
                            </div>
                        </div>

                    </AuthCard>
                </div>
            </BackgroundLines>
        </div>
    )
}



/*

 <AuthCard title={'Sign-In to Kraken'}>
                        <AuthInputs placeholder={'Email or Phone number'}
                        onChange={(value:string) => setEmail(value)}
                        label={'Email or Phone'}
                        type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Phone number'}
                           onChange={(value) => setPhone(value)}
                            label={'phone'} type={'text'}
                            onInput={undefined} />

                        <AuthInputs placeholder={'Password'}
                        onChange={(value) => setPassword(value)}
                            label={'Password'} type={'password'}
                            onInput={undefined} />
                        <Button type={"submit"} onClick={handleSubmit}>Signin</Button>
                        <div className="py-4 text-center">
                            <p className="text-gray-500">or</p>
                            <p className="text-gray-500">
                                Need an account?{' '}
                                <Link href="/signup" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-up
                                </Link>
                            </p>
                            <div className='h-6 flex justify-center'>
                                // {/* {error && <p style={{ color: 'red' }}>{error}</p>} */
// </div>
// </div>
// </AuthCard>
