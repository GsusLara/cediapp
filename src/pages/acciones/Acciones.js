import { useEffect, useContext, useState } from "react";
import { Context } from '../../store/appContext';

import CargarAcciones from "../../components/cargarAcciones";
import RevisarAccion from "../../components/revisarAccion";
import AsignarAccion from "../../components/asignarAccion";

export default function Acciones() {
  const { store, actions } = useContext(Context);
  const [funcionalidad, setfuncionalidad] = useState(null)
  useEffect(() => {
    setfuncionalidad()
    actions.getAcciones();
  }, [store.Acciones]
  )
  switch (funcionalidad) {
    case "revisar":
      return (
        <div className="Principal col-12 d-flex justify-content-center"><RevisarAccion setfuncionalidad={setfuncionalidad}/></div>
      )
    case "asignar":
      return (
        <div className="Principal col-12 d-flex justify-content-center"><AsignarAccion setfuncionalidad={setfuncionalidad}/></div>
      )
    default:
      return (
        <div className="Principal col-12">
          <div className="col-8 text-center position-absolute top-50 start-50 translate-middle">
          <h1 className="m-5 text-decoration-underline">Gestión de Acciones</h1>
            <CargarAcciones/>
            <div className="col-12 text-center">
              <h4 className="mt-3">Más opciones</h4>
              <button type="button" className="btnMenu btn btn-primary btn-lg" onClick={()=>setfuncionalidad("revisar")}>Revisar</button>
              <button type="button" className="btnMenu btn btn-success btn-lg ms-2" onClick={()=>setfuncionalidad("asignar")}>Asignar</button>
            </div>
          </div>
          </div>
      )
  }
}

