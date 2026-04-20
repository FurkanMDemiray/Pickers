import RulerComponent from "@/components/RulerComponent";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

const screenHeight = Dimensions.get("window").height;
const heights = Array.from({ length: 100 }, (_, i) => 100 + i);

const index = () => {
  const [selectedHeight, setSelectedHeight] = useState(100);
  const setHeight = (height: number) => {
    setSelectedHeight(height);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, height: screenHeight / 3 }}>
        <RulerPicker
          min={140}
          max={210}
          step={1}
          initialValue={160}
          unit="cm"
        />
      </View>
      <View
        style={{
          marginTop: 20,
          height: screenHeight / 3,
          flexDirection: "column",
        }}
      >
        <RulerComponent
          data={heights}
          itemHeight={30}
          majorEvery={5}
          tickColor="#3A7CA5"
          onValueChange={(val) => setHeight(val)}
          renderLabel={(val) => <Text style={{ color: "navy" }}>{val} cm</Text>}
        ></RulerComponent>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 26 }}>
            {selectedHeight.toFixed(1)}
          </Text>
        </View>
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
