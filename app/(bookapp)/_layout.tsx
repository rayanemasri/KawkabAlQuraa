import { Stack } from "expo-router";

export default function BooKLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "كوكب القراء" }} />
      <Stack.Screen
        name="bookdetails"
        options={{ title: "معلومات عن الكتاب" }}
      />
      <Stack.Screen name='reserve'
      options={{ title: "معلومات عن الحجز" }}
      />
    </Stack>
  );
}
