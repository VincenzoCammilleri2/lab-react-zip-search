import React, {useState} from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  const [zip,setZip] = useState("");
  return (
    <form action="" classname="form">
      <label htmlFor="zip">Try a Zip Code Here: </label>
      <input
        className="zip"
        value={zip}
        placeholder="xxxxx"
        type="text"
        name="zip"
        id="zip"
        onChange={(event)=> {
          const {value} = event.target;
          setZip(value.replace(/[^\d{5}]$/,"").substr(0,5)) //expression to allow only #s & substr will only allow 5 in the form
        }}
        />
    </form>
  
  )
}

// function App() {
//   const initialCondiitons = {city: "", state: ""}
//   const [city,setCity] = useState(initialCondiitons);
  
//   return (
//     <div className="App">
//       <div className="App-header">
//         <h1>Zip Code Search</h1>
//       </div>
//       <div className="mx-auto" style={{ maxWidth: 400 }}>
//         <ZipSearchField />
//         <div>
//           <City />
//           <City />
//         </div>
//       </div>
//     </div>
//   );
// }
function App() {
  const initialCondiitons = {city:"", state:""}
  const [city, setCity] = useState(initialCondiitons);
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState("");

  const fetchData = () => {
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + zipCode , {
      'mode' : 'cors',
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => setData(responseData))
    .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <h1>Zip Code Search</h1>
      
      <div style={{marginTop: 20}}>
      <label htmlFor="zip">Zip Code</label>
        <div>
          <input type="text" onChange={(e) => setZipCode(e.target.value)}></input>
        </div>
        
        <button onClick={() => fetchData(zipCode)}>Search</button>
        
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </div>
  );
}


export default App;
