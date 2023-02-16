
export default function AsignarAccion({setfuncionalidad}) {
  return (
    <div>
        <button type="button" className="btn btn-danger" onClick={()=>setfuncionalidad(null)}>Salir</button>
    </div>
  )
}
