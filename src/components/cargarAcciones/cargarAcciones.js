import { useState, useRef, useContext } from 'react';
import { Context } from '../../store/appContext';

export default function CargarAcciones() {
  const { store, actions } = useContext(Context);
  const inputRef = useRef(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [files, setFiles] = useState([]);
  
  const capturaArchivos = (event) => {
    setFiles(event.target.files);
    setButtonDisabled(false);
  };
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
    actions.getAcciones();
  };
  return (
    <div className="col-12 text-center">
          <h3 className="mb-4">Cargar Acciones al Sistema</h3>
          <div className="row justify-content-center">
            <div className="col-4 mb-4">
              <div className=" input-group">
                <input type="file" className="form-control" multiple onChange={(e) => capturaArchivos(e)} ref={inputRef} />
                <button className="btn btn-outline-primary" type="button" id="button-addon2" disabled={buttonDisabled} onClick={() => handleClick()}>Cargar</button>
              </div>
              <p className="textoSecundario">Seleccione los archivos de Acción en formato xls</p>
            </div>
          </div>
        </div>
  )
}