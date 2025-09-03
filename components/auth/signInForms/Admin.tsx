import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { SignInFormValues } from "@/lib/validation/auth/schemas";
import { AlertCircle } from "lucide-react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, View } from "react-native";

type FormValues = SignInFormValues;
type AdminProps = {
  onSubmit: (values: FormValues) => Promise<void>;
};
const Admin = ({ onSubmit }: AdminProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  const passwordInputRef = React.useRef<TextInput>(null);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }
  return (
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
        <Text className="text-sm text-rose-600">{errors.email.message}</Text>
      ) : null}
      <View className="gap-1.5">
        <View className="flex-row items-center">
          <Label htmlFor="password">Password</Label>
          <Button
            variant="link"
            size="sm"
            className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
            onPress={() => {}}
          >
            <Text className="font-normal leading-4">Forgot your password?</Text>
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
    </>
  );
};

export default Admin;
