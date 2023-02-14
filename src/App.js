import './App.css';
import {
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Result from './pages/Result';

function App() {
  
  return (
    
    <Routes>
      
      <Route exact path="/" element={<Home />} />
      <Route exact path="/result" element={<Result />} />
      
      
    </Routes>
    
  );
}

export default App;
