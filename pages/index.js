import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useCallback, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [password, setPassword] = useState("");

  const [isSubmitted,setIsSubmitted]  = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const res = await fetch(`/api/hello?password=${password}`, {
        method: "POST",
      });
      const json = await res.json();
      setIsSubmitted(true);
  
      console.log({json})
    }
    catch{
      console.log("error")
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {
          !isSubmitted
          ?
        <form onSubmit={onSubmit} className='form'>
          <input type={"text"} name={"password"} onChange={onChange} className='mb-10 border border-black' disabled={isLoading} autoComplete="off"/>
          <button type="submit" className='bg-primary-100' disabled={isLoading}>{isLoading ? "Submitting..." : "Submit"}</button>
        </form>
        :
        <div className='flex flex-col items-center justify-center'>
          Success, please check after 20 to 25 minutes!
        </div>
        }
      </div>

    </main>
  )
}
