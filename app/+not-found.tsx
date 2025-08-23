import { Button } from "@/components/ui/button";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: "404 Not Found" }} />
      <View className="flex-1 justify-center items-center bg-background p-4">
        <Text className="text-3xl font-bold mb-2 text-center">404</Text>
        <Text className="text-lg mb-6 text-center">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Button onPress={() => router.replace("/signin")}>
          <Text>Go Home</Text>
        </Button>
      </View>
    </>
  );
}
