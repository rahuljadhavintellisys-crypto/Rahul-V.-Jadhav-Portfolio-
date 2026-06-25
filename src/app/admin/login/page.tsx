'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Incorrect credentials.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login attempt failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-grid flex flex-col items-center justify-center p-4">
      
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-primary dark:hover:text-secondary mb-6 transition-colors self-center"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Headquarters
      </Link>

      <div className="w-full max-w-sm bg-card border border-border/80 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative blue-glow">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="h-10 w-10 bg-secondary/15 text-secondary border border-secondary/20 rounded mx-auto flex items-center justify-center">
            <Key className="h-5 w-5" />
          </div>
          <h1 className="font-heading font-extrabold text-xl text-foreground">
            Executive Admin Console
          </h1>
          <p className="text-xs text-muted">
            Authenticate to modify portfolio content & view inquiries
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-xs font-bold text-muted uppercase mb-1.5">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-muted uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
            />
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded flex items-center gap-2.5 text-xs">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3 px-4 rounded text-sm hover:opacity-95 transition-all cursor-pointer focus:outline-none disabled:opacity-75"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <span className="text-[10px] text-muted font-bold block uppercase">
            Rahul V. Jadhav Brand Console
          </span>
        </div>

      </div>

    </div>
  );
}
