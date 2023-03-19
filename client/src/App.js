import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import {Landing,Register,Error,Dashboard} from './pages'

function App() {
  return (
    <BrowserRouter >

<nav>
  <Link to={'/'}>DASHBOARD</Link>
  <Link to={'/register'}>REGISTER</Link>
  <Link to={'/landing'}>LANDING</Link>
</nav>

     <Routes>
<Route path = '/' element = {<Dashboard/>}/>
<Route path = '/register' element = {<Register/>}/>
<Route path = '/landing' element = {<Landing/>}/>
<Route path = '*' element = {<Error/>}/>

     </Routes>
    </BrowserRouter>
  );
}

export default App;
