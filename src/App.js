import Test from "./components/Test/Test"
import LoginPage from "./containers/LoginPage/LoginPage"
import RegistrationPage from "./containers/RegistrationPage/RegistrationPage"
import NavBar from "./components/Navbar/Navbar"
import RoutinePage from "./containers/RoutinePage/RoutinePage"
import SchedulePage from "./containers/SchedulePage/SchedulePage"
import ExercisePage from "./containers/ExercisePage/ExercisePage"
import AboutPage from "./containers/AboutPage/AboutPage"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import background from "./assets/Dumbbells.jpg"

//NB this is important for JWT Auth
import { axiosAuthRequestInterceptor } from "./config/interceptor/interceptor"

function App() {

  const myStyle={
    backgroundImage: `url(${background})`,
            height:'100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            };
  return (
    <div className="App" style={myStyle}>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path = "/" exact element = {<LoginPage/>}/>
          <Route path = "/about" exact element = {<AboutPage/>}/>
          <Route path = "/schedule" exact element = {<SchedulePage/>}/>
          <Route path = "/test" exact element = {<Test/>}/>
          <Route path = "/register" exact element = {<RegistrationPage/>}/>
          <Route path = "/routines" exact element = {<RoutinePage/>}/>
          <Route path ="/exercises/:id" exact element={<ExercisePage/>}/>
        </Routes> 
      /* </BrowserRouter>
    </div>
  );
}

export default App;
