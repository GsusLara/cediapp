import { useEffect, useContext } from "react";
import { Context } from '../../store/appContext';

import CargarAcciones from "../../components/cargarAcciones"
import RevisarAccion from "../../components/revisarAccion"

export default function Acciones() {
  const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getAcciones();
    }, [store.Acciones]
    )
  return (
    <div className="Principal">
      <div className="row mb-5">
        <CargarAcciones/>
        <RevisarAccion/>
      </div>
    </div>
  )
}

