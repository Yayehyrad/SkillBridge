import { FaceIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { FcGoogle} from "react-icons/fc";
import * as React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import SigninForm from '@/forms/signinform';
import { BsGithub } from 'react-icons/bs';

interface ISignInProps {
}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
  return (
    <section>
        <div className='   h-screen flex px-20 py-1 bg-[url("https://images.unsplash.com/photo-1553941884-f8947df6e0ba?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg- bg-cover bg-center'>
        <div className="absolute inset-0 bg-black opacity-70" />
            <div className=' w-2/3   flex justify-center  flex-col  z-10'>
                <h1 className=' text-white text-9xl font-semibold'>
                    Welcome Back .!
                </h1>
                <div className=' items-center flex'>
                    <button className=' border-4 border-white text-white -skew-x-6 w-72 h-20 mt-5 italic font-bold text-3xl '>
                        Skip the lag ?
                    </button>
                    <div className=' flex items-center'>
                    {
                        Array.from({length : 25} , (_)=>{
                            return ( <div className=' text-gray-300/30 text-8xl'>-</div> )
                        })
                    }
                    </div>
                </div>
               
                
            </div>
            <div className=' w-1/3   rounded-2xl p-10 z-10'>
                <div className=' border-blue-400 border-2 w-full h-full flex flex-col justify-center p-14 bg-red backdrop-blur-sm bg-transparent rounded-2xl'>
                    <h1 className=' text-5xl font-bold text-white mb-3'>Login</h1>
                    <p className=' text-gray-400 text-2xl mb-2'>Glad your back. !</p>
                    <SigninForm />
                    <button>Login</button>
                    <p className=' mx-auto text-xl italic font-semibold text-white'>Forgot password?</p>
                    <div className="flex items-center my-4">
                         <hr className="flex-grow border-gray-300" />
                         <span className="mx-2 text-gray-100">or</span>
                         <hr className="flex-grow border-gray-300" />
                    </div>
                    <div className=' flex justify-center items-center gap-5 text-5xl mb-24 '>
                        <FaFacebook className=' text-blue-500'/>
                        <BsGithub className=' text-white'/>
                        <FcGoogle />
                    </div>
                    <div className=' justify-center flex text-white'>
                        <p>Don't have an account? <span className=' underline italic cursor-pointer'>Register</span></p>
                    </div>
                </div>
                
            </div>
            
        </div>
    </section>
  );
};

export default SignIn;
