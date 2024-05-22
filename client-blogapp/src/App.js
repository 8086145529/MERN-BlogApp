
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from './components/Protected';


function App() {
  return (
    <>
   <ToastContainer position='top-right' theme='light'/>
    <Routes> 
      <Route path="/" element={<Layout />}>
        {/* The purpose of assigning an 'index' property to the route of a child component inside a parent component is to provide a fallback or default behavior when none of the specific child routes match.  */}
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/create' element={<Protected Component={CreatePost}/>}/>
          <Route path='/post/:id' element={<Protected Component={PostPage}/>} />
          <Route path='/edit/:id' element={<Protected Component={EditPost}/>}/>
       
        </Route>
    </Routes>
    </>

  );
}

export default App;
