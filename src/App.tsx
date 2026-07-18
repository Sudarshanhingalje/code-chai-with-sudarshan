import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Tags } from './pages/Tags';
import { Archive } from './pages/Archive';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Write } from './pages/Write';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-cream dark:bg-espresso text-ink dark:text-parchment transition-colors duration-200">

        <Nav />

        <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 pb-16">
          <Routes>
            {/* Home directly shows the blog */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tags/:tag" element={<Tags />} />
            {/* These pages still exist via direct URL, just not in nav */}
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Secret admin write page — not linked from nav */}
            <Route path="/write" element={<Write />} />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </HashRouter>
  );
};

export default App;
