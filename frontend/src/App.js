import './App.css';
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import UserRoutes from 'route/UserRoutes';
import { ReactNotifications } from 'react-notifications-component'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ReactNotifications />
        <UserRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
