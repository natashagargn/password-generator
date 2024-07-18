import { useState, useCallback, useEffect,useRef} from 'react'

function App() {
  const [length, setLength] = useState(7)
  const [noAllowed, setNoAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied ] = useState(false);
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (noAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-+=[{]}`~?"

    for (let i = 1; i <= length; i++) {
      let no = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(no)
    }
    setPassword(pass)
  },
    [length, noAllowed, charAllowed]
  )

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,61)
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false),3000)
  },[password])
  useEffect(() => {
    passwordGenerator()
  },[length,noAllowed,charAllowed,passwordGenerator])
  return (
    <>

      <h1 className=" text-4xl py-3 px-2 inset-x-0 flex flex-wrap justify-center my-8 rounded-full text-blue-600 font-semibold underline " style={{ }}>Password Generator</h1>
      <div className="w-full md:max-w-lg max-w-md mx-auto shadow-md rounded-lg px-8 py-3 text-orange-500 bg-gray-700 text-center">
        <div className="text-white text-center py-2 "> Create strong passwords to keep your account safe online.</div>
        <div className="flex w-full max-w-lg mx-auto shadow rounded-lg my-4 overflow-hidden">
          <input type="text" value={password} className="outline-none w-full py-1 px-3 rounded-l" placeholder="Password" read-only  ref = {passwordRef} />
          <button className={`outline-none  text-white px-3 py-0.5 shrink-0 ${copied ? 'bg-green-700' : 'bg-blue-700' }`}onClick={copyPasswordToClipBoard}>
            {copied ? 'Copied' : 'Copy'}
            </button>

        </div>
        <div className="flex text-sm gap-x-2 mt-6 mb-4">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={7}
              max={60}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value)
               
              }} />
            <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1 ml-5">
            <input type="checkbox" defaultChecked={noAllowed} id="noInput" onChange={() => {
              setNoAllowed((prev) => !prev);
            }} />
            <label >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ml-5">
            <input type="checkbox" defaultChecked={charAllowed} id="noInput" onChange={() => {
              setCharAllowed((prev) => !prev);
            }} />
            <label >Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
