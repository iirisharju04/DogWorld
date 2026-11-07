import { NavLink } from 'react-router-dom';

function Navbar() {
    return(
        <nav>
            <NavLink to="/">Etusivu</NavLink>
            <NavLink to="/breeds">Koirarodut</NavLink>
            <NavLink to="/favorites">Suosikit</NavLink>
            <NavLink to="/compare">Vertailu</NavLink>
        </nav>
    );
}

export default Navbar;