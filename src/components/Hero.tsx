import { Mail, FolderOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypeWriter from './TypeWriter';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-10" />
      
      {/* Decorative geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float delay-300" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/10 blur-2xl animate-float delay-500" />

      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Greeting */}
        <p className="text-primary font-medium text-lg mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          Hello, I'm
        </p>
        
        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
          <span className="text-foreground">Aditi </span>
          <span className="gradient-text text-glow">Thakare</span>
        </h1>

        {/* Dynamic typing headline */}
        <div className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 h-12 opacity-0 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <TypeWriter
            words={[
              'Web Developer',
              'Front-End Developer',
              'Full-Stack Enthusiast',
              'Problem Solver',
              'Creative Coder',
            ]}
            typeSpeed={80}
            deleteSpeed={40}
            delayBetweenWords={2500}
            className="font-medium"
          />
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '800ms' }}>
          BCA student passionate about crafting{' '}
          <span className="text-primary">beautiful interfaces</span> and{' '}
          <span className="text-secondary">robust applications</span>. 
          Turning ideas into elegant digital experiences.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '1000ms' }}>
          <Button
            variant="hero"
            size="xl"
            asChild
            aria-label="Send email to hire Aditi"
          >
            <a href="mailto:aditithakare02@gmail.com">
              <Mail className="w-5 h-5" />
              Hire Me
            </a>
          </Button>
          
          <Button
            variant="heroPrimary"
            size="xl"
            onClick={scrollToProjects}
            aria-label="View projects section"
          >
            <FolderOpen className="w-5 h-5" />
            View Projects
          </Button>
          
          <Button
            variant="heroOutline"
            size="xl"
            asChild
            aria-label="Download resume PDF"
          >
            <a href="/Aditi_Thakare_Resume.pdf" download>
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </Button>
        </div>

        {/* Secondary CTA */}
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '1200ms' }}>
          <Button
            variant="glass"
            size="lg"
            asChild
            className="group"
            aria-label="View SkillBuddy demo in new tab"
          >
            <a href="https://skillbuddy0.netlify.app/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Check out SkillBuddy Demo
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up" style={{ animationDelay: '1400ms' }}>
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to projects"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center">
              <div className="w-1.5 h-3 bg-current rounded-full mt-2 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
