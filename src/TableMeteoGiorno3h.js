import React from 'react';

const TableMeteoGiorno3h = ({data, selectedApiType }) => {
  
  const datiDaMostrare = {time:"Orario",precipitation:"Precipitazioni",precipitation_probability:"Probabilità precipitazioni",temperature:"Temperatura",windspeed:"Velocità vento",relativehumidity:"Umidità relativa"};
  const udm = {time:"",precipitation:"mm",precipitation_probability:"%",temperature:"°C",windspeed:"m/s",relativehumidity:"%"};	    
  
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
          {data[selectedApiType].time.map((day, index1) => (
            <tr key={index1}>
              {Object.keys(datiDaMostrare).map((value, index2) => (
                  data.day==data[selectedApiType].time[index1].slice(8,10) ? (
                    value === 'time' 
                    ? <td className="text-center align-middle w-auto" key={index2}>{data[selectedApiType][value][index1]}</td>
                    : value === 'temperature'
                    ? <td className="text-center align-middle w-auto temperature" key={index2}>{parseFloat(data[selectedApiType][value][index1]).toFixed(1) + udm[value]}</td>
                    : value === 'precipitation_probability'
                    ? <td className="text-center align-middle w-auto rain" key={index2}>{data[selectedApiType][value][index1]+udm[value]}</td>
                    : value === 'windspeed'
                    ? <td className="text-center align-middle w-auto wind" key={index2}>{parseFloat(data[selectedApiType][value][index1]).toFixed(1)+udm[value]}</td>
                    : <td className="text-center align-middle w-auto" key={index2}>{data[selectedApiType][value][index1]+udm[value]}</td>
                  ):null
              ))}
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
};

export default TableMeteoGiorno3h;