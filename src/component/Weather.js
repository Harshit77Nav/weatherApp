import React, { useEffect, useRef, useState } from 'react'
import "./weather.css";

const arr = [];
function Weather() {
    const [data, setData] = useState();
    const [text, setText] = useState();
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState();
    const inputelem = useRef();
    const [city, setCity] = useState();
    const [hshow, setHshow] = useState(false);
    const [alert, setAlert] = useState(false);

    const getData = async ()=>{
        console.log(inputelem);
        if(text !== undefined){
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=1715b73b3af0ae7e5a720f3d75d33a17`,{
            method:"GET"
        })
        .then((res)=>res.json())
        .then((resdata)=>{
            if(resdata.cod == 200){
            setData(resdata)
            setCity(text);
            inputelem.current.value = ""
            setShow(true);
            setAlert(false);
        } else {
            setShow(false)
            setAlert(true);
        }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    }

    useEffect(()=>{
        if(city !== undefined){
        if(arr.length>2){
            arr.pop();
            arr.unshift(city);
            setHshow(true);
        } else {
            arr.push(city);
            setHistory(arr);
            console.log(history);
            setHshow(true);
        }
    }
    },[city])

  return (
    <div className='container'>
        <h1>Weather App</h1>
        <input ref={inputelem} className='input' type={"text"} required placeholder="Enter City Name.." onChange={(e)=>{setText(e.target.value);}}/>
        <button className='btn' onClick={getData}>Search</button>
        {show &&
        <div>
            <p><b>Weather Details of the City:</b> {city}</p>
            <p><b>Current Temperature :</b> {data.main.temp}</p>
            <p><b>Temperature Range :</b> {data.main.temp_min} to {data.main.temp_max}</p>
            <p><b>Humidity:</b> {data.main.humidity}%</p>
            <p><b>Sea Level or Longitude:</b> {data.main.sea_level}</p>
            <p><b>Ground Level or Latitude: </b>{data.main.grnd_level}</p>
        </div>}
        {alert && <h2>Enter a valid name</h2> }
        <ul className='ul'>
        {hshow && <h3>Last three entries</h3>}
        {hshow && history.map((item,index)=>{
            return(
                <div key={index}>
                <li key={index}>{item}</li>
                </div>
            )
        })}
        </ul>
    </div>
  )
}

export default Weather