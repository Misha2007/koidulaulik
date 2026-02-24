import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [count, setCount] = useState(0);

  return (
    <header className="fixed flex items-center justify-between w-full p-4 mt-5">
      <a href="/" id="logo">
        <img src="/logoSmall.svg" alt="Logo" />
      </a>

      <nav id="menu">
        {/* <Link to="/news" className="menuItem">
          News
        </Link> */}
        <Link to="/activities" className="menuItem">
          Activities
        </Link>
        {/* <Link to="/art" className="menuItem">
          Art
        </Link> */}
      </nav>
    </header>
  );
}

export default Header;
