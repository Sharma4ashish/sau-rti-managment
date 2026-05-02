import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/Mainlayout';
import RTIListPage from './pages/RtiListPage';
import { RTIDetailsPage } from './pages/RTIDetailsPage';
import { RTIRegistrationForm } from './components/RTIRegistrationForm';
import { Toaster } from "react-hot-toast";
import CreateRTI from './pages/CreateRTI';




// import RtiList from './pages/RtiList';


function App() {


  return (
    <Router>
      <Routes>
        {/* MainLayout wraps all routes inside it */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RTIListPage />} />
          <Route path="/rti/create" element={<CreateRTI />} />
          <Route path="/rti/:id" element={<RTIDetailsPage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />

    </Router>
  );
}

export default App;