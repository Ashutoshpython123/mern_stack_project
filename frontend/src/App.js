import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'


import './App.css';
import Login from './Login'
import Register from './Register'
import Pages from './Pages'
import Header from './Header'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
