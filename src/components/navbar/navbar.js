import { Link } from "react-router-dom";
import Fodlogo from "../../assets/Fod.png";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <img src={Fodlogo} alt="Fundacion Omar Dengo" className="p-1 mr-1 navbar-brand" width={50} height={50} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li >
                            <Link to="/" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li >
                            <Link to="/Acciones" className="nav-link">
                                Gestion de Acciones
                            </Link >
                        </li>
                        <li >
                            <Link to="/Informes" className="nav-link">
                                Generación de Informes
                            </Link>
                        </li>
                        <li >
                            <Link to="/Usuarios" className="nav-link">
                                Gestión de Usuarios
                            </Link>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse" />
                    <Link to="/usuarios" className="nav-link salir">Cerrar Sesión</Link>
                </div>
            </div>
        </nav>
    )
}