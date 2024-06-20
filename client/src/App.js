
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './Components/pages/Header';
import View from './Components/pages/View';
import Home from './Components/pages/Home';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Header/>
  
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/view' element={<View/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
