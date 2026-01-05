import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Lock, AlertCircle, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added for UX
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 600)); // Slightly longer for "thinking" feel

    const result = login(username, password);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error || 'Invalid credentials. Please check your username and password.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex flex-col items-center justify-center p-4">
      {/* Quick Back Button for better UX than just Esc key */}
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Website
      </Button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-transparent flex items-center justify-center mb-4 shadow-xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            {/* <GraduationCap className="w-10 h-10 text-primary-foreground" /> */}
            <img src="/images/logo1.png" alt="" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Brilliant Sagarmatha English Secondary Boarding School
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message with Animation-like feel */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm animate-in fade-in zoom-in duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="username"
                  type="text"
                  required
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 pl-10 bg-background/50 focus-visible:ring-primary"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-10 bg-background/50 focus-visible:ring-primary"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>

          {/* Accessibility Hint */}
          <div className="mt-8 pt-4 border-t border-border/50">
            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest">
              Security Notice
            </p>
            <p className="text-center text-[10px] text-muted-foreground/60 mt-2">
              Unauthorized access to this management system is strictly monitored and logged.
            </p>
          </div>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-8">
          Press <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono shadow-sm">Esc</kbd> to exit
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;