import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Login({ onAuth }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await onAuth.signUp(email, password);
        setSignupDone(true);
      } else {
        await onAuth.signIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (signupDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-stone-50 to-purple-50 p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
          <span className="text-5xl">📧</span>
          <h2 className="text-xl font-bold mt-4 text-gray-800">Check your email!</h2>
          <p className="text-gray-500 mt-2 text-sm">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <button onClick={() => { setSignupDone(false); setMode('login'); }}
            className="mt-6 text-indigo-600 font-semibold text-sm hover:underline transition-all duration-200">
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-stone-50 to-purple-50 p-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">

        <div className="text-center mb-6">
          <span className="text-5xl">🧮</span>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">Maths Quests</h1>
          <p className="text-gray-400 text-sm">
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            aria-label="Email address"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm" />
          <input type="password" placeholder="Password (min 6 chars)" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={6}
            aria-label="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm" />

          {error && (
            <p className="text-red-500 text-xs text-center bg-red-50 rounded-lg p-2">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 active:scale-95 transition-all duration-200 disabled:opacity-50">
            {loading ? <Loader2 size={16} className="animate-spin mx-auto"/> : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          {mode === 'login' ? (
            <p>No account? <button onClick={() => { setMode('signup'); setError(''); }}
              className="text-indigo-600 font-semibold hover:underline transition-all duration-200">Sign Up</button></p>
          ) : (
            <p>Already have one? <button onClick={() => { setMode('login'); setError(''); }}
              className="text-indigo-600 font-semibold hover:underline transition-all duration-200">Log In</button></p>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <button onClick={onAuth.skip}
            className="text-gray-400 text-xs hover:text-gray-600 transition-all duration-200">
            Skip for now — continue without account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
