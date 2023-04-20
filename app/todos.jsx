import React from 'react'
import { TodoItem } from '../components/ServerComponents'
import { cookies } from 'next/headers';

const fetchTodo = async(token)=>{
    try {
      const res = await fetch(`${process.env.URL}/api/mytask`,
      {
        cache:"no-cache",
        headers:{
          cookie:`token=${token}`
        }
      })
      const data = await res.json();
    
      if(!data.success) return []
      return data.todos;
    } catch (error) {
      return []
    }
  }

export default async function todos() {
    const token = cookies().get("token")?.value;
  
    const tasks = await fetchTodo(token)
    
  return (
    <section className="todosContainer">
      {tasks?.map((i)=>(
        <TodoItem key={i._id} id={i._id} title={i.title} completed={i.isCompleted} description={i.description}/>
      ))}
      </section>
  )
}
