import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title:"تسجيل", headerShown:false }} />
      <Stack.Screen name="signup" options={{ title:"انشاء حساب", headerShown:false }} />
    </Stack>
  );
}
