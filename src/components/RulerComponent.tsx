import React, { JSX } from "react";
import { FlatList, Text, View } from "react-native";

const ITEM_HEIGHT = 40;
const heights = Array.from({ length: 70 }, (_, i) => 140 + i);

const RulerComponent = (): JSX.Element => {
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

export default RulerComponent;
