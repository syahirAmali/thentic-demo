import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Collections from './components/Collections';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/collections' element={<Collections/>} />
  </Routes>
);
}
export default Main;