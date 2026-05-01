import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/Mainlayout';
// import RtiList from './pages/RtiList';

function App() {
  return (
    <Router>
      <Routes>
        {/* MainLayout wraps all routes inside it */}
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<RtiList />} /> */}
          {/* We will add the Form and Details routes here next */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;