
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, GraduationCap, Code } from 'lucide-react';

const Hero = () => {
  const featureRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      featureRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent z-0" aria-hidden="true" />
      
      {/* Hero content */}
      <div className="relative pt-32 pb-24 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              The Future of Learning is Here
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-down">
              Learn with the Power of <span className="text-primary">AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in">
              Personalized learning experiences powered by advanced AI. Master computer science concepts with adaptive curricula that evolve as you learn.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 animate-fade-in">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div 
              ref={el => el && (featureRefs.current[0] = el)} 
              className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm opacity-0 transition-all duration-500 delay-100"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-foreground/80">
                Our AI analyzes your learning pace and adapts curriculum to maximize your progress and understanding.
              </p>
            </div>
            
            <div 
              ref={el => el && (featureRefs.current[1] = el)} 
              className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm opacity-0 transition-all duration-500 delay-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Tutoring</h3>
              <p className="text-foreground/80">
                Choose between human tutors or AI assistance that uses interactive whiteboards and voice instruction.
              </p>
            </div>
            
            <div 
              ref={el => el && (featureRefs.current[2] = el)} 
              className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm opacity-0 transition-all duration-500 delay-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Analysis</h3>
              <p className="text-foreground/80">
                Get real-time feedback on your code with our AI analyzer that identifies issues and suggests improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
