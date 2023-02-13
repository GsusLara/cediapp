import { useContext, useEffect, useState } from "react";
import { Context } from '../../store/appContext';

export default function RevisarAccion({ setfuncionalidad }) {
    const { store, actions } = useContext(Context);
    const [valorInput, setValorInput] = useState("");

    const inputBuscar = (event) => {
        setValorInput(event.target.value);
    };

    const handlerVerActivos = (e) => {
        let dato = e.target.value
        if (/^AC\d{8}$/.test(dato)) {
            actions.getEquipos(dato);
        } else
            actions.limpiarEquipos();
    }

    const handlerBuscar = (numerosEquipo) => {
        let buscarPlaca = store.equipos.findIndex(equipo => equipo.Placa === numerosEquipo.toUpperCase())
        let buscarSerie = store.equipos.findIndex(equipo => equipo.Serie === numerosEquipo.toUpperCase())
        if (buscarPlaca !=-1){
            actions.revisarEquipos(buscarPlaca);
        }else if (buscarSerie !=-1){
            actions.revisarEquipos(buscarSerie);//emitir sonidos acá
        }
    }

    useEffect(() => {
        actions.limpiarEquipos();
    }, [])

    return (
        <div className="col-10 text-center m-0 p-0">
            <h4 className="mb-4">Revision de Activos por Acción</h4>
            <div className="row justify-content-center">
                <div className="col-1"><button type="button" className="btn btn-danger" onClick={() => setfuncionalidad(null)}>Salir</button></div>
                <div className="col-5">
                    <select className="form-select" onChange={handlerVerActivos}>
                        <option>Seleccione una Accion a revisar</option>
                        {store.acciones[0] === undefined ?
                            <option>No hay pendientes de revisión</option> :
                            store.acciones.map((item, index) => {
                                if (item.IdEstadoAccion === 1) {
                                    return (
                                        <option key={index} value={item.IdAccion}> {item.IdAccion}</option>
                                    )
                                }
                            })}
                    </select>
                </div>
                <div className="col-4">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Buscar Activo" aria-label="Buscar Activo" aria-describedby="button-addon2" value={valorInput} onChange={inputBuscar} />
                        <button className="btn btn btn-primary" type="button" id="button-addon2" onClick={() => handlerBuscar(valorInput)}>Buscar</button>
                    </div>
                </div>
            </div>
            <div className="col-10 mt-3 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Placa</th>
                            <th scope="col">Serie</th>
                            <th scope="col">Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.equipos[0] === undefined ?
                            <tr>
                                <td></td>
                                <td ></td>
                                <td ></td>
                            </tr> :
                            store.equipos.map((item, index) => {
                                return (
                                    <tr key={`linea${index}`} className={item.IdEstadoEquipo === 2  ? "encontrado" : ""}>
                                        <td key={`placa${index}`}>{item.Placa}</td>
                                        <td key={`serie${index}`}>{item.Serie}</td>
                                        <td key={`descripcion${index}`}>{item.Descripcion}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
