import { useContext, useEffect, useState, useRef } from "react";
import { Context } from '../../store/appContext';
import audioAprovado from "../../assets/sonidoMoneda.mp3";
import audioCancelado from "../../assets/sonidoCancelado.mp3";

export default function RevisarAccion({ setfuncionalidad }) {
    const { store, actions } = useContext(Context);
    const [valorInput, setValorInput] = useState("");
    const [disableOpciones, setDisableOpciones] = useState(true);
    const [numAccion, setNumAccion] = useState("")
    const [recargar, setrecaragar] = useState(false)
    const audioAp = useRef(new Audio(audioAprovado));
    const audioCa = useRef(new Audio(audioCancelado));
    const elementoBuscado = useRef(null);


    const inputBuscar = (event) => {
        setValorInput(event.target.value.toUpperCase());
    };

    const handlerVerActivos = (e) => {
        let dato = e.target.value
        if (/^AC\d{8}$/.test(dato)) {
            setDisableOpciones(false);
            setNumAccion(dato)
            actions.getEquipos(dato);
        } else {
            setDisableOpciones(true);
        }
        actions.limpiarEquipos();
    }

    const handlerBuscar = (numerosEquipo) => {
        audioAp.current.currentTime = -1;
        audioCa.current.currentTime = -1;
        let buscarPlaca = store.equipos.findIndex(equipo => equipo.Placa === numerosEquipo.toUpperCase())
        let buscarSerie = store.equipos.findIndex(equipo => equipo.Serie === numerosEquipo.toUpperCase())
        if (buscarPlaca !== -1) {
            audioAp.current.play();
            actions.revisarEquipos(buscarPlaca);
            elementoBuscado.current.scrollIntoView({ behavior: "smooth" });
        } else if (buscarSerie !== -1) {
            audioAp.current.play();
            actions.revisarEquipos(buscarSerie);
            elementoBuscado.current.scrollIntoView({ behavior: "smooth" });
        } else {
            audioCa.current.play();
        }
        setValorInput("")
    }

    useEffect(() => {
        actions.limpiarEquipos();
        actions.getAcciones();
    }, [recargar])

    return (
        <div className="col-10 text-center  p-0">
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
                        <input type="text" className="form-control" placeholder="Buscar Activo" aria-label="Buscar Activo" aria-describedby="button-addon2" value={valorInput} onChange={inputBuscar} onKeyDown={tecla => { if (tecla.key === "Enter") { handlerBuscar(valorInput) } }} disabled={disableOpciones} />
                        <button className="btn btn btn-primary" type="button" id="button-addon2" onClick={() => handlerBuscar(valorInput)} disabled={disableOpciones}>Buscar</button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-md-center mt-3 text-start fs-6 fw-bold">
                <div className="col-3">Placa</div>
                <div className="col-3">Serie</div>
                <div className="col-3">Descripción</div>
            </div>
            <div className="col-10 mx-auto" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <table className="table">
                    <tbody >
                        {store.equipos[0] === undefined ?
                            <tr>
                                <td></td>
                                <td ></td>
                                <td ></td>
                            </tr> :
                            store.equipos.map((item, index) => {
                                return (
                                    <tr key={`linea${index}`} ref={item.Placa === valorInput || item.Serie === valorInput ? elementoBuscado : null} className={item.IdEstadoEquipo === 2 ? "encontrado" : ""}>
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
            <hr />
            <div className="col-4  fw-bold" style={{ display: !disableOpciones ? 'block' : 'none' }}>La cantidad total de equipos es: <span className="fs-3">{store.equipos.length}</span></div>
            <button type="button" className="btn btn-success" disabled={disableOpciones} onClick={() => {
                const result = window.confirm('Al Aceptar confirma que todos los equipos en la presente acción se reciben físicamente y coinciden en cantidad con los datos mostrados en la boleta');
                if (result) {
                    actions.cambioEstadoAccion(2, numAccion);
                    setDisableOpciones(true);
                    setTimeout(() => {
                        setrecaragar(!recargar);
                    }, 1500);
                    
                }
            }}>Accion revisada</button>
        </div>
    )
}
