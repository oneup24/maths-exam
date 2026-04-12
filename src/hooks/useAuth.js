import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { identify, reset as phReset } from '../lib/posthog';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!supabase);

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
        if (u) identify(u.id, { email: u.email });
        else phReset();
      }
    ) || { data: {} };

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
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

  return { user, loading, signUp, signIn, signOut };
}
