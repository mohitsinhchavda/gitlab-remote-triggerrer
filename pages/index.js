import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useCallback, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

function isToday(date) {
  date = new Date(date)
  const today = new Date();

  // 👇️ Today's date
  console.log(today);

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
}

export default function Home() {

  const [password, setPassword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  console.log({ isError })

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`/api/hello?password=${password}`, {
        method: "POST",
      });
      console.log(res.status !== 200, res.status, `cheque kar`)
      if (res.status !== 200) {
        console.log(`something new`)
        throw new Error("Wrong password");
      }

    }
    catch {
      console.log("error");
      setIsError(true);
    }
    finally {
      setIsSubmitted(true);
      setIsLoading(false);
      checkLastestPipelineStatus();
    }
  }

  const [latestPipelineStatus, setLatestPipelineStatus] = useState({});

  async function checkLastestPipelineStatus() {
    setLatestPipelineStatus({});
    const res = await fetch(`/api/latestpipeline`, {
      method: "GET",
    });
    const json = await res.json();
    if(json.response?.status === "pending" || json.response?.status === "created") {
      checkLastestPipelineStatus();
    }
    else{
      setLatestPipelineStatus(json.response);
    }
  }

  useEffect(() => {
    checkLastestPipelineStatus();
  }, []);

  console.log({ latestPipelineStatus })

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between relative p-24 ${inter.className}`}
    >
      <div className="z-10 flex flex-col max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {
          !isSubmitted
            ?
            <form onSubmit={onSubmit} className='form m-auto'>
              <input type={"text"} name={"password"} onChange={onChange} className='mb-10 border border-black input' placeholder='Please type password' disabled={isLoading} autoComplete="off" />
              <button type="submit" className='bg-blue-100 rounded-xl p-2' onClick={onSubmit} disabled={isLoading}>{isLoading ? "Submitting..." : "Submit"}</button>
            </form>
            :
            <h1 className='flex flex-col items-center justify-center bg form m-auto bg-blue-100 text-2xl mb-10'>
              {
                !isError
                  ?
                  "Success, please check after 20 to 25 minutes!"
                  :
                  "Wrong password, please try again!"
              }
            </h1>
        }
        {
          isSubmitted && isError
            ?
            <button className='bg-blue-100 rounded-xl p-2' onClick={() => { setIsSubmitted(false); setIsError(false) }}>
              Try Again!
            </button>
            :
            null
        }
        {
          latestPipelineStatus?.status
          ?
          <div className='mt-10'>
            <h1 className='text-2xl mb-10'>Latest Pipeline Status (which was triggred by {latestPipelineStatus?.source === "trigger" ? "You" : "Someone else"})</h1>
            <div className='flex flex-col items-center bg form m-auto bg-blue-100 text-2xl mb-3'>
              {
                latestPipelineStatus?.status === "success"
                  ?
                  <h1 className='text-2xl mb-10'>You had last successfull deployment at {new Date(latestPipelineStatus?.updated_at).toLocaleTimeString()} {isToday(latestPipelineStatus?.updated_at) ? "Today" : `at ${new Date(latestPipelineStatus?.updated_at).toLocaleDateString()}`}</h1>
                  :
                  null
              }
              {
                latestPipelineStatus?.status === "running"
                  ?
                  <h1 className='text-2xl mb-10'>Your pipeline is running and was triggered at {new Date(latestPipelineStatus?.started_at).toLocaleTimeString()} {isToday(latestPipelineStatus?.started_at) ? "Today" : `at ${new Date(latestPipelineStatus?.started_at).toLocaleDateString()}`}</h1>
                  :
                  null
              }
              {
                latestPipelineStatus?.status === "canceled"
                  ?
                  <h1 className='text-2xl mb-10'>Your last pipeline was cancelled at {new Date(latestPipelineStatus?.updated_at).toLocaleTimeString()} {isToday(latestPipelineStatus?.updated_at) ? "Today" : `at ${new Date(latestPipelineStatus?.updated_at).toLocaleDateString()}`}</h1>
                  :
                  null
              }
            </div>
            {
              latestPipelineStatus?.status !== "running"
                ?
                <div>
                  (This pipeline started running at {new Date(latestPipelineStatus?.started_at).toLocaleTimeString()} {isToday(latestPipelineStatus?.started_at) ? "Today" : `at ${new Date(latestPipelineStatus?.started_at).toLocaleDateString()}`})
                </div>
                :
                null
            }
          </div>
          :
          <h1 className='text-2xl font-bold mt-5'>
          Fetching latest pipeline status...
          </h1>
        }

      </div>

    </main>
  )
}
