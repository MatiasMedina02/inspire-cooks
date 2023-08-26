import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import CreateRecipe from "./pages/CreateRecipe";
import PageNotFound from "./pages/PageNotFound";
import PrintRecipe from "./pages/PrintRecipe";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  const [location, _] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div className="w-full min-h-screen">
      {location !== "/login" && location !== "/register" && <Navbar />}

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/recipe/:id">
          {(params) => <Detail id={params.id} />}
        </Route>
        <Route path="/print/:id">
          {(params) => <PrintRecipe id={params.id} />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/create" component={CreateRecipe} />
        <Route path="/search" component={Search} />
        <Route component={PageNotFound} />
      </Switch>

      {location !== "/login" && location !== "/register" && <Footer />}
    </div>
  );
};

export default App;
