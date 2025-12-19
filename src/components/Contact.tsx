import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Globe, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';

const Contact = () => {
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

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'aditithakare02@gmail.com',
      href: 'mailto:aditithakare02@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'aditi-thakare-9aa5831b0',
      href: 'https://www.linkedin.com/in/aditi-thakare-9aa5831b0/',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Aditi960',
      href: 'https://github.com/Aditi960',
    },
    {
      icon: Globe,
      label: 'Portfolio',
      value: 'aditithakare.netlify.app',
      href: 'https://aditithakare.netlify.app/',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Contact"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium mb-2">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Let's{' '}
            <span className="gradient-text-gold">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            Looking for a passionate developer to join your team? 
            I'm actively seeking front-end or full-stack internship opportunities.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Pune, Maharashtra, India
          </p>
        </div>

        {/* Two column layout on desktop */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-serif font-semibold mb-6 text-center lg:text-left">
              Send me a message
            </h3>
            <ContactForm />
          </div>

          {/* Contact info & links */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-serif font-semibold mb-6 text-center lg:text-left">
              Or reach out directly
            </h3>
            
            {/* Contact cards */}
            <div className="grid gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group glass rounded-xl p-5 flex items-center gap-4 card-hover"
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="heroPrimary"
                size="lg"
                asChild
                className="flex-1"
              >
                <a href="mailto:aditithakare02@gmail.com">
                  <Mail className="w-5 h-5" />
                  Email Directly
                </a>
              </Button>
          
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="flex-1"
              >
                <a href="/Aditi_Thakare_Resume.pdf" download>
                  <Download className="w-5 h-5" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <p className="text-sm text-muted-foreground">
            Languages: <span className="text-foreground">English, Hindi, Marathi</span>, Japanese (Beginner)
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
