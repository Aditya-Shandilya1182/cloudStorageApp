import React from 'react'

function AuthForm() {
  return (
    <div className='bg-red-50 h-screen flex items-center'>
        
        <form className='w-64 mx-auto mb-12 '>
            <input type="text" placeholder="username" className='lock w-full rounded-sm p-2 mb-2 border'/>
            <input type="text" placeholder="password" className='lock w-full rounded-sm p-2 mb-2 border'/>
            <button className="bg-red-300 text-white block w-full rounded-sm p-2">Login</button>
        </form>
        
    </div>
  )
}

export default AuthForm