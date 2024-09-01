import { Outlet } from "react-router-dom";
import "./base-layout.css";
import { Button } from "../../components/button/button";
export default function BaseLayout() {
  return (
    <>
      <header>
        <div>Book Store</div>
        <nav>
          <ul className="nav-list">
            <li className="nav-list-item">
              <Button linkTo="/"> Home </Button>
            </li>
            <li className="nav-list-item">
              <Button linkTo="/books">Stock</Button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
