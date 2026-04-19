import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Login({ onAuth, lang = 'zh' }) {
  // modes: 'login' | 'signup' | 'forgot' | 'update'
  const [mode, setMode] = useState(onAuth.isRecovery ? 'update' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const zh = lang === 'zh';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await onAuth.signUp(email, password);
        setSignupDone(true);
      } else if (mode === 'login') {
        await onAuth.signIn(email, password);
      } else if (mode === 'forgot') {
        await onAuth.resetPassword(email);
        setResetSent(true);
      } else if (mode === 'update') {
        await onAuth.updatePassword(password);
        setPasswordUpdated(true);
        setTimeout(() => { setPasswordUpdated(false); setMode('login'); }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (signupDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
          <span className="text-5xl">📧</span>
          <h2 className="text-xl font-bold mt-4 text-gray-800">Check your email!</h2>
          <p className="text-gray-500 mt-2 text-sm">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <button onClick={() => { setSignupDone(false); setMode('login'); }}
            className="mt-6 text-orange-600 font-semibold text-sm hover:underline transition-all duration-200">
            {zh ? '返回登入' : 'Back to Login'}
          </button>
        </motion.div>
      </div>
    );
  }

  if (resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
          <span className="text-5xl">📬</span>
          <h2 className="text-xl font-bold mt-4 text-gray-800">
            {zh ? '重設連結已發送' : 'Reset link sent'}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {zh ? `重設連結已發送至 ` : `Check `}<strong>{email}</strong>
            {zh ? `，請查看電郵。` : ` for the reset link.`}
          </p>
          <button onClick={() => { setResetSent(false); setMode('login'); }}
            className="mt-6 text-orange-600 font-semibold text-sm hover:underline transition-all duration-200">
            {zh ? '返回登入' : 'Back to Login'}
          </button>
        </motion.div>
      </div>
    );
  }

  const titles = {
    login:  zh ? '歡迎回來！' : 'Welcome back!',
    signup: zh ? '建立帳戶' : 'Create your account',
    forgot: zh ? '忘記密碼' : 'Forgot Password',
    update: zh ? '設定新密碼' : 'Set New Password',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">

        <div className="text-center mb-6">
          <img src="/mascot.webp" alt="Curlboo" className="w-20 h-20 object-cover rounded-2xl mx-auto shadow-md"/>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">Maths Quests</h1>
          <p className="text-gray-400 text-sm">{titles[mode]}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode !== 'update' && (
            <input type="email" placeholder={zh ? '電郵地址' : 'Email'} value={email}
              onChange={e => setEmail(e.target.value)} required
              aria-label="Email address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
          )}

          {(mode === 'login' || mode === 'signup' || mode === 'update') && (
            <input type="password"
              placeholder={mode === 'update'
                ? (zh ? '新密碼（至少6位）' : 'New password (min 6 chars)')
                : (zh ? '密碼（至少6位）' : 'Password (min 6 chars)')}
              value={password}
              onChange={e => setPassword(e.target.value)} required minLength={6}
              aria-label="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => { setMode('forgot'); setError(''); }}
                className="text-xs text-orange-500 hover:underline transition-all duration-200">
                {zh ? '忘記密碼？' : 'Forgot password?'}
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-xs text-center bg-red-50 rounded-lg p-2">{error}</p>
          )}

          {passwordUpdated && (
            <p className="text-emerald-600 text-xs text-center bg-emerald-50 rounded-lg p-2">
              {zh ? '密碼已更新，請重新登入' : 'Password updated — please log in'}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 active:scale-95 transition-all duration-200 disabled:opacity-50">
            {loading ? <Loader2 size={16} className="animate-spin mx-auto"/> : (
              mode === 'login'  ? (zh ? '登入' : 'Log In') :
              mode === 'signup' ? (zh ? '建立帳戶' : 'Sign Up') :
              mode === 'forgot' ? (zh ? '發送重設連結' : 'Send Reset Link') :
                                  (zh ? '設定新密碼' : 'Set New Password')
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          {mode === 'login' && (
            <p>{zh ? '沒有帳戶？' : 'No account?'}{' '}
              <button onClick={() => { setMode('signup'); setError(''); }}
                className="text-orange-600 font-semibold hover:underline transition-all duration-200">
                {zh ? '立即註冊' : 'Sign Up'}
              </button>
            </p>
          )}
          {(mode === 'signup' || mode === 'forgot') && (
            <p>
              <button onClick={() => { setMode('login'); setError(''); }}
                className="text-orange-600 font-semibold hover:underline transition-all duration-200">
                {zh ? '返回登入' : 'Back to Login'}
              </button>
            </p>
          )}
        </div>

        {(mode === 'login' || mode === 'signup') && (
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <button onClick={onAuth.skip}
              className="text-gray-400 text-xs hover:text-gray-600 transition-all duration-200">
              {zh ? '先跳過 — 以訪客身份繼續' : 'Skip for now — continue without account'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
