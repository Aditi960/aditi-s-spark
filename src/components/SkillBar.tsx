import { useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  color?: 'primary' | 'secondary' | 'accent';
}

const SkillBar = ({ skill, percentage, delay = 0, color = 'primary' }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const colorClasses = {
    primary: 'from-primary to-cyan-400',
    secondary: 'from-secondary to-amber-400',
    accent: 'from-accent to-purple-400',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => setWidth(percentage), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [percentage, delay, isVisible]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-bar-fill bg-gradient-to-r ${colorClasses[color]}`}
          style={{ 
            width: `${width}%`,
            transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
