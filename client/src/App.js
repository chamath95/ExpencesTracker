import {BrowserRouter} from 'react-router-dom'

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MainRouter from './MainRouter'

function App() {
  return (
      <BrowserRouter>
          <MainRouter/>
      </BrowserRouter>
  );
}

export default App;
