import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import React from "react";
const App = () => {
  return (
    <React.Fragment>
      <AppRoutes />
      <Toaster />
    </React.Fragment>
  );
};

export default App;
