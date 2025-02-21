import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("{\"data\": [\"A\",\"C\",\"z\"]}");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Expected { \"data\": [values] }");
      }
      
      const res = await axios.post("https://your-api.vercel.app/bfhl", parsedInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Enter JSON Input</h2>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <>
          <h3>Select Response Data:</h3>
          <select multiple onChange={(e) =>
            setSelectedOptions([...e.target.options].filter(option => option.selected).map(option => option.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(selectedOptions.reduce((acc, key) => ({ ...acc, [key]: response[key] }), {}), null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
