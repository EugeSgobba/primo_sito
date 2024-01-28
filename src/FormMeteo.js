import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableMeteoMulti from './TableMeteoMulti';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TableMeteoGiorno3h from './TableMeteoGiorno3h';


const FormMeteo = () => {

    let comune=null;
    let lat=null;
    let lon=null;
    let day=null;

    // Stato per gestire la lista dei comuni
    const [comuni, setComuni] = useState([]);
    useEffect(() => {
      axios.get('https://primo-sito.vercel.app/api/comuni')
        .then(response => {
          setComuni(response.data);
        })
        .catch(error => {
          console.error('Errore durante il recupero dei comuni:', error);
        });
    }, []);
    
    // Stato per gestire la selezione dell'utente
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const [weatherData, setWeatherData] = useState(null);
    const handleSubmit = async (e) => {
      e.preventDefault();  
      try {
        comune=selectedOption;
        const posizione = await fetch(`https://www.meteoblue.com/en/server/search/query3?query=`+comune+`&apikey=zL0XDwpmGu4ygsvI`);
        const datiPosizione = await posizione.json();
        lat=datiPosizione.results[0].lat;
        lon=datiPosizione.results[0].lon;
        const meteo = await fetch(`https://my.meteoblue.com/packages/basic-day?apikey=zL0XDwpmGu4ygsvI&lat=`+lat+`&lon=`+lon+`&asl=136&format=json`);
        const datiMeteo = await meteo.json();
        setWeatherData(datiMeteo);
      } catch (error) {
        console.error('Errore nella prima chiamata API:', error);
      }
    };

    const [secondApiData, setSecondApiData] = useState(null);
    const handleCellClick = async (cell) => {
      try {
        //cell = data della previsione (stringa in formato yyyy-mm-dd), comune = il comune per cui vogliamo il meteo
        const meteo = await fetch(`https://my.meteoblue.com/packages/basic-3h?apikey=zL0XDwpmGu4ygsvI&lat=`+lat+`&lon=`+lon+`&asl=136&format=json`);
        const datiMeteo = await meteo.json();
        const meteo1h = await fetch(`https://my.meteoblue.com/packages/basic-1h?apikey=zL0XDwpmGu4ygsvI&lat=`+lat+`&lon=`+lon+`&asl=136&format=json`);
        const datiMeteo1h = await meteo1h.json();
        //a datiMeteo occorre aggiungere l'informazione sul giorno per cui è richiesto il meteo
        day=cell.slice(8,10);
        datiMeteo.day=day;
        datiMeteo.data_1h=datiMeteo1h.data_1h;
        // Aggiorna lo stato con i dati ottenuti
        setSecondApiData(datiMeteo);
      } catch (error) {
        console.error('Errore nella seconda chiamata API:', error);
        // Gestisci l'errore in modo appropriato qui
      }
    };

    const [selectedApiType, setSelectedApiType] = useState('data_3h');
    const [button3hDisabled, setButton3hDisabled] = useState(false);
    const [button1hDisabled, setButton1hDisabled] = useState(false);

    const handleButton3hClick = () => {
      setButton3hDisabled(true);
      setButton1hDisabled(false);
      setSelectedApiType('data_3h');
    };

    const handleButton1hClick = () => {
      setButton1hDisabled(true);
      setButton3hDisabled(false);
      setSelectedApiType('data_1h');
    };
    
    return (
      <div>  
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="container">
			      <div className="text-center" style={{marginTop: '20px'}}>
              <label htmlFor="dropdown" style={{color:'white'}}>Seleziona un'opzione:</label>
              <select id="dropdown" value={selectedOption} onChange={handleSelectChange} className="js-example-basic-single">
                <option value="" disabled hidden>
                  Seleziona un comune...
                </option>
                <option>
                  Asti
                </option>
                {/* Mappa gli elementi dell'array per generare le opzioni del menu a tendina */}
                {comuni.map((option, index) => (
                  <option key={index} value={option.nome}>
                    {option.nome}
                  </option>
                ))}
              </select>
              <button type="submit">VAI</button>
            </div>
          </div>
        </form>
        {/* Visualizza la selezione dell'utente */}
        {selectedOption && (
          <div className="text-center" style={{marginTop: '20px'}}>
            <p style={{color:'white'}}>
              Hai selezionato: {selectedOption}
            </p>
          </div>
        )}
        {/* Visualizza meteo multi giorni */}
        {weatherData && (
          <div className="text-center" style={{marginTop: '20px'}}>
            <TableMeteoMulti data={weatherData} onCellClick={handleCellClick} />
          </div>
        )}
        {/* Visualizza meteo giornaliero 3h/1h */}
        {secondApiData && (
          <div>
            <div id="pulsantiMeteoGiorno" class="container" style={{marginTop: "20px"}}>
              <button id="button3h" onClick={() => handleButton3hClick()} disabled={button3hDisabled}>3h</button>   
        		  <button id="button1h" onClick={() => handleButton1hClick()} disabled={button1hDisabled}>1h</button>  
            </div>
            <TableMeteoGiorno3h data={secondApiData} selectedApiType={selectedApiType}/>
          </div>
        )}
      </div>
    );
  };
  
  export default FormMeteo;
  