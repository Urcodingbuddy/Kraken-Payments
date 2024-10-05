"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AuthCard } from '../../../components/AuthCard'
import { AuthInputs } from '@repo/ui/AuthInputs'
import Link from 'next/link'
import { BackgroundLines } from '../../../@/components/ui/background-lines'
import { useRouter } from 'next/router'
// import bcrypt from "bcrypt"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        // const hashedPassword = await bcrypt.hash(password, 10)
        const result = await signIn("credentials", { redirect: false }, {
            email,
            phone,
            password,
            callbackUrl: "/home"
        })

        // if(result?.ok){
        //     router.push("/auth/signin")
        // }else{
        //     alert("failed to Sign-up")
        // }
    }

    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <BackgroundLines>
                <div className="w-full h-full flex justify-center items-center absolute">
                    <AuthCard title={'Signup With Kraken'}>
                        <AuthInputs placeholder={'Email'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            label={'Email'} type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Phone number'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            label={'Phone'} type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Password'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            label={'Password'} type={'password'} onInput={undefined} />

                        <AuthInputs placeholder={'Confirm Password'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            label={'Confirm Password'} type={'password'} onInput={undefined} />

                        <div className="py-4 text-center">
                            <p className="pb-4 text-gray-500">or</p>
                            <p className="text-gray-500">
                                Already have a Account?{' '}
                                <Link href="/auth/signup" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-In
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