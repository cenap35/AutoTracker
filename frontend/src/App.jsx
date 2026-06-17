import "./styles/global.css";
import PageBackground from "./components/PageBackground";
import AppRoutes from "./routes/AppRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <PageBackground>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </PageBackground>
  );
}

export default App;