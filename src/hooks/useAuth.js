import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { identify, reset as phReset } from '../lib/posthog';
import { track } from '../lib/track';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!supabase);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    if (!supabase) { return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase?.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (_event === 'PASSWORD_RECOVERY') {
          setIsRecovery(true);
        } else if (_event === 'SIGNED_IN' && !isRecovery) {
          setIsRecovery(false);
        }
        if (u) identify(u.id, { email: u.email });
        else phReset();
      }
    ) || { data: {} };

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    track('signup_complete', { method: 'email' });
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    setIsRecovery(false);
  };

  return { user, loading, isRecovery, signUp, signIn, signOut, resetPassword, updatePassword };
}
