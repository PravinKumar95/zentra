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
import { Text } from "@/components/ui/text";
import { AlertCircle } from "lucide-react-native";

import {
  SignUpSchema,
  type SignUpFormValues,
} from "@/lib/validation/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";

type SignUpFormProps = {
  onSignupPress: (
    email: string,
    password: string,
    meta: any
  ) => Promise<void> | void;
  onSigninPress: () => void;
};

export function SignUpForm({ onSignupPress, onSigninPress }: SignUpFormProps) {
  type FormValues = SignUpFormValues;

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { email: "", password: "", username: "", company: "" },
  });

  const passwordInputRef = React.useRef<TextInput>(null);
  const usernameInputRef = React.useRef<TextInput>(null);
  const companyInputRef = React.useRef<TextInput>(null);

  async function onSubmit(values: FormValues) {
    clearErrors("root");
    const meta = {
      username: values.username,
      company: values.company,
      timestamp: Date.now(),
    };
    try {
      await onSignupPress(values.email, values.password, meta);
    } catch (e: any) {
      // put a form-level error into react-hook-form so callers can render it
      setError("root", {
        type: "server",
        message: e?.message ?? "Signup failed",
      });
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Create your account
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                // validation handled by zodResolver(SignUpSchema)
                render={({ field }) => (
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
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
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
              </View>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={() => usernameInputRef.current?.focus()}
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
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="username">User Name</Label>
              </View>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    ref={usernameInputRef}
                    id="username"
                    returnKeyType="next"
                    onSubmitEditing={() => companyInputRef.current?.focus()}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="company">Company Name</Label>
              </View>
              <Controller
                control={control}
                name="company"
                render={({ field }) => (
                  <Input
                    ref={companyInputRef}
                    id="company"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>
            {errors.root?.message ? (
              <Alert icon={AlertCircle} variant="destructive" className="mt-2">
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-sm">Already have an account? </Text>
            <Pressable onPress={onSigninPress}>
              <Text className="text-sm underline underline-offset-4">
                Sign in
              </Text>
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
