import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { formDefaultValue, formSchema, IFormSchma } from './formSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginBackEnd, registerBackEnd } from '@/clientApi'
import { useNavigate } from 'react-router-dom'



const SigninForm = ({registerForm } : {registerForm ?: boolean}) => {
  const { register , formState : {errors , isLoading } , reset , handleSubmit } = useForm<IFormSchma>({
    mode : "onBlur",
    resolver : zodResolver(formSchema),
    defaultValues : formDefaultValue
  })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
 
  const { mutateAsync : mutateAsyncRegister } = useMutation({
    mutationFn : registerBackEnd ,
    onSuccess: async (data) => {
      console.log(data)
      // toast.success("Registration success!");
      // await queryClient.invalidateQueries("validateToken");
      // navigate("/");
    },
    onError: (e: Error) => {
      console.log("hiree" , e , e.message)
      // toast.error(e.message);
    },
    
  } )
  const { mutateAsync : mutateAsyncLogin } = useMutation({
    mutationFn :  loginBackEnd ,
    onSuccess: async (data) => {
        console.log(data)
        sessionStorage.setItem('accessToken' , data.data.accessToken)
        navigate("/");
        await queryClient.invalidateQueries({queryKey : ["validationToken"]});
      // toast.success("Registration success!");
      // await queryClient.invalidateQueries("validateToken");
      // navigate("/");
    },
    onError: (e: Error) => {
      console.log("hiree" , e , e.message)
      // toast.error(e.message);
    },
    
  } )


  const handleFormSubmit = async (data : IFormSchma) => {
    if (registerForm){
    await mutateAsyncRegister({
      userName : data.userName,
      userEmail : data.userEmail,
      password : data.password,
      role : "admin"
     })
    }else {
      await mutateAsyncLogin({
        userEmail : data.userEmail,
        password : data.password
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    {registerForm &&
    <Input type='text' placeholder='User name' className=' h-14 mb-4 text-2xl text-white ' {...register("userName" )}/>}
    {registerForm && errors.userName && errorText(errors.userName?.message)}
      
     <Input type="text" placeholder='Email' className=' h-14 mb-4 text-2xl  text-white'  {...register('userEmail')} />
    {errors.userEmail && errorText(errors.userEmail?.message)}
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