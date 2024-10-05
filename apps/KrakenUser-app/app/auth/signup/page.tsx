"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AuthCard } from '../../../components/AuthCard'
import { AuthInputs } from '@repo/ui/AuthInputs'
import Link from 'next/link'
import { BackgroundLines } from '../../../@/components/ui/background-lines'
import { GoogleBtn } from '@repo/ui/GoogleBtn'
import { Gitbtn } from '@repo/ui/GitBtn'
import { Button } from '@repo/ui/button'


export default function SignUp() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    

    const handleSubmit = async () => {

        if (password !== confirmPassword) {
            setError("Password does not match")
            return
        }
        const result = await signIn("credentials",{
            email,
            name,
            phone,
            password,
            redirect:false,
            action:"signUp",
            callbackUrl: "/home"
        })

        if (result?.error) {
            setError(result.error)
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
                    <AuthCard title={'Signup With Kraken'}>
                    <div className='flex pb-2 gap-8 justify-center'>
                            <GoogleBtn/><Gitbtn />
                            </div>
                        <p className="text-gray-500 text-center">or</p>
                        <AuthInputs placeholder={'username'}
                            onChange={(value) => setName(value)}
                            label={'Name'} type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Email'}
                            onChange={(value) => setEmail(value)}
                            label={'Email'} type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Phone number'}
                            onChange={(value) => setPhone(value)}
                            label={'Phone'} type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Password'}
                            onChange={(value) => setPassword(value)}
                            label={'Password'} type={'password'} onInput={undefined} />

                        <AuthInputs placeholder={'Confirm Password'}
                            onChange={(value) => setConfirmPassword(value)}
                            label={'Confirm Password'} type={'password'} onInput={undefined} />
                            <Button onClick={handleSubmit}>Signin</Button>
        
                        <div className="pt-2">
                            <p className="text-gray-500">
                                Already have a Account?{' '}
                                <Link href="/auth/signin" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-In
                                </Link>
                            </p>
                            <div className='h-6 flex justify-center'>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        </div>
                    </AuthCard>
                </div>
            </BackgroundLines>
        </div>
    )
}