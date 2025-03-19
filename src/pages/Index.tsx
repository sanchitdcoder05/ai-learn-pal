
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Code, FileQuestion, TestTube } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      {/* Features section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Revolutionize Your Learning Experience</h2>
            <p className="text-lg text-foreground/80">
              Our platform combines cutting-edge AI technology with expert educational content to deliver a personalized learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={BookOpen}
              title="AI-Curated Courses"
              description="Computer science courses designed by experts and personalized by AI for your unique learning style."
            />
            <FeatureCard 
              icon={Brain}
              title="Adaptive Learning"
              description="Our AI analyzes your progress and adapts content to match your pace, ensuring optimal comprehension."
            />
            <FeatureCard 
              icon={FileQuestion}
              title="AI Doubt Solver"
              description="Get instant solutions to your questions with our AI-powered doubt resolution system."
            />
            <FeatureCard 
              icon={Code}
              title="Code Analysis"
              description="Real-time feedback on your code with intelligent suggestions for improvement."
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/courses">
              <Button size="lg">
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* AI Test section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-primary/10 inline-block rounded-full px-3 py-1 text-sm font-medium text-primary mb-6">
                  Test Your Knowledge
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Generate Custom Tests with AI
                </h2>
                <p className="text-lg text-foreground/80 mb-6">
                  Our AI test generator creates personalized assessments based on your learning progress. 
                  Get instant feedback and focus on areas that need improvement.
                </p>
                <Link to="/login">
                  <Button className="flex items-center">
                    <TestTube className="mr-2 h-4 w-4" />
                    Try AI Test Generator
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg border border-border p-6 transition-all duration-300 hover:shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TestTube className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI-Generated Test</h4>
                      <p className="text-sm text-foreground/80">
                        Enter any computer science topic to generate a customized test.
                      </p>
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Sample question:</p>
                        <p className="text-sm mt-1">
                          What is the time complexity of the quicksort algorithm in the worst case?
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm">
                            <div className="w-4 h-4 rounded-full border border-input mr-2"></div>
                            <span>O(n)</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="w-4 h-4 rounded-full border border-input mr-2"></div>
                            <span>O(n log n)</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="w-4 h-4 rounded-full border border-input mr-2"></div>
                            <span>O(n²)</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="w-4 h-4 rounded-full border border-input mr-2"></div>
                            <span>O(1)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are accelerating their learning with our AI-powered platform. Get started today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-semibold ml-2">EduAI</span>
              </div>
              <p className="text-foreground/70 max-w-md">
                Revolutionizing education with AI-powered personalized learning experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Courses</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40">
            <p className="text-center text-foreground/60 text-sm">
              © {new Date().getFullYear()} EduAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
