import { Provider } from "react-redux";
import { store } from "./store/Index";
import { BrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/authLayout";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AuthLayout />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
