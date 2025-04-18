import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App