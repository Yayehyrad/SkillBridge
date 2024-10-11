import * as React from 'react';

interface ISignInProps {
}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
  return (
    <section>
        <div className='   h-screen flex px-20 py-2'>
            <div className=' w-2/3 bg-black flex justify-center  flex-col'>
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
            <div className=' w-1/3 bg-slate-500 rounded-2xl'>

            </div>
            
        </div>
    </section>
  );
};

export default SignIn;
