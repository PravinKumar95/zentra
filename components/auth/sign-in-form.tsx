import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { SignInFormValues, SignInSchema } from "@/lib/validation/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import Admin from "./signInForms/Admin";
import Employee from "./signInForms/Employee";

interface SignInFormProps {
  onSignUpPress: () => void;
  onSignInPress: (
    email: string,
    password: string,
    role: "admin" | "employee"
  ) => Promise<void> | void;
}

type FormValues = SignInFormValues;

export function SignInForm({ onSignUpPress, onSignInPress }: SignInFormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", username: "", password: "" },
  });
  const { setError, clearErrors } = methods;

  const [selectedRole, setSelectedRole] = React.useState<"admin" | "employee">(
    "employee"
  );

  const onSubmit = async (values: any) => {
    clearErrors("root");
    try {
      const identifier =
        (values as any).email ?? (values as any).username ?? "";
      await onSignInPress(identifier, values.password, selectedRole);
    } catch (e: any) {
      setError("root", {
        type: "server",
        message: e?.message ?? "Sign in failed",
      });
    }
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Sign in to your app
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>

          {/* Role tabs */}
          <Tabs
            value={selectedRole}
            onValueChange={(v) => setSelectedRole(v as "admin" | "employee")}
          >
            <TabsList className="mt-4 justify-center sm:justify-start">
              <TabsTrigger value="admin">
                <Text>Admin</Text>
              </TabsTrigger>
              <TabsTrigger value="employee">
                <Text>Employee</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <FormProvider {...methods}>
          <CardContent className="gap-6">
            <View className="gap-6">
              <View className="gap-1.5">
                {selectedRole === "employee" ? (
                  <Employee onSubmit={onSubmit} />
                ) : (
                  <Admin onSubmit={onSubmit} />
                )}
              </View>
            </View>
          </CardContent>
        </FormProvider>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-sm">Don&apos;t have an account? </Text>
          <Pressable onPress={onSignUpPress}>
            <Text className="text-sm underline underline-offset-4">
              Sign up
            </Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
}
