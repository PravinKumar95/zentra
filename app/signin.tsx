import { SignInForm } from "@/components/sign-in-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const { signin } = useAuth();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="flex-1 justify-center items-center p-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive"
    >
      <View className="w-full max-w-sm mx-auto">
        <View className="items-center mb-8">
          <Text className="text-4xl font-extrabold tracking-tight text-primary">
            Zentra
          </Text>
        </View>
        <SignInForm
          onSignInPress={(email, password) => {
            signin(email, password);
          }}
          onSignUpPress={() => router.replace("/signup")}
        />
      </View>
    </ScrollView>
  );
}
