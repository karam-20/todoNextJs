'use client'



import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Context } from '../../components/Clients'
import { redirect } from 'next/navigation'
import { toast } from 'react-hot-toast'


export default function Page() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {user,setUser} = useContext(Context)

    const registerHandler = async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch("/api/auth/register",{
                method:"POST",
                body:JSON.stringify({
                    name,email,password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json()
            if(!data.success) return toast.error(data.message)
                setUser(data.user)
                toast.success(data.message)
            
        } catch (error) {
            return toast.error(data.message)
            
        }
    }
    if(user._id) return redirect("/")
  return (
<div className="login">
        <section>
            <form onSubmit={registerHandler}>
                <input onChange={(e)=>setName(e.target.value)}  type='text' value={name} placeholder='Enter Name'/> 

                <input onChange={(e)=>setEmail(e.target.value)} type='email' value={email} placeholder='Enter Email'/>

                <input onChange={(e)=>setPassword(e.target.value)}  type='password' value={password} placeholder='Enter Password' />

                <button type="submit">Register</button>

                <p>
                    already a user ?
                </p>
                <Link href={"/login"}>Login Here</Link>
            </form>
        </section>
    </div>
  )
}
