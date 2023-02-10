import { useContext } from "react";
import { Context } from '../../store/appContext';

export default function RevisarAccion() {
    const { store, actions } = useContext(Context);
    const handlerVerActivos = (e) => {
        let dato = e.target.value
        if (/^AC\d{8}$/.test(dato)) {
            actions.getEquipos(dato);
        }else
            actions.limpiarEquipos();
    }
    return (
        <div className="col-12 text-center">
            <h3 className="mb-4">Revision de Activos por Acción</h3>
            <div className="row justify-content-center">
                <div className="col-4 ">
                    <select className="form-select " onChange={handlerVerActivos}>
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
                        <input type="text" className="form-control" placeholder="Buscar Activo" aria-label="Buscar Activo" aria-describedby="button-addon2" />
                        <button className="btn btn btn-primary" type="button" id="button-addon2"></button>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-3">
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
                                    <tr key={"linea" + index}>
                                        <td key={"placa" + index}>{item.Placa}</td>
                                        <td key={"serie" + index}>{item.Serie}</td>
                                        <td key={"descripcion" + index}>{item.Descripcion}</td>
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
