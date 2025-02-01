import HomePage from './components/Home/HomePage'
import PublicNavbar from './components/Navbar/PublicNavbar'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdatePost from './components/Posts/UpdatePost'
function App() {

  return (
    <BrowserRouter>
    <PublicNavbar/>
    <Routes>
      <Route element={<HomePage/>} path='/'/>
      <Route element={<CreatePost/>} path='/create-post'/>
      <Route element={<PostsList/>} path='/list-posts'/>
      <Route element={<UpdatePost/>} path='/posts/:postId'/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
