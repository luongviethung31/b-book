import './App.css';
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import UserRoutes from 'route/UserRoutes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
