import Navbar from '@/ui/Navbar'
import ToDoList from '@/ui/ToDoList'
import React from 'react'

const page = () => {
  return (
    <div className="bg-base-100 shadow-sm text-mexican-red-700">
        <ToDoList/>
    </div>
  )
}

export default page