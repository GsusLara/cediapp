import { useContext} from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";


export default function Demo() {
    const { actions } = useContext(Context);
    return (
        <div className='Principal'>
            <h1 className="mx-auto">Bienvenido a Demo!!</h1>
            <Link to="/">
               <button onClick={()=>actions.changeSaludo()}>Go to home</button> 
            </Link>
        </div>
    )
}
