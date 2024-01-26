import React from 'react';

const TableMeteoMulti = ({ data, onCellClick }) => {
  
  const datiDaMostrare = {time:"Giorno",temperature_max:"Temperatura massima", temperature_min:"Temperatura minima", temperature_mean:"Temperatura media", precipitation_probability:"Probabilità precipitazioni", precipitation:"Precipitazioni", relativehumidity_mean:"Umidità relativa media"};
  const udm = {time:"",temperature_max:"°C", temperature_min:"°C", temperature_mean:"°C", precipitation_probability:"%", precipitation:"mm", relativehumidity_mean:"%"};

  if (!data || !data.data_day || !data.data_day.time) {
    return <div>Dati non disponibili</div>;
  }

  return (
    <div class="container" style={{marginTop: "20px"}}>
      <table class="table table-bordered table-hover table-auto">
        <thead>
          <tr>
              {Object.keys(datiDaMostrare).map((value, index) => (
                  <th scope="col" class="text-center align-middle" key={index}>
                      {datiDaMostrare[value]}
                  </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.data_day.time.map((day, index1) => (
            <tr key={index1}>
              {Object.keys(datiDaMostrare).map((value, index2) => (
                  value === 'time' 
                  ? <td className="text-center align-middle w-auto cliccabile highlight" key={index2} onClick={()=>onCellClick(data.data_day[value][index1])}>
                      {data.data_day[value][index1]}</td>
                  : value === 'temperature_max' || value === 'temperature_min' || value === 'temperature_mean' 
                  ? <td className="text-center align-middle w-auto temperature" key={index2}>{parseFloat(data.data_day[value][index1]).toFixed(1) +" "+ udm[value]}</td>
                  : value === 'precipitation_probability'
                  ? <td className="text-center align-middle w-auto rain" key={index2}>{data.data_day[value][index1]+" "+udm[value]}</td>
                  : <td className="text-center align-middle w-auto" key={index2}>{data.data_day[value][index1]+" "+udm[value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMeteoMulti;