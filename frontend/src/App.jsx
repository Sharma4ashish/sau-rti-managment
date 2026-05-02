import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/Mainlayout';
import RTIListPage from './pages/RtiListPage';
import RtiForm from './components/RtiForm';
import { useEffect,useState } from 'react';
// import { rtiService } from './services/api';
import { RTIDetailsPage } from './pages/RTIDetailsPage';
import { RTIRegistrationForm } from './components/RTIRegistrationForm';



// import RtiList from './pages/RtiList';


function App() {


  return (
    <Router>
      <Routes>
        {/* MainLayout wraps all routes inside it */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RTIListPage />} />
          <Route path="add-rti" element={<RTIRegistrationForm />} />
          <Route path="/rti/:id" element={<RTIDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;