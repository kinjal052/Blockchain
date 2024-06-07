import './App.css';
import Connection from './connection';
import Navbar from './Navbar';
import Creator from './Creator';
import Buyer from './Buyer';
import TicketingApp from './Erc1155';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
<div>
      <Router>
        <Navbar/>
        <Routes>         
          <Route path="/creator" element={<Creator/>}/>
          <Route path="/buyer" element={<Buyer/>}/>
        </Routes>       
      </Router>
</div>
  );
}

export default App;
