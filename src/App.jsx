import { useState } from 'react';
import './App.css';
import nasa_logo from './image/nasa.png'

function App() {

  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  
  const handlerInput = (e) => {
    setValue(e.target.value);
  }

  const setDefault = () => {
    setData("");
    setValue("");
  }
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    if(value === "") {
      window.alert('Please, Pick a date')
    } else {
      obtenerDatos(value);
    }
  }
  
  const obtenerDatos = (fecha) => {
    const api_key = 'BFG2h8QX4377EO1uk6aTdOxHxR831bXG5nGIKCi4';
    const ruta = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${fecha}`
    fetch(ruta) 
        .then(response => response.json())
        .then(data => setData(data));
  }

  const { title, explanation, url } = data;

  return (
    <>
      <div className="container">
        <div className="pt-5 text-center d-flex justify-content-center align-items-center fw-bold fs-1">
          <h1 className='h1'>Picture Of the Day</h1>
        </div>

        <div className="d-flex justify-content-center align-items-center pt-5">
            <form className="row g-3 d-flex flex-wrap justify-content-center">
                <div className="col-auto">
                    <input type="date" className="form-control" id="date" value={value} onChange={(e) => handlerInput(e)} />
                </div>
                <div className="col-auto">
                    <button onClick={(e) => handlerSubmit(e)} type="button" className="btn btn-primary mb-3" name="button">Get Picture Of The Day</button>
                </div>
                <div className="col-auto">
                    <button onClick={(e) => setDefault(e)} type="button" className="btn btn-primary mb-3" name="button">Home</button>
                </div>
            </form>
        </div>
        
        {
          data ?
            <>
              <h1 id="titulo" className="text-center pt-5 h1">{title}</h1>
              <p id="descripcion" className="lead pt-5 h1">{explanation}</p>
              <div id="c_multimedia" className="text-center py-5 h1">
                <img src={url} className="img-fluid imagen" alt={url} />
              </div>
            </>
          :
            <div className='container w-50 pt-5'>
              <img src={nasa_logo} className="img-fluid" alt={nasa_logo} />
            </div>
        }
      </div>
    </>
  )
}

export default App;
