"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AuthCard } from '../../../components/AuthCard'
import { AuthInputs } from '@repo/ui/AuthInputs'
import Link from 'next/link'
import { BackgroundLines } from '../../../@/components/ui/background-lines'
import { Button } from '@repo/ui/button'
import { GoogleBtn } from '@repo/ui/GoogleBtn'
import { Gitbtn } from '@repo/ui/GitBtn'
import { Loader } from '@repo/ui/loader'


export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            action: "signIn",
            callbackUrl: "/home"
        })
        if (result?.error) {
            setError(result.error)
            setLoading(false)
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
                    <AuthCard title={'Sign-In to KRAKEN'}>
                        <div className='flex pb-2 gap-8 justify-center'>
                            <GoogleBtn /><Gitbtn />
                        </div>
                        <p className="text-gray-500 text-center">or</p>
                        <AuthInputs placeholder={'Email or Phone number'}
                            onChange={(value: string) => setEmail(value)}
                            label={'Email or Phone'}
                            type={'text'} onInput={undefined} />

                        <AuthInputs placeholder={'Password'}
                            onChange={(value) => setPassword(value)}
                            label={'Password'} type={'password'}
                            onInput={undefined} />
                        <div className='w-[14.5rem] mt-2 h-10'>
                        <Button type={"submit"} onClick={handleSubmit}>
                            <span className='inline-flex gap-5 '>Sign-In {loading && <Loader/>}</span>
                        </Button>
                        </div>
                        <div className="py-4 text-center">
                            <p className="text-gray-500">
                                Need an account?{' '}
                                <Link href="/auth/signup" className="text-[#8905FF] hover:text-[#eee0ff]">
                                    Sign-up
                                </Link>
                            </p>
                            <div className='w-[14.5rem] mt-2 flex justify-center'>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        </div>

                    </AuthCard>
                </div>
            </BackgroundLines>
        </div>
    )
}


