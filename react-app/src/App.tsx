import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Details from './components/Details';
import SellForm from './components/SellForm';
import Profile from './components/Profile';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  return (
    <div className="App w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<Details />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;