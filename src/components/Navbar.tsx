
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Book, Home, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isAuthenticated = false; // Replace with actual auth state later

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Book className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-semibold">EduAI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/courses' 
                  ? 'text-primary' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Courses
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" variant="default">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="default">
                  Login
                </Button>
              </Link>
            )}
          </nav>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-lg">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/courses" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
            >
              <Book className="h-5 w-5" />
              <span>Courses</span>
            </Link>
            <Link 
              to="/login" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
