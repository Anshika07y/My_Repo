import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [number, setNumber] = useState(false);
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copiedPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-black">
      <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-5 my-10 text-gray-300 bg-gray-800">
        <h1 className="text-cyan-400 text-center text-3xl font-bold my-4">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-700">
          <input
            type="text"
            placeholder="Password"
            value={Password}
            readOnly
            ref={passwordRef}
            className="outline-none w-full py-2 px-4 bg-gray-700 text-white rounded-l-lg"
          />
          <button
            className="outline-none bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 transition-all rounded-r-lg"
            onClick={copiedPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={7}
              max={99}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer accent-cyan-400"
            />
            <label className="text-gray-300 font-medium">
              Length: {length}
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber((prev) => !prev)}
              className="accent-cyan-400 cursor-pointer"
            />
            <label className="text-gray-300 font-medium">Include Numbers</label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={character}
              onChange={() => setCharacter((prev) => !prev)}
              className="accent-cyan-400 cursor-pointer"
            />
            <label className="text-gray-300 font-medium">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
