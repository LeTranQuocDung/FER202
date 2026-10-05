'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    const eError = validateEmail(email);
    const pError = validatePassword(password);
    
    setEmailError(eError);
    setPasswordError(pError);
    
    if (!eError && !pError) {
      const { error } = await signIn({ email, password });
      if (error) {
        setAuthError(error.message);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authError && (
            <div data-testid="error-auth" className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium">
              {authError}
            </div>
          )}
          <form data-testid="login-form" noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                data-testid="login-email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(validateEmail(e.target.value));
                }}
                className={emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {emailError && <p data-testid="error-email" className="text-sm font-medium text-red-500">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                data-testid="login-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(validatePassword(e.target.value));
                }}
                className={passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {passwordError && <p data-testid="error-password" className="text-sm font-medium text-red-500">{passwordError}</p>}
            </div>
            <Button type="submit" data-testid="login-submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Register
            </Link>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            <Link href="/" className="text-primary hover:underline font-medium">
              Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
