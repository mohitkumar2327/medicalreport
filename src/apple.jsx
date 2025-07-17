import Signup from "./components/signup";
import Login from "./components/login";
import Otp from "./components/otp";
import Homepage from './components/homepage';
import SubmittedData from "./components/submitdata";
import Mainpage from './components/mainpage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/submitted" element={<SubmittedData />} />
          {/* <Route path="/" element={<Navigate to="/signup" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;