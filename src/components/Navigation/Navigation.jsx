import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  function navStyles({ isActive }) {
    if (isActive) return css.active;
    else return css.NavLink;
  }

  return (
    <nav className={css.navContainer}>
      <NavLink to="/" className={navStyles}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navStyles}>
        Movies
      </NavLink>
    </nav>
  );
}
