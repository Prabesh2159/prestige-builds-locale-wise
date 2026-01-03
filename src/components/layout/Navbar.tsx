import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container-school">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo + School Name */}
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0">
              <img
                src="/images/logo1.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="font-heading font-bold text-sm sm:text-lg md:text-xl truncate text-foreground">
                Brilliant Sagarmatha
              </h1>
              <p className="text-[10px] sm:text-xs truncate text-muted-foreground">
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
                  'px-4 py-2 rounded-md font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
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
            className="lg:hidden text-foreground hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-3 rounded-md font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
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
