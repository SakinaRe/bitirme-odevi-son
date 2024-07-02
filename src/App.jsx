import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Info from "./Components/Info/Info";

import NavBar from "./Components/NavBar/NavBar";
import Search from "./Components/Search/Search";
import Subscribers from "./Components/Subscribers/Subscribers";
import Support from "./Components/Support/Support";
import LoginForm from "./Components/Login/Login";
import Travelers from "./Components/Travelers/Travelers";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (success) => {
    if (success) {
      setIsLoggedIn(true);
        } else {
      alert('Incorrect username or password!');
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <NavBar handleLogout={handleLogout}/>
          <Home />
          <Search />
          <Travelers />
          <Subscribers />
          <Info />
          <Support />
          <Footer />
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )
      }
    </div>
  );
};

export default App;
