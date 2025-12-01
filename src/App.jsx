import { useState } from 'react';
import axios from "axios";

function App() {
  const [prompt,setPrompt] = useState("");
  const [answer,setAnswer] = useState("");
  const [loading,setLoading] = useState(false);
  
  async function generateAnswer(){

    if(prompt.length == 0){
      return alert("Prompt cannot be empty");
    }else{
      console.log("loading....");
      setLoading(true);
      const response = await axios({
        url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${
            import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
          }`,
          method:"post",
          data:{
            contents:[
              // { parts: [{ text: "Write a short story of lose boy who becomes wanted by everyone " }] }
              { parts: [{ text: prompt }] }
            ],
          },
      });
      console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
      setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
      setLoading(false);
      }

  }
  return (
    <div className='min-h-screen flex flex-col items-center bg-slate-600'>
      <h1 className='text-3xl p-3 m-3 text-blue-500'>Chat with Ai</h1>
      <div className='flex flex-col border w-[900px] p-[70px] m-3 rounded-lg'>
        <textarea 
          rows="10"
          cols="30"
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          style={{ padding:"12px"}}
          placeholder='Enter your prompt'
          className='border rounded-2xl text-xl'
        ></textarea>
        <button 
          onClick={generateAnswer}
          className='text-2xl border rounded-lg m-4 p-4 hover:bg-slate-800/50 hover:shadow-2xl duration-300 cursor-pointer'
        >
          Generate Answer</button>
        {
          loading ? (
            <p>loading..</p>
          ) : (
            <p>{answer}</p>
          )
        }
      </div>
    </div>
  )
}

export default App
