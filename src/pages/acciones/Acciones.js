import { useContext, useState, useRef } from 'react';
import { Context } from '../../store/appContext';

export default function Acciones() {
  const inputRef = useRef(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [files, setFiles] = useState([]);
  const handleChange = (event) => {
    setFiles(event.target.files);
    setButtonDisabled(false);
  };

  // const handleClick = () => {
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("file", files[i]);
  //   }
  
  //   fetch("http://localhost:3245/recepcion", {
  //     method: "POST",
  //     body: formData
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // };
  const handleClick = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    try {
      const response = await fetch("http://localhost:3245/recepcion", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      alert(JSON.stringify(data));
      setFiles([]);
      inputRef.current.value = null;
      setButtonDisabled(false);
    } catch (error) {
      console.error(error);
    }
  setButtonDisabled(true);
  };
  return (
    <div className="Principal">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h3 className="mb-4">Cargar Acciones al Sistema</h3>
          <div className="row justify-content-center">
            <div className="col-4 mb-4">
              <div className=" input-group">
                <input type="file" className="form-control" multiple onChange={(e)=>handleChange(e)} ref={inputRef}/>
                <button className="btn btn-outline-primary" type="button" id="button-addon2" disabled={buttonDisabled} onClick={()=> handleClick()}>Cargar</button>
              </div>
              <p className="textoSecundario">Seleccione uno o más archivos de tipo xls</p>
            </div>
          </div>
        </div>
        <div className="col-12 text-center">
          <h3 className="mb-4">Revision de Activos por Acción</h3>
          <div className="row justify-content-center">
            <div className="col-4 ">
              <select className="form-select " aria-label="acciones">
                <option>Seleccione la accion a revisar</option>
                
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
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}