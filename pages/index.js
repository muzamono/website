import { useState } from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import { getPhotosWithBlogLinks } from '../lib/photos';

export default function Home({ posts,photos }) {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBlogSlug, setModalBlogSlug] = useState(null);

  const openModal = (imageSrc, title, blogSlug) => {
    setModalImage(imageSrc);
    setModalTitle(title);
    setModalBlogSlug(blogSlug);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle('');
    setModalBlogSlug(null);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(225deg, #0e141b 0%, #0e141b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Navigation */}
      <header style={{
        background: 'linear-gradient(90deg, #0e141b 0%, #0d1824 100%)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold" style={{ color: '#667eea' }}>muzamono</div>
          <ul className="flex space-x-8">
            <li><Link href="#about" className="text-white hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link href="/projects" className="text-white hover:text-blue-400 transition-colors">Projects</Link></li>
            <li><Link href="/blog" className="text-white hover:text-blue-400 transition-colors">Blog</Link></li>
            <li><Link href="#photos" className="text-white hover:text-blue-400 transition-colors">Photos</Link></li>
            <li><Link href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4" style={{ marginTop: '80px' }}>
        {/* Hero Section */}
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem 2rem',
          margin: '2rem 0',
          borderRadius: '20px',
          textAlign: 'left'
        }}>
          <h1 className="text-5xl font-bold mb-4" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Hello, call me Zakuan
          </h1>
          <p className="text-xl mb-8" style={{ opacity: 0.9 }}>
          Data engineer in transition from mechanical engineering, building pipelines end to end
          </p>
        </section>

        {/* About Section */}
        <section id="about" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            About Me
          </h2>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.9 }}>
                I hold Master's Degree in Mechanical Engineering from a university in Japan. <br/>
                I am currently transitioning into data engineering, building and deploying full pipelines from the ground up.<br/> 
                My work spans orchestration with Apache Airflow, cloud deployment on AWS, and full stack applications with FastAPI and React.<br/> 
                I write about what I build, including the parts that did not work the first time. <br/>
                Outside of engineering, my interests are photography and stocks trading.
          </p>
        </section>

        {/* Featured Projects */}
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          <Link href="stocks-tracker">
              <div 
                className="p-6 rounded-2xl transition-all hover:transform hover:-translate-y-2 cursor-pointer"
                style={{
                  background: '#030a2e',
                  borderLeft: '4px solid #4759a9'
                }}
              >
                <h3 className="text-xl font-bold mb-3">Stocks Tracker ETL</h3>
                <p className="mb-4" style={{ opacity: 0.8 }}>End to end stock price pipeline orchestrated with Apache Airflow, deployed on AWS with a scheduled daily run.</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Airflow','PostgreSQL', 'Docker', 'AWS'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: '#667eea', color: 'white' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <Link href="/receipt-tracker">
              <div 
                className="p-6 rounded-2xl transition-all hover:transform hover:-translate-y-2 cursor-pointer"
                style={{
                  background: '#030a2e',
                  borderLeft: '4px solid #4759a9'
                }}
              >
                <h3 className="text-xl font-bold mb-3">Receipt Tracker</h3>
                <p className="mb-4" style={{ opacity: 0.8 }}>Full stack expense tracking app with a mobile first interface.</p>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'PostgreSQL', 'Docker', 'React'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: '#667eea', color: 'white' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/projects" 
              className="inline-block px-6 py-3 rounded font-medium transition-all hover:transform hover:-translate-y-1"
              style={{ 
                background: '#4759a9',
                color: 'white'
              }}
            >
              View All Projects
            </Link>
          </div>
        </section>

        {/* Recent Blog Posts */}
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Latest Blog Posts
          </h2>
          {posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.slice(0, 3).map((post) => (
                <article 
                  key={post.slug}
                  className="p-6 rounded-2xl transition-all hover:transform hover:translate-x-2"
                  style={{
                    background: '#050e43',
                    borderLeft: '4px solid #764ba2'
                  }}
                >
                  <div className="text-sm mb-2" style={{ color: '#878787' }}>
                    {post.date}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-3 hover:text-blue-400 cursor-pointer transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mb-3" style={{ opacity: 0.8 }}>{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="font-medium transition-colors hover:text-blue-400"
                    style={{ color: '#764ba2' }}
                  >
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p style={{ opacity: 0.8 }}>No blog posts yet. Create your first post!</p>
          )}
          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-block px-6 py-3 rounded font-medium transition-all hover:transform hover:-translate-y-1"
              style={{ 
                background: '#764ba2',
                color: 'white'
              }}
            >
              View All Posts
            </Link>
          </div>
        </section>

        {/* Photo Gallery */}
        <section id="photos" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div 
                key={photo.blogSlug}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
                style={{ aspectRatio: '4/3' }}
                onClick={() =>  openModal(photo.src, photo.title, photo.blogSlug)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform"
                  style={{ 
                    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(100%)';
                  }}
                >
                  <h4 className="font-bold">{photo.title}</h4>
                  <p className="text-sm opacity-90">{photo.desc}</p>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                    onClick={() => openModal(photo.src, photo.title, photo.blogSlug)}
                  >
                    Read Blog Post →
                  </button>
                </div>
              </div>
              
            ))}
          </div>
        </section>
      </div>

      {/* Photo Modal */}
      {modalImage && (
        <div 
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
          style={{ 
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(5px)'
          }}
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-4xl p-4">
            <button 
              onClick={closeModal}
              className="absolute -top-4 -right-4 text-white text-3xl font-bold hover:text-gray-300"
              style={{ zIndex: 60 }}
            >
              ×
            </button>
            <img 
              src={modalImage.replace('w=400&h=300', 'w=800&h=600')} 
              alt={modalTitle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-bold mb-3">{modalTitle}</h3>
              {modalBlogSlug && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/blog/${modalBlogSlug}`;
                  }}
                >
                  Read Blog Post →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer 
        id="contact" 
        className="text-center py-12 mt-8"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: '#333'
        }}
      >
        <h2 className="text-3xl font-bold mb-6">Let&apos;s Connect</h2>
        <div className="flex justify-center space-x-8 mb-4">
          <a href="mailto:m.zakuan7575@gmail.com" style={{ color: '#667eea' }} className="hover:text-purple-600 transition-colors font-medium">Email</a>
          <a href="https://www.linkedin.com/in/muhammad-zakuan-2a55a9270" target="_blank" style={{ color: '#667eea' }} className="hover:text-purple-600 transition-colors font-medium">LinkedIn</a>
          <a href="https://github.com/muzamono" target="_blank" style={{ color: '#667eea' }} className="hover:text-purple-600 transition-colors font-medium">GitHub</a>
          <a href="/resume/resume.pdf" target="_blank" style={{ color: '#667eea' }} className="hover:text-purple-600 transition-colors font-medium" rel="noopener noreferrer">Resume</a>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const photos = getPhotosWithBlogLinks(); // Fetch photos if needed
  return {
    props: {
      posts,
      photos,
    },
  };
}