import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <main>
      <Header/>

      <div className='pt-16'>
      <Outlet/>
      </div>

      <Footer/>
    </main>
  );
}

export default App;
