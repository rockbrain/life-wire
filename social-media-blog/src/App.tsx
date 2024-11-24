import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

interface Post {
  id: number;
  username: string;
  title: string;
  content: string;
  mediaType?: 'image' | 'video' | 'audio';
  mediaUrl?: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  username: string;
  content: string;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button 
      className="theme-toggle"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-icon">
        {/* Sun icon */}
        <svg className="sun-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
        {/* Moon icon */}
        <svg className="moon-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      </div>
    </button>
  );
}

function Navbar({ currentUser, onLogout }: { currentUser: string | null, onLogout: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle body scroll
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo">
          <h1>Life-Wire</h1>
        </div>

        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              <a href="#" className="active">Home</a>
              <a href="#">Trending</a>
              <a href="#">Categories</a>
              <a href="#">About</a>
            </div>
            <div className="mobile-search">
              <input type="search" placeholder="Search posts..." />
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#">Trending</a>
            <a href="#">Categories</a>
            <a href="#">About</a>
          </div>
          <div className="nav-search">
            <input type="search" placeholder="Search posts..." />
          </div>
          <ThemeToggle />
        </div>

        <div className="nav-user">
          <span className="username">{currentUser}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

function LeftSidebar() {
  const categories = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Sports', 'Music'];
  
  return (
    <aside className="sidebar left-sidebar">
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul className="category-list">
          {categories.map(category => (
            <li key={category}>
              <a href="#">{category}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Trending Topics</h3>
        <div className="trending-tags">
          <span className="tag">#technology</span>
          <span className="tag">#travel</span>
          <span className="tag">#photography</span>
          <span className="tag">#food</span>
        </div>
      </div>
    </aside>
  );
}

function RightSidebar() {
  return (
    <aside className="sidebar right-sidebar">
      <div className="sidebar-section">
        <h3>Top Contributors</h3>
        <ul className="contributors-list">
          {['John Doe', 'Jane Smith', 'Mike Johnson'].map(name => (
            <li key={name} className="contributor">
              <div className="avatar small">{name[0]}</div>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li>New post by John Doe</li>
          <li>Jane commented on "Travel Tips"</li>
          <li>Mike shared a new photo</li>
        </ul>
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>A community-driven blog platform for sharing stories and experiences.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Social Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [newPost, setNewPost] = useState({
    username: '',
    title: '',
    content: '',
    mediaFile: null as File | null,
    mediaType: undefined as 'image' | 'video' | 'audio' | undefined
  });

  const handleAddComment = (postId: number, username: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            username,
            content
          }]
        };
      }
      return post;
    }));
  };

  const handleLogin = async (username: string, password: string) => {
    // Here you would typically make an API call to verify credentials
    // For now, we'll just simulate authentication
    if (username && password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleRegister = async (userData: {
    username: string;
    email?: string;
    phone?: string;
    password: string;
  }) => {
    // Here you would typically make an API call to create the account
    // For now, we'll just simulate it
    try {
      setIsAuthenticated(true);
      setCurrentUser(userData.username);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split('/')[0] as 'image' | 'video' | 'audio';
      setNewPost({
        ...newPost,
        mediaFile: file,
        mediaType: fileType
      });
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: Date.now(),
        username: newPost.username,
        title: newPost.title,
        content: newPost.content,
        mediaType: newPost.mediaType,
        mediaUrl: newPost.mediaFile ? URL.createObjectURL(newPost.mediaFile) : undefined,
        comments: []
      };

      setPosts([post, ...posts]);
      setNewPost({
        username: '',
        title: '',
        content: '',
        mediaFile: null,
        mediaType: undefined
      });
    }
  };

  if (!isAuthenticated) {
    if (isRegistering) {
      return (
        <Register 
          onRegister={handleRegister}
          onToggleLogin={() => setIsRegistering(false)}
        />
      );
    }
    return (
      <Login 
        onLogin={handleLogin}
        onToggleRegister={() => setIsRegistering(true)}
      />
    );
  }

  return (
    <div className="app">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="main-container">
        <LeftSidebar />
        <main className="main-content">
          <div className="posts-container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="create-post-card"
            >
              <h2 className="section-title">
                <i className="icon-edit"></i>
                Create an Article
              </h2>
              <form onSubmit={handleSubmitPost} className="post-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={newPost.username}
                    onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Give your article a title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    placeholder="Write your article..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
                
                <div className="media-upload">
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileChange}
                    id="media-upload"
                    className="file-input"
                  />
                  <label htmlFor="media-upload" className="file-label">
                    <i className="icon-media"></i>
                    <span>{newPost.mediaFile ? newPost.mediaFile.name : 'Upload Media (Image/Video/Audio)'}</span>
                  </label>
                  {newPost.mediaFile && (
                    <button 
                      type="button" 
                      onClick={() => setNewPost({ ...newPost, mediaFile: null, mediaType: undefined })}
                      className="remove-media"
                    >
                      ✕
                    </button>
                  )}
                </div>
                
                <button type="submit" className="submit-button">
                  Publish Article
                </button>
              </form>
            </motion.div>

            <AnimatePresence>
              {posts.map(post => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="post-card"
                >
                  <div className="post-header">
                    <div className="avatar">{post.username[0].toUpperCase()}</div>
                    <div className="post-meta">
                      <h2>{post.title}</h2>
                      <p>Posted by {post.username}</p>
                    </div>
                  </div>
                  
                  {post.mediaUrl && post.mediaType === 'image' && (
                    <motion.img 
                      src={post.mediaUrl} 
                      alt=""
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="post-media"
                    />
                  )}
                  
                  {post.mediaUrl && post.mediaType === 'video' && (
                    <video controls className="post-media">
                      <source src={post.mediaUrl} type="video/mp4" />
                    </video>
                  )}
                  
                  {post.mediaUrl && post.mediaType === 'audio' && (
                    <audio controls className="post-media">
                      <source src={post.mediaUrl} type="audio/mpeg" />
                    </audio>
                  )}
                  
                  <div className="post-content">
                    {post.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="comments-section">
                    <h3>
                      <i className="icon-comment"></i>
                      Comments
                    </h3>
                    <div className="comments-list">
                      {post.comments.map(comment => (
                        <motion.div 
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="comment"
                        >
                          <div className="comment-header">
                            <div className="avatar small">{comment.username[0].toUpperCase()}</div>
                            <span className="username">{comment.username}</span>
                          </div>
                          <p>{comment.content}</p>
                        </motion.div>
                      ))}
                    </div>
                    <AddComment postId={post.id} onAddComment={handleAddComment} />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </main>
        <RightSidebar />
      </div>
      <Footer />

      {/* Floating Action Button */}
      <button 
        className="fab"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Create Article Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create an Article</h2>
              <button 
                className="close-button"
                onClick={() => setIsCreateModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={(e) => {
                handleSubmitPost(e);
                setIsCreateModalOpen(false);
              }} className="post-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={newPost.username}
                    onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Give your article a title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    placeholder="Write your article..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
                
                <div className="media-upload">
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileChange}
                    id="media-upload"
                    className="file-input"
                  />
                  <label htmlFor="media-upload" className="file-label">
                    <i className="icon-media"></i>
                    <span>{newPost.mediaFile ? newPost.mediaFile.name : 'Upload Media (Image/Video/Audio)'}</span>
                  </label>
                  {newPost.mediaFile && (
                    <button 
                      type="button" 
                      onClick={() => setNewPost({ ...newPost, mediaFile: null, mediaType: undefined })}
                      className="remove-media"
                    >
                      ✕
                    </button>
                  )}
                </div>
                
                <button type="submit" className="submit-button">
                  Publish Article
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddComment({ postId, onAddComment }: { postId: number, onAddComment: (postId: number, username: string, content: string) => void }) {
  const [comment, setComment] = useState({ username: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.username.trim() && comment.content.trim()) {
      onAddComment(postId, comment.username, comment.content);
      setComment({ username: '', content: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="Your username"
        value={comment.username}
        onChange={(e) => setComment({ ...comment, username: e.target.value })}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment.content}
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
        className="flex-[2] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transform hover:scale-[1.02] transition-all"
      >
        Comment
      </button>
    </form>
  );
}

export default App;
