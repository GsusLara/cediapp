import { useContext} from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";


export default function Home() {
  const { store} = useContext(Context);
  return (
    <div className="Principal">
      <Link to="/demo">
        Go to Demo
      </Link>
      <h1>{store.saludo}</h1>
    </div>
  )
}
