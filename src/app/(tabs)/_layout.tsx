import { NativeTabs } from "expo-router/build/native-tabs";

export default function RootLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Height</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="height" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="heightPicker">
        <NativeTabs.Trigger.Label>Weight</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="weight" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="agePicker">
        <NativeTabs.Trigger.Label>Age</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
