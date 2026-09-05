import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => 
    fileName.endsWith('.md')
  );
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      ...data,
      rawDate: data.date ? new Date(data.date).toISOString() : null, // JSON-safe string for sorting
      date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : data.date,
    };
  });
  
  return allPostsData.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    content,
    ...data,
    date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : data.date,
  };
}