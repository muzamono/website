import { getAllPosts, getPostBySlug } from '../../lib/posts';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';
import Link from 'next/link';
import { useState } from 'react';

export default function Post({ post }) {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (imageSrc, title) => {
    setModalImage(imageSrc);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle('');
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
          <Link href="/" className="text-xl font-bold" style={{ color: '#667eea' }}>
            muzamono
          </Link>
          <ul className="flex space-x-8">
            <li><Link href="/#about" className="text-white hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link href="/projects" className="text-white hover:text-blue-400 transition-colors">Projects</Link></li>
            <li><Link href="/blog" className="text-white hover:text-blue-400 transition-colors">Blog</Link></li>
            <li><Link href="/#photos" className="text-white hover:text-blue-400 transition-colors">Photos</Link></li>
            <li><Link href="/#contact" className="text-white hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4" style={{ marginTop: '80px' }}>
        <article style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="text-sm mb-4" style={{ color: '#878787' }}>
            {post.date}
          </div>
          <h1 className="text-4xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            {post.title}
          </h1>
          {post.featuredImage && (
            <div className="mb-6">
              <img 
                src={post.featuredImage}
                alt={post.title}
                className="w-full max-w-none rounded-lg cursor-pointer"
                style={{
                  height: 'auto',
                  objectFit: 'contain' // Shows full image without cropping
                }}
                onClick={() => openModal(post.featuredImage, post.title)}
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            style={{ 
              color: 'white',
              opacity: 0.9,
              fontSize: '1.125rem',
              lineHeight: '1.7'
            }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        {/* Back to Blog */}
        <section className="text-center py-8">
          <Link 
            href="/blog" 
            className="inline-block px-6 py-3 rounded font-medium transition-all hover:transform hover:-translate-y-1"
            style={{ 
              background: '#764ba2',
              color: 'white'
            }}
          >
            ← Back to Blog
          </Link>
        </section>
      </div>
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
              src={modalImage}
              alt={modalTitle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const processedContent = await remark()
    .use(remarkBreaks)
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        ...post,
        contentHtml,
      },
    },
  };
}