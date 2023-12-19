import React, { useState } from 'react'
import { IMAGES } from '@/config'
import Image from 'next/image'
import Swal from 'sweetalert2'

type TLogon = { 
    accid: String, 
    password: string 
}

const LoginForm = () => {
    const [busy, setBusy] = useState<boolean>(false)	
    const [logon, setLogon] = useState<{ accid: String, password: string }>({
        accid: '',
        password: ''
    })

    const logonToServer = async ({ accid, password }: TLogon) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accid,
                password
            })
        })
        const data = await res.json()
        return data
    }

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setBusy(true)
        logonToServer(logon).then(res => {
            if (res.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    text: 'You are now been logged in to your dashboard...',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/online'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: res.message,
                    showConfirmButton: true
                })
            }
        })
        setBusy(false)
    }


    return (
        <div className="min-h-[300px] flex justify-center items-center bg-white my-20">
            <form onSubmit={handleSubmit}>
            <div className="p-10 border-[1px] bg-gray-100 -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
                <div className="py-8">
                    <Image width={100} className="-mt-10" src={IMAGES.favicon} alt='' />
                </div>
                <input aria-disabled={busy} disabled={busy} required onChange={(e) => setLogon({
                    ...logon,
                    accid: e.target.value
                })} className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Account ID" type='text' />
                <div className="flex flex-col space-y-1">
                    <input aria-disabled={busy} disabled={busy} required onChange={(e) => setLogon({
                        ...logon,
                        password: e.target.value
                    })} className="p-3 border-[1px] border-slate-500 rounded-sm w-80" type='password' placeholder="Secure Password" />
                    <p className="font-bold text-[#0070ba]">Forgot password?</p>
                </div>
                <div className="flex flex-col space-y-5 w-full">
                    <button aria-disabled={busy} disabled={busy} className="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">Log in</button>
                    <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
                        <div className="-mt-1 font-bod px-5 absolute">Or</div>
                    </div>
                    <a href='#' className="w-full text-center border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200">Sign Up</a>
                </div>
            </div>
            </form>
        </div>
    )
}

export default LoginForm
