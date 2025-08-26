import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import {
  SignInSchema,
  type SignInFormValues,
} from "@/lib/validation/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react-native";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View, type TextInput } from "react-native";

interface SignInFormProps {
  onSignUpPress: () => void;
  onSignInPress: (
    email: string,
    password: string,
    role: "admin" | "employee"
  ) => Promise<void> | void;
}

export function SignInForm({ onSignUpPress, onSignInPress }: SignInFormProps) {
  type FormValues = SignInFormValues;
  const [selectedRole, setSelectedRole] = React.useState<"admin" | "employee">(
    "employee"
  );
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", username: "", password: "" },
  });

  const passwordInputRef = React.useRef<TextInput>(null);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  async function onSubmit(values: FormValues) {
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
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <View className="items-center mb-4">
            <View className="h-12 w-12 rounded-full bg-rose-50 items-center justify-center">
              <AlertCircle color="#dc2626" size={20} />
            </View>
          </View>
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
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              {selectedRole === "employee" ? (
                <>
                  <Label htmlFor="username">User name</Label>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <Input
                        id="username"
                        placeholder="username"
                        autoCapitalize="none"
                        returnKeyType="next"
                        submitBehavior="submit"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                      />
                    )}
                  />
                  {errors.username ? (
                    <Text className="text-sm text-rose-600">
                      {errors.username.message}
                    </Text>
                  ) : null}
                </>
              ) : (
                <>
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        id="email"
                        placeholder="m@example.com"
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCapitalize="none"
                        onSubmitEditing={onEmailSubmitEditing}
                        returnKeyType="next"
                        submitBehavior="submit"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                      />
                    )}
                  />
                  {errors.email ? (
                    <Text className="text-sm text-rose-600">
                      {errors.email.message}
                    </Text>
                  ) : null}
                </>
              )}
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {}}
                >
                  <Text className="font-normal leading-4">
                    Forgot your password?
                  </Text>
                </Button>
              </View>
              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.password ? (
                <Text className="text-sm text-rose-600">
                  {errors.password.message}
                </Text>
              ) : null}
            </View>
            {errors.root?.message ? (
              <Alert icon={AlertCircle} variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            ) : null}
            <Button
              className="w-full"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            >
              <Text>{isSubmitting ? "Continuing..." : "Continue"}</Text>
            </Button>
          </View>
          {selectedRole !== "employee" ? (
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
          ) : null}
        </CardContent>
      </Card>
    </View>
  );
}
