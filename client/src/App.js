import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'

import { ChakraProvider } from '@chakra-ui/react'
// Imported Components
import PlantsIndex from './components/pages/plants/PlantsIndex'
import PlantSingle from './components/pages/plants/PlantSingle'
import PlantNew from './components/pages/plants/PlantNew'
import PlantEdit from './components/pages/plants/PlantEdit'

import BlogsAll from './components/pages/blogs/BlogsAll'
import SucculentsBlogs from './components/pages/blogs/SucculentsBlogs'
import BlogSingle from './components/pages/blogs/BlogSingle'
import BlogNew from './components/pages/blogs/BlogNew'
import BlogEdit from './components/pages/blogs/BlogEdit'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Profile from './components/pages/profile/Profile'
import EditProfile from './components/pages/profile/EditProfile'
import AboutUs from './components/pages/AboutUs'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

const App = () => {

  return (
    <ChakraProvider>
      <div className="site-wrapper">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/plants" element={<PlantsIndex />} />
            <Route path="/plants/:id" element={<PlantSingle />} />
            <Route path="/plants/new" element={<PlantNew />} />
            <Route path="/plants/:id/edit" element={<PlantEdit />} />
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogsAll />} />
            <Route path="/blogs/category/:category" element={<SucculentsBlogs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blogs/:blogsId" element={<BlogSingle />} />
            <Route path="/blogs/:blogsId/edit" element={<BlogEdit />} />
            <Route path="/blogs/new" element={<BlogNew />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

export default App
