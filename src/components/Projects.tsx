import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'SkillBuddy – Career Course Companion',
    description: 'Final year project featuring Firebase authentication, Firestore backend, and responsive UI. Planned upgrades include React, Node.js, TailwindCSS, and AI-based course recommendations.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Firestore'],
    githubUrl: 'https://github.com/Aditi960/SkillBuddy',
    liveUrl: 'https://skillbuddy0.netlify.app/',
    isLive: true,
    featured: true,
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Responsive portfolio showcasing skills, certifications, and projects with interactive UI components and smooth animations.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Aditi960/Portfolio',
    liveUrl: 'https://aditithakare.netlify.app/',
    isLive: true,
    featured: true,
  },
  {
    title: 'Movie Data Analysis',
    description: 'Exploratory data analysis project using pandas, NumPy, matplotlib, and seaborn. Features heatmaps, bar charts, and trend visualizations.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/Aditi960/Movie-Data-Analysis',
  },
  {
    title: 'Restaurant Management System',
    description: 'Menu-driven billing system in C supporting multi-meal ordering with quantity-based calculations and personalized customer greetings.',
    techStack: ['C', 'CLI', 'MinGW'],
    githubUrl: 'https://github.com/Aditi960/restaurant-management-system',
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Projects"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium mb-2">My Work</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my journey through web development, 
            data analysis, and software engineering.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={isVisible ? 'animate-fade-up' : 'opacity-0'}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
