'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateName = (name: string) => {
    if (!name.trim()) return 'Full name is required';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (confirmPass: string, pass: string) => {
    if (!confirmPass) return 'Confirm password is required';
    if (confirmPass !== pass) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccess(false);
    
    const nError = validateName(name);
    const eError = validateEmail(email);
    const pError = validatePassword(password);
    const cpError = validateConfirmPassword(confirmPassword, password);
    
    setNameError(nError);
    setEmailError(eError);
    setPasswordError(pError);
    setConfirmPasswordError(cpError);
    
    if (!nError && !eError && !pError && !cpError) {
      const { error } = await signUp({ email, password });
      if (error) {
        setAuthError(error.message);
      } else {
        setSuccess(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div data-testid="form-success" className="mb-4 p-3 rounded-md bg-green-50 text-green-600 text-sm font-medium">
              Registration successful
            </div>
          )}
          {authError && (
            <div data-testid="error-auth" className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium">
              {authError}
            </div>
          )}
          <form data-testid="register-form" noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                data-testid="register-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError(validateName(e.target.value));
                }}
                className={nameError ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {nameError && <p data-testid="error-name" className="text-sm font-medium text-red-500">{nameError}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                data-testid="register-email"
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
                data-testid="register-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(validatePassword(e.target.value));
                  if (confirmPasswordError) setConfirmPasswordError(validateConfirmPassword(confirmPassword, e.target.value));
                }}
                className={passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {passwordError && <p data-testid="error-password" className="text-sm font-medium text-red-500">{passwordError}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                data-testid="register-confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError(validateConfirmPassword(e.target.value, password));
                }}
                className={confirmPasswordError ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {confirmPasswordError && <p data-testid="error-confirm-password" className="text-sm font-medium text-red-500">{confirmPasswordError}</p>}
            </div>
            
            <Button type="submit" data-testid="register-submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login
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
