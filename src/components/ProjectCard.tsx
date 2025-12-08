import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  isLive?: boolean;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  isLive = false,
  featured = false,
}: ProjectCardProps) => {
  return (
    <article
      className={`group relative glass rounded-2xl p-6 card-hover ${
        featured ? 'ring-2 ring-primary/30' : ''
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 left-6">
          <Badge className="bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground border-0 shadow-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live
          </span>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors pr-16">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs border-border/50 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="glassAccent"
            size="sm"
            asChild
            className="flex-1"
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
          
          {liveUrl && (
            <Button
              variant="default"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
};

export default ProjectCard;
