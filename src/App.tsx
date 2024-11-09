import { useState } from 'react'
import './App.css'
import MapComponent from './components/Map.tsx'

function App() {
  const [inputYear,setInputYear] = useState(0)
  const [year,setYear] = useState(2023)
  return (
    <>
      <h1>MontevideoDanger</h1>
      <p><a href='https://catalogodatos.gub.uy/dataset/ministerio-del-interior-delitos_denunciados_en_el_uruguay' target='_blank'>Source</a></p>
      <MapComponent year={year}/>
      <input 
      placeholder='2023'
      type="number"
      onChange={(e)=>{
        setInputYear(parseInt(e.target.value, 10))
      }} />
      <button onClick={()=>{
        if(inputYear >= 2013 && inputYear <= 2023) {
          setYear(inputYear)
        }
        else {
          alert('Only years betwin 2013 and 2023')
          setYear(2023)
        }
      }} >Search</button>
      <p>(Data between 2013 and 2023)</p>
    </>
  )
}

export default App
