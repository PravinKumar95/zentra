import { SignInForm } from "@/components/sign-in-form";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive"
    >
      <View className="w-full max-w-sm my-auto">
        <SignInForm
          onSignInPress={() => {}}
          onSignUpPress={() => router.replace("/signup")}
        />
      </View>
    </ScrollView>
  );
}
