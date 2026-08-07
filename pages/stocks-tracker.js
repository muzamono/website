import Link from 'next/link';

export default function stockstracker() {
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

      <main className="max-w-6xl mx-auto px-4" style={{ marginTop: '80px' }}>
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
            Stocks Tracker ETL
          </h2>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.9 }}>
          End to end stock price pipeline orchestrated with Apache Airflow, deployed on AWS with a scheduled daily run. Pulls from the Alpha Vantage API into PostgreSQL, with Metabase for visualization.
          </p>
        </section>

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
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Python', 'Airflow','PostgreSQL', 'Docker', 'AWS'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full text-lg font-medium"
                style={{ background: '#667eea', color: 'white' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

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
            Features
          </h2>
          <ul className="space-y-3 text-lg">
            <li style={{ opacity: 0.9 }}>• Extract, transform and load live data from API into PostgreSQL using Python scripts </li>
            <li style={{ opacity: 0.9 }}>• The ETL pipeline is orchestrated by Airflow DAG </li>
            <li style={{ opacity: 0.9 }}>• Scheduled daily run using cronjob on AWS EC2 </li>
            <li style={{ opacity: 0.9 }}>• Visualization using SQL queries demonstrated through Metabase  </li>
          </ul>
        </section>

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
            Code Snippet
          </h2>
          <div 
            className="rounded-lg p-6 overflow-x-auto"
            style={{ background: '#030a2e' }}
          >
            <pre>
              <code className="text-green-400">
{`# run_pipeline.py
# Standalone test script — chains extract -> transform -> load manually.
# Use this to verify the whole pipeline works BEFORE wiring it into Airflow.
# Run from project root: python run_pipeline.py

from etl.extract import extract
from etl.transform import transform
from etl.load import load
import time

symbols = ["AAPL", "NVDA"]   # Insert stock ticker(s) 

for symbol in symbols:
    print(f"\n--- Running pipeline for {symbol} ---")

    extracted = extract(symbol)

    if extracted is None:
        print(f"[run_pipeline] Skipping {symbol} — extract failed (check rate limit or API key)")
        continue  # Move to next symbol instead of crashing
    
    records = transform(extracted)
    load(records)

    time.sleep(15)

print("\n--- Pipeline run complete ---")`}
              </code>
            </pre>
          </div>
        </section>

        <section className="text-center py-8">
          <Link 
            href="/projects" 
            className="inline-block px-6 py-3 rounded font-medium transition-all hover:transform hover:-translate-y-1"
            style={{ 
              background: '#4759a9',
              color: 'white'
            }}
          >
            ← Back to Projects
          </Link>
        </section>
      </main>
    </div>
  );
}