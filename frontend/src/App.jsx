import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/Mainlayout';
import RTIListPage from './pages/RtiListPage';
import RtiForm from './components/RtiForm';
import { useEffect,useState } from 'react';
import { rtiService } from './services/api';



// import RtiList from './pages/RtiList';


function App() {
  const [rtiData, setRtiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRTIs = async () => {
    try {
      setLoading(true);

      const data = await rtiService.getRTIs({
        page: 1,
        limit: 10,
      });

      console.log("API 👉", data);

      setRtiData(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRTIs();
  }, []);

  return (
    <Router>
      <Routes>
        {/* MainLayout wraps all routes inside it */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RTIListPage />} />
          <Route path="add-rti" element={<RtiForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;