import { Link } from "react-router-dom";

export default function Demo() {
    return (
        <div className='Principal'>
            <h1 className="mx-auto">Bienvenido a Demo!!</h1>
            <Link to="/">
                Go to home
            </Link>
        </div>
    )
}
