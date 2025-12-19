import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const timelineItems = [
  {
    type: 'education',
    icon: GraduationCap,
    title: 'Bachelor of Computer Applications (BCA)',
    organization: 'Haribhai V. Desai College of Arts, Science and Commerce',
    location: 'Pune, Maharashtra',
    date: 'Apr 2023 – Apr 2026',
    description: 'Coursework: Java, Web Development, Data Structures, Cloud Computing, OS, AI',
    current: true,
  },
  {
    type: 'certification',
    icon: Award,
    title: 'AWS Cloud Certification',
    organization: 'GreatLearning',
    date: '2023',
  },
  {
    type: 'certification',
    icon: Award,
    title: 'Introduction to Golang',
    organization: 'SkillUp',
    date: '2023',
  },
  {
    type: 'certification',
    icon: Award,
    title: 'Project Management',
    organization: 'SkillUp',
    date: '2023',
  },
];

const Timeline = () => {
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
      id="timeline"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Education and Certifications"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium mb-2">Journey</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Education &{' '}
            <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary" />

          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`relative mb-12 last:mb-0 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`flex items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.type === 'education' 
                      ? 'bg-primary/20 ring-4 ring-primary/30' 
                      : 'bg-secondary/20 ring-4 ring-secondary/30'
                  } ${item.current ? 'glow-primary' : ''}`}>
                    <item.icon className={`w-5 h-5 ${
                      item.type === 'education' ? 'text-primary' : 'text-secondary'
                    }`} />
                  </div>
                </div>

                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <div className="glass rounded-2xl p-6 card-hover">
                    {/* Date badge */}
                    <Badge 
                      variant="outline" 
                      className="mb-3 text-xs border-border/50 text-muted-foreground"
                    >
                      {item.date}
                    </Badge>
                    
                    {/* Title */}
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    
                    {/* Organization */}
                    <p className="text-muted-foreground text-sm mb-2">
                      {item.organization}
                    </p>
                    
                    {/* Location */}
                    {item.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    )}
                    
                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                    
                    {/* Current indicator */}
                    {item.current && (
                      <Badge className="mt-3 bg-primary/20 text-primary border-0">
                        Currently Pursuing
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
