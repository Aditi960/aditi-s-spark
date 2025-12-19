import { useEffect, useRef, useState } from 'react';
import { Code, Database, Wrench, Sparkles } from 'lucide-react';
import SkillBar from './SkillBar';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    icon: Code,
    title: 'Front-End',
    skills: [
      { name: 'HTML & CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 75 },
      { name: 'Responsive Design', level: 88 },
    ],
    color: 'primary' as const,
  },
  {
    icon: Database,
    title: 'Back-End & Database',
    skills: [
      { name: 'Node.js & Express', level: 60 },
      { name: 'Firebase', level: 70 },
      { name: 'SQL', level: 65 },
      { name: 'REST APIs', level: 72 },
    ],
    color: 'secondary' as const,
  },
  {
    icon: Wrench,
    title: 'Programming & DSA',
    skills: [
      { name: 'Java (DSA)', level: 80 },
      { name: 'Python', level: 70 },
      { name: 'C/C++', level: 75 },
      { name: 'Problem Solving', level: 85 },
    ],
    color: 'accent' as const,
  },
];

const tools = [
  'GitHub', 'VS Code', 'Linux', 'Firebase', 'Netlify', 'Vercel', 'Jupyter', 'Colab'
];

const softSkills = [
  'Problem Solving', 'Fast Learner', 'Public Speaking', 'Team Collaboration'
];

const Skills = () => {
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
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Skills"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium mb-2">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Skills &{' '}
            <span className="gradient-text-gold">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuously expanding my toolkit to build better, faster, and more elegant solutions.
          </p>
        </div>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`glass rounded-2xl p-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${catIndex * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${
                  category.color === 'primary' ? 'bg-primary/20' :
                  category.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  <category.icon className={`w-5 h-5 ${
                    category.color === 'primary' ? 'text-primary' :
                    category.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <h3 className="text-lg font-serif font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    percentage={skill.level}
                    delay={catIndex * 100 + index * 100}
                    color={category.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Soft Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tools */}
          <div
            className={`glass rounded-2xl p-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '450ms' }}
          >
            <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className="text-sm py-1.5 px-3 border-border/50 hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div
            className={`glass rounded-2xl p-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '600ms' }}
          >
            <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="text-sm py-1.5 px-3 bg-secondary/20 text-secondary border-0 hover:bg-secondary/30 transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
