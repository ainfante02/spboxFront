
import React, {useState, useEffect} from 'react';
import axios from 'axios';




const Table = ()=> {

    const [modalDetalle , setModalDetalle]=useState(false);
    const[data , setData]=useState([]);
    const baseUrl= "http://localhost:5000/api/Orders";
    
    const orderGet = async ()=>{
    
        await axios.get(baseUrl)
        .then(response => {
          setData(response.data)
          console.log(response.data ,' soy la data de table')
        }).catch(error =>{
          console.log(error);
        })
 }

 useEffect(() => {
    orderGet();
  }, [])

    return (
    <table className="table table-bordered"> 
  <thead>
    <tr>
    <th>numero de orden</th>
      <th>Proveedor</th>
      <th>Fecha del pedido</th>
      <th>Acciones</th>
    </tr>
  </thead>
<tbody>
{data.map(orders =>(
<tr key={orders.orderId}> 
<td>{orders.orderId}</td>
<td>{orders.providerId}</td>
<td>{orders.fecha}</td>
<td>
  <button className ="btn btn-primary" >Ver Pedido</button> {" "}
 {/*  <button className ="btn btn-danger">Eliminar</button>  */}
</td>
</tr>
))}
</tbody>
  </table>


    );
}

export default Table;