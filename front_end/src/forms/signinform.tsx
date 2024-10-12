import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const SigninForm = () => {
  return (
    <form>
    <Input type='text' placeholder='User name' className=' h-14 mb-4 text-2xl text-white '/>
    <Input type="password" placeholder='password' className=' h-14 mb-4 text-2xl  text-white'  />
    <div className=' flex flex-row  w-full   justify-start items-center'>
    <input type="checkbox" className=' appearance-none w-6 h-6 border-2 border-gray-100 rounded-lg checked:bg-gray-500 checked:border-transparent focus:outline-none cursor-pointer' />
    <label htmlFor="remember" className=' ml-2 text-xl italic font-semibold text-white'>Remember me</label>
    </div>
    <div className=' w-full flex justify-center items-center mt-4'>
        <Button type='submit'  size={'xl'} className=' text-2xl' >LogIn</Button>
    </div>
</form>
  )
}

export default SigninForm