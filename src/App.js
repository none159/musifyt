import Page from './components/page'
import About from './components/aboutpage'
import Musicpage from './components/musicpage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
      <Router>

        <Routes>

          <Route path='/musifyt' element={<Page />} />
          <Route path='/music' element={<Musicpage />} />
          <Route path='/About' element={<About />} />



        </Routes>


      </Router>

    </>
  );
}

export default App;
