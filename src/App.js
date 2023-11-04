import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import PageNotFound from "./Components/PageNotFound";
import { routes } from "./Routes";
import LogIn from "./Authentication/Login";
import FunnelChart from "./Test";
import Signup from "./Authentication/Signup";
import CompanyCreation from "./Authentication/CompanyCreation";
import EmpLogin from "./Authentication/Login/EmpLogin";
import DrawingApp from "./Test";

export const App = () => {


  return (
    <BrowserRouter>
      <Routes>
     {/* adf */}
        <Route path="/doc" element={ <DrawingApp/>} />
        <Route path="/emp-login" element={<EmpLogin />} />
        <Route path="/" index element={<LogIn />} />
        <Route path="/login/:manufacturer" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-company" element={<CompanyCreation />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/test" element={<FunnelChart />} />
        {routes.map((route) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Layout
                  id={route.id}
                  navLink={route.path}
                  navItem={route.navItem}
                  component={route.component}
                />
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
