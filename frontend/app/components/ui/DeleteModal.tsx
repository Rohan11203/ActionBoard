"use client"
import { DeleteTask } from '@/app/lib/api/page'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteModal = ({taskId,onClose}:any) => {

    const router =  useRouter()

    function handleClick (){
        DeleteTask(taskId)
        onClose();
        router.push("/dash")
    }
    
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to delete this task?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteModal
