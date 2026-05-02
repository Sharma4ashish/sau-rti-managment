import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/Mainlayout';
import RTIListPage from './pages/RtiListPage';
import { RTIDetailsPage } from './pages/RTIDetailsPage';
import { Toaster } from "react-hot-toast";
import CreateRTI from './pages/CreateRTI';
import { RTIRegistrationForm } from './components/RTIRegistrationForm';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RTIListPage />} />
          <Route path="/rti/create" element={<CreateRTI />} />
          <Route path="/rti/:id" element={<RTIDetailsPage />} />
          <Route path="/rti/:id/update" element={<RTIRegistrationForm />    } />
        </Route>
      </Routes>
      <Toaster position="top-center" />

    </Router>
  );
}

export default App;