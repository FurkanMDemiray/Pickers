import RulerComponent from "@/components/RulerComponent";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

const screenHeight = Dimensions.get("window").height;
const heights = Array.from({ length: 71 }, (_, i) => 140 + i);

const index = () => {
  const [selectedHeight, setSelectedHeight] = useState(140);
  const setHeight = (height: number) => {
    setSelectedHeight(height);
  };

  return (
    <View style={styles.container}>
      <Text> RulerPicker Lib</Text>
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
          height: 1,
          backgroundColor: "black",
          marginTop: 20,
          marginBottom: 20,
          width: "100%",
        }}
      />
      <Text>Custom RulerComponent</Text>
      <View
        style={{
          marginTop: 20,
          height: screenHeight / 3,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RulerComponent
            data={heights}
            itemHeight={30}
            majorEvery={5}
            tickColor="#3A7CA5"
            onValueChange={(val) => setHeight(val)}
            renderLabel={(val) => (
              <Text style={{ color: "navy" }}>{val} cm</Text>
            )}
          ></RulerComponent>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 26, fontWeight: "bold" }}
          >
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
