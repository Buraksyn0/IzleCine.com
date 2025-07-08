// src/App.js

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { Outlet } from 'react-router-dom';
import tmdbService from './services/tmdbService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData } from './store/izleCine';

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await tmdbService.getTrendingMovies();
      dispatch(setBannerData(response.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
