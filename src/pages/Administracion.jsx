import { useEffect, useState } from "react";
import api from "../services/api";

function Administracion() {

    const [productos,setProductos]=useState(0);
    const [usuarios,setUsuarios]=useState(0);
    const [categorias,setCategorias]=useState(0);
    const [pedidos,setPedidos]=useState(0);
    const [stockBajo,setStockBajo]=useState(0);

    const cargarDatos = async()=>{

        try{

            const prod=await api.get("/productos");
            const usu=await api.get("/usuarios");
            const cat=await api.get("/categorias");
            const ped=await api.get("/pedidos");

            setProductos(prod.data.length);
            setUsuarios(usu.data.length);
            setCategorias(cat.data.length);
            setPedidos(ped.data.length);

            const bajos=prod.data.filter(p=>p.stock<=5);

            setStockBajo(bajos.length);

        }catch(e){

            console.log(e);

        }

    }

    useEffect(()=>{

        cargarDatos();

    },[])

    return(

        <section className="card">

            <h2>⚙ Administración del Sistema</h2>

            <div className="dashboard">

                <div className="dashboard-card">
                    <h2>📦 Productos</h2>
                    <h1>{productos}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>👤 Usuarios</h2>
                    <h1>{usuarios}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🏷 Categorías</h2>
                    <h1>{categorias}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🛒 Pedidos</h2>
                    <h1>{pedidos}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>⚠ Stock Bajo</h2>
                    <h1>{stockBajo}</h1>
                </div>

            </div>

            <br/>

            <button
                className="btn-dashboard"
                onClick={cargarDatos}
            >
                🔄 Actualizar Información
            </button>

        </section>

    )

}

export default Administracion;