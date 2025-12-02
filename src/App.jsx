import { useState } from 'react';
import axios from "axios";

function App() {
  const [prompt,setPrompt] = useState("");
  const [answer,setAnswer] = useState("");
  const [loading,setLoading] = useState(false);
  const [prevQues,setPrevQues] = useState("");
  
  async function generateAnswer(){

    if(prompt.length == 0){
      return alert("Prompt cannot be empty");
    }else{
      console.log("loading....");
      setLoading(true);
      setPrevQues(prompt);
      setPrompt("");
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
    <div className='min-h-screen flex flex-col items-center bg-black'>
      <h1 className='text-3xl p-3 m-3 text-blue-500'>Chat with Ai</h1>
      <div className='flex flex-col border border-white shadow-xl w-[900px] p-[70px] m-3 rounded-lg'>
        {
          loading ? (
            <p className='text-xl text-white'>Loading... free-tier services can be a bit slow.</p>
          ) : (
            <div>
              {
                prevQues && (
                  <div className='flex flex-col border border-white rounded-xl p-6 m-3 mb-8'>
                    <p className='bg-slate-50 p-3 m-3 rounded-lg font-bold'>{"> "}{prevQues}</p>
                    <pre 
                      className='text-lg text-blue-300  whitespace-pre-wrap wrap-break-words overflow-auto max-h-[500px]'
                    >
                        {answer}
                    </pre>
                  </div>
                )
              }
            </div>
          )
        }
        <textarea 
          rows="10"
          cols="30"
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder='Enter your prompt'
          className='border p-3 m-3 text-white rounded-2xl text-xl'
        ></textarea>
        <button 
          onClick={generateAnswer}
          className='text-2xl border rounded-lg m-4 p-4 bg-white hover:bg-white/50 duration-300 cursor-pointer'
        >
          Generate Answer</button>
      </div>
    </div>
  )
}

export default App
