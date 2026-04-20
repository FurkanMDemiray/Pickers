import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

const ITEM_HEIGHT = 40;
const heights = Array.from({ length: 70 }, (_, i) => 140 + i);
const screenHeight = Dimensions.get("window").height;

const index = () => {
  const FlatListComponent = () => {
    return (
      <FlatList
        data={heights}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * 3,
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
          const value = heights[index];
          console.log(value);
        }}
        renderItem={({ item }) => {
          const isMajor = item % 5 === 0;

          return (
            <View
              style={{
                height: ITEM_HEIGHT,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Tick */}
              <View
                style={{
                  height: 2,
                  width: isMajor ? 40 : 20,
                  backgroundColor: "#B77A6B",
                  marginRight: 10,
                }}
              />

              {/* Label (only every 5) */}
              {isMajor && (
                <Text
                  style={{
                    fontSize: 16,
                    color: "#B77A6B",
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
          );
        }}
      />
    );
  };

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
        <FlatListComponent />
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
