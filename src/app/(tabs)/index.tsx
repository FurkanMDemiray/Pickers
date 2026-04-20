import RulerComponent from "@/components/RulerComponent";
import { Dimensions, StyleSheet, View } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

const screenHeight = Dimensions.get("window").height;

const index = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, height: screenHeight / 3 }}>
        <RulerPicker
          min={140}
          max={210}
          step={1}
          initialValue={160}
          unit="kg"
        />
      </View>
      <View style={{ marginTop: 20, height: screenHeight / 3 }}>
        <RulerComponent />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
