import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

type Profile = { user_name?: string; company?: string } | null;

async function fetchProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_name, company")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data as Profile;
}

export function useProfile(): UseQueryResult<Profile> {
  const { session } = useAuth();
  const userId = session?.user?.id;
  return useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: async () => fetchProfile(userId as string),
    enabled: !!userId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
