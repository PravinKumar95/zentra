import { useProfile } from "@/api/queries/useProfile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/useAuth";
import * as React from "react";
import { View } from "react-native";

const Settings = () => {
  const { signout } = useAuth();
  const { data: profile, isLoading: loading } = useProfile();

  return (
    <View className="native:pb-12 max-w-lg">
      <Avatar alt="User Avatar" className="h-24 w-24 m-10  mx-auto">
        <AvatarFallback>
          <Text className="text-2xl">
            {profile?.user_name
              ? profile.user_name
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")
              : "U"}
          </Text>
        </AvatarFallback>
      </Avatar>
      <Text className="text-center text-2xl font-bold">
        {profile?.user_name ?? "User"}
      </Text>
      <Text className="text-center text-lg text-muted-foreground">
        {profile?.company ?? (loading ? "Loading..." : "No company set")}
      </Text>
      <Button
        className="m-8 mx-auto w-1/2"
        variant="destructive"
        onPress={signout}
      >
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
};

export default Settings;
