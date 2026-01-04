import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Admin Login Page
 * 
 * BACKEND INTEGRATION NOTES:
 * ==========================
 * This page handles admin authentication.
 * 
 * TODO: Backend integration points:
 * - Form submission calls auth context which will call API
 * - Add CSRF protection
 * - Implement rate limiting UI feedback
 * - Add "Forgot Password" functionality
 */

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, login } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast({ 
        title: 'Welcome!', 
        description: 'You have logged in successfully.' 
      });
      navigate('/admin');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563EB]/5 via-background to-[#2563EB]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#2563EB] flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">
            Brilliant Sagarmatha English Secondary Boarding School
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-card rounded-xl p-8 shadow-xl border border-border"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@school.edu.np"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 pl-10 pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In to Dashboard'}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Authorized personnel only
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
