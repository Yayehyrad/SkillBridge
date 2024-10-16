import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import React from 'react'
import { formDefaultValue, formSchema, IFormSchma } from './formSchema'

const SigninForm = ({registerForm } : {registerForm ?: boolean}) => {
  const { register , formState : {errors , isLoading } , reset , handleSubmit } = useForm<IFormSchma>({
    mode : "onBlur",
    resolver : zodResolver(formSchema),
    defaultValues : formDefaultValue
    
  })
  const handleFormSubmit = (data : IFormSchma) => {
    if (registerForm){
     console.log(data);
     reset()}
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    <Input type='text' placeholder='User name' className=' h-14 mb-4 text-2xl text-white ' {...register("userName" )}/>
    {errors.userName && errorText(errors.userName?.message)}
    {registerForm &&  
     <Input type="text" placeholder='Email' className=' h-14 mb-4 text-2xl  text-white'  {...register('email')} />}
    {errors.email && errorText(errors.email?.message)}
    <Input type="password" placeholder='password' className=' h-14 mb-4 text-2xl  text-white'  {...register("password")} />
    {errors.password && errorText(errors.password?.message)}
    <div className=' flex flex-row  w-full   justify-start items-center'>
    <input type="checkbox" className=' appearance-none w-6 h-6 border-2 border-gray-100 rounded-lg checked:bg-gray-500 checked:border-transparent focus:outline-none cursor-pointer' />
    <label htmlFor="remember" className=' ml-2 text-xl italic font-semibold text-white'>Remember me</label>
    </div>
    <div className=' w-full flex justify-center items-center mt-4'>
        <Button type='submit'  size={'xl'} className=' text-2xl' > {registerForm ? "Register" :"LogIn"}</Button>
    </div>
</form>
  )
}

const errorText = ( text : string | undefined )=>{
  return <div className=' text-red-400 '>
    {text}
  </div>
}

export default SigninForm