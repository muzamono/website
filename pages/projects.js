import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      title: "Stocks Tracker ETL",
      description: "End to end stock price pipeline orchestrated with Apache Airflow, deployed on AWS with a scheduled daily run.",
      tech: ['Python', 'Airflow','PostgreSQL', 'Docker', 'AWS'],
      link: "/stocks-tracker"
    },
    {
      title: "Receipt Tracker",
      description: "Full stack expense tracking app with a mobile first interface.",
      tech: ['FastAPI', 'PostgreSQL', 'Docker', 'React'],
      link: "/receipt-tracker"
    },
    {
      title: "ETL Pipeline",
      description: "ETL pipeline with local and live updates capabilities",
      tech: ['Python', 'SQL', 'API', 'AWS S3'],
      link: "/project3"
    },
    {
      title: "Simple Database Loader", 
      description: "Simple loader where csv files are loaded into a relational database (sqlite)",
      tech: ['Python', 'Pandas', 'SQL', 'ETL'],
      link: "/project2"
    },
    {
      title: "CSV Data Pipeline",
      description: "Simple loader for csv files: load raw data, clean and save to new csv",
      tech: ["Python", "Pandas", "File I/O", "Basic ETL"],
      link: "/project1"
    }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(225deg, #0e141b 0%, #0e141b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
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

      <div className="max-w-6xl mx-auto px-4" style={{ marginTop: '80px' }}>
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 className="text-4xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            My Projects
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link key={index} href={project.link}>
                <div 
                  className="p-6 rounded-2xl transition-all hover:transform hover:-translate-y-2 cursor-pointer"
                  style={{
                    background: '#030a2e',
                    borderLeft: '4px solid #4759a9'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="mb-4" style={{ opacity: 0.8 }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ background: '#667eea', color: 'white' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="font-medium" style={{ color: '#667eea' }}>
                    View Project →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}