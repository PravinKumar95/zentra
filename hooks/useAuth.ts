import { friendlyAuthMessage } from "@/lib/auth/errorMessages";
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
    if (error) throw new Error(friendlyAuthMessage(error.message));
  };

  const signup = async (
    email: string,
    password: string,
    options: SignUpOptions
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options,
        },
      });
      if (error) throw new Error(friendlyAuthMessage(error.message));
      return data;
    } catch (err: any) {
      // Re-throw so callers (forms) can catch and render the message
      throw new Error(err?.message ?? "Signup failed");
    }
  };

  return { signin, signup, signout, session };
}
