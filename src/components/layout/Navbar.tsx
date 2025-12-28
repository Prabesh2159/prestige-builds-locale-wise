import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Academics', path: '/academics' },
  { name: 'Notices', path: '/notices' },
  { name: 'Admission', path: '/admission' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg"
    >
      <div className="container-school">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + School Name - visible on all screen sizes */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 lg:flex-none">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-secondary-foreground/20 flex-shrink-0">
              <img src="/images/logo1.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            {/* School name - now visible on mobile too */}
            <div className="min-w-0">
              <h1 className="font-heading font-bold text-sm sm:text-lg md:text-xl leading-tight text-primary-foreground truncate">
                Brilliant Sagarmatha
              </h1>
              <p className="text-[10px] sm:text-xs text-primary-foreground/80 truncate">
                English Secondary Boarding School
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-md font-medium transition-all duration-300',
                  location.pathname === link.path
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-3 rounded-md font-medium transition-all duration-300',
                  location.pathname === link.path
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/90 hover:bg-primary-foreground/10'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
