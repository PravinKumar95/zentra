import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface SignUpOptions {
  username?: string;
  company?: string;
}

interface SignUpOptions {
  username?: string;
  company?: string;
}

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  const signout = async () => {
    await supabase.auth.signOut();
  };

  const signin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
  };

  const signup = async (
    email: string,
    password: string,
    options: SignUpOptions
  ) => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options,
      },
    });
  };

  return { signin, signup, signout, session };
}
