import AgePicker from "@/components/AgePickerComponent";
import React from "react";
import { StyleSheet, View } from "react-native";

const ages = Array.from({ length: 100 }, (_, i) => i + 1);

const agePicker = () => {
  return (
    <View style={styles.container}>
      {/* <WheelPicker
        dataSource={ages}
        selectedIndex={27}
        onValueChange={(data, index) => console.log(data)}
      /> */}
      <AgePicker initialAge={28} onConfirm={(age) => console.log(age)} />
    </View>
  );
};

export default agePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
