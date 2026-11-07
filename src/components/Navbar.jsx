
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg dog-navbar">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    Dog World
                </NavLink>

                <div className="navbar-nav ms-auto">
                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/"
                        end
                    >
                        Etusivu
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/breeds"
                    >
                        Koirarodut
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/favorites"
                    >
                        Suosikit
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/compare"
                    >
                        Vertailu
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
