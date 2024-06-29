import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import PostForm from './containers/PostForm/PostForm';  
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import PostDetails from './containers/PostDetails/PostDetails';
import Posts from './containers/Posts/Posts';

const App: React.FC = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<PostForm />} />  
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
