//@ts-nocheck
import "materialize-css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import useAuth from "./hooks/auth.hook";
import { useRouter } from "./routers/useRouter";
import NavBar from "./components/NavBar";
// import Loader from "./components/Loader";

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthentication = !!token;
  const router = useRouter(isAuthentication);
  // if (!ready) {
  //   return <Loader />;
  // }

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthentication }}
    >
      <BrowserRouter>
        {isAuthentication && <NavBar />}
        <div className="container">{router}</div>;
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
