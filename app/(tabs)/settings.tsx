import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/useAuth";
import { View } from "react-native";

const Settings = () => {
  const { signout } = useAuth();
  return (
    <View className="native:pb-12 max-w-lg">
      <Text variant="h2">Profile</Text>
      <Button className="mt-4" variant="destructive" onPress={signout}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
};

export default Settings;
