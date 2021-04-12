
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal , ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import React, {useState, useEffect} from 'react';

function App() {
const baseUrl= "http://localhost:5000/api/Orders";
const urlDetail="http://localhost:5000/api/OrderDetails/";
const[data , setData]=useState([]);
const[dataDetail , setDataDetail]=useState([]);
const [modalDetalle , setModalDetalle]=useState(false);

const openModalDetail = (orderId)=>{

  setModalDetalle(!modalDetalle)

}


const orderGet = async ()=>{

  await axios.get(baseUrl)
  .then(response => {
    setData(response.data)
    console.log(response.data)
  }).catch(error =>{
    console.log(error);
  })
}
/////////////////////////////////////////////////

const orderGetDetail = async (orders)=>{

  await axios.get(urlDetail + orders)
  .then(response => {
    setDataDetail(response.data)
   
    openModalDetail()

  }).catch(error =>{
    console.log(error);
  })
}


useEffect(()=>{
  orderGet();
 
},[])

  return (
    <div className="App">
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
<td>{orders.providerName}</td>
<td>{orders.fecha}</td>
<td>
  <button className ="btn btn-primary"  onClick={()=>openModalDetail()} onClick={()=> orderGetDetail(orders.orderId)} >Ver Pedido</button> {" "}
</td>
</tr>
))}
</tbody>
  </table>

<Modal isOpen={modalDetalle}>
  <ModalHeader> Detalle del pedido </ModalHeader>
    <ModalBody>

    <table className="table table-bordered"> 
  <thead>
    <tr>
      <th>Fecha</th>
      <th>Producto</th>
      <th>Proveedor</th>
      <th>Acciones</th>
    </tr>
  </thead>
<tbody>
{dataDetail.map(orderDetail =>(
 <tr key={orderDetail.orderDetailId}> 
 <td>{orderDetail.fecha}</td>
 <td>{orderDetail.name}</td>
 <td>{orderDetail.providerName}</td>
 <td>
   <button className ="btn btn-primary">Editar</button> {" "}
</td>
</tr>
))}
</tbody>
  </table>

    </ModalBody>
<ModalFooter>
<button className="btn btn-primary" onClick ={()=> openModalDetail()}>Cancelar</button>
</ModalFooter>
</Modal>

</div>
  );
}

export default App;
