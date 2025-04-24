import { useState, useEffect } from 'react'
import './App.css'

import {useLocation, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import ExplorePage from '../src/pages/ExplorePage';
import AboutPage from '../src/pages/AboutPage';


function ScrollToElement() {
  const location = useLocation();

  useEffect(() => {
      if (location.hash) { // scroll to an element based on its hash (mainly used in the same page)
          const element = document.getElementById(location.hash.slice(1));

          if (element) 
            window.scrollTo({top: element.offsetTop-200, left: element.offsetLeft, behavior:'smooth'});
      }

      else if (location.pathname === '/') // scroll back to top of home page
        window.scrollTo({top: 0, left: 0, behavior:'smooth'});

      else { // remove the scroll when going to an element without a hash (mainly used for other pages)
          window.scrollTo({top: 0, left: 0}); 
      }
  }, [location]);
}

function App() {
  // Moved backend fetching to ExplorePage.jsx
  return (
    <>
      <Router>
        <ScrollToElement />
        <Routes>
          <Route path='/' element= {<HomePage />} />
          <Route path='/explore' element= {<ExplorePage />}/>
          <Route path='/about' element= {<AboutPage />}/>
          <Route path='*' element= {<HomePage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App