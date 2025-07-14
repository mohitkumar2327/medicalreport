import Signup from "./components/signup";
import Login from "./components/login";
import Pages from "./components/Pages";
import Otp from "./components/otp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;