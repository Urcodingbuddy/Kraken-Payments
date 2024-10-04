"use client"
import { div } from 'framer-motion/client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AuthCard } from '../../../components/AuthCard'
import { AuthInputs } from '@repo/ui/AuthInputs'
import Link from 'next/link'
import { BackgroundLines } from '../../../@/components/ui/background-lines'


export default function SignUp() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await signIn("credentials",{ redirect: false }, {
            email,
            phone,
            password,
            callbackUrl: "/home"
        })
    }

    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <BackgroundLines>
                <div className="w-full h-full flex justify-center items-center absolute">
                    <AuthCard title={'Signup With Kraken'}>
                        <AuthInputs placeholder={'Email or Phone number'} onChange={function (value: string): void {
                            throw new Error('Function not implemented.')
                        }} label={'Email or Phone'} type={'text'} onInput={undefined} />
                        <AuthInputs placeholder={'Password'} onChange={function (value: string): void {
                            throw new Error('Function not implemented.')
                        }} label={'Password'} type={'password'} onInput={undefined} />
                        <div className="py-4 text-center">
                            <p className="text-gray-500">or</p>
                            <p className="text-gray-500">
                                Need an account?{' '}
                                <Link href="/signup" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-up
                                </Link>
                            </p>
                            <div className='h-6 flex justify-center'>
                                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                            </div>
                        </div>
                    </AuthCard>
                </div>
            </BackgroundLines>
        </div>
    )
}