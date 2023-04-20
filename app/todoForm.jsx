'use client'


import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import {redirect, useRouter} from "next/navigation"
import { Context } from '../components/Clients'

export default function todoForm() {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const {user} = useContext(Context)

    const router = useRouter()

    const formHandler = async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch("/api/newtask",{
                method:"POST",
                body:JSON.stringify({
                    title,description
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json()
            if(!data.success) return toast.error(data.message)
            toast.success(data.message)
            router.refresh()
            setTitle("")
            setDescription("")
            
        } catch (error) {
            return toast.error(data.message)
            
        }
    }

    if(!user._id) return redirect("/login")
  return (
    <div className="login">
        <section>
            <form onSubmit={formHandler}>
                <input onChange={(e)=>setTitle(e.target.value)} type='text' value={title} placeholder='Task Title'/>
                <input onChange={(e)=>setDescription(e.target.value)}  type='text' value={description} placeholder='Task Description' />

                <button type="submit">Add Task</button>

            </form>
        </section>
    </div>
  )
}
