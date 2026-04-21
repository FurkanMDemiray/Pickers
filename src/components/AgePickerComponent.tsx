import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, type ListRenderItemInfo } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type AgePickerProps = {
  minAge?: number;
  maxAge?: number;
  initialAge?: number;
  onConfirm?: (age: number) => void;
};

const ITEM_HEIGHT = 52;
const VISIBLE_ROWS = 9;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
const SIDE_PAD = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;
const ARC_RADIUS = 180;
const MAX_DIFF = VISIBLE_ROWS / 2;

const clampValue = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const WheelAgeItem = ({
  age,
  index,
  scrollY,
}: {
  age: number;
  index: number;
  scrollY: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const centerOffset = index * ITEM_HEIGHT - scrollY.value;
    const diff = centerOffset / ITEM_HEIGHT;
    const clampedDiff = Math.max(-MAX_DIFF, Math.min(diff, MAX_DIFF));
    const normalized = clampedDiff / MAX_DIFF;
    // Map visible items to a half-circle arc (-90deg to +90deg).
    const angle = normalized * (Math.PI / 2);
    const absNormalized = Math.abs(normalized);

    const translateX = ARC_RADIUS * (1 - Math.cos(angle));
    const rotateZ = `${(-angle * 180) / Math.PI}deg`;
    const opacity = interpolate(
      absNormalized,
      [0, 0.4, 0.75, 1],
      [1, 0.78, 0.45, 0.2],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      absNormalized,
      [0, 0.5, 1],
      [1, 0.82, 0.62],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateX }, { rotateZ }, { scale }],
    };
  }, []);

  return (
    <View style={styles.itemContainer}>
      <Animated.Text style={[styles.ageLabel, animatedStyle]}>
        {age}
      </Animated.Text>
    </View>
  );
};

export default function AgePickerComponent({
  minAge = 18,
  maxAge = 99,
  initialAge = 28,
  onConfirm,
}: AgePickerProps) {
  const ages = useMemo(
    () => Array.from({ length: maxAge - minAge + 1 }, (_, i) => i + minAge),
    [maxAge, minAge],
  );

  const initialIndex = clampValue(initialAge - minAge, 0, ages.length - 1);
  const [selectedAge, setSelectedAge] = useState(ages[initialIndex]);

  const scrollY = useSharedValue(initialIndex * ITEM_HEIGHT);

  const setSelectedByIndex = useCallback(
    (index: number) => {
      const safeIndex = clampValue(index, 0, ages.length - 1);
      setSelectedAge(ages[safeIndex]);
    },
    [ages],
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumEnd: (event) => {
      const rawIndex = Math.round(event.contentOffset.y / ITEM_HEIGHT);
      const safeIndex = Math.max(0, Math.min(rawIndex, ages.length - 1));
      runOnJS(setSelectedByIndex)(safeIndex);
    },
  });

  const renderItem = ({ item, index }: ListRenderItemInfo<number>) => (
    <WheelAgeItem age={item} index={index} scrollY={scrollY} />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.wheelContainer}>
        <Animated.FlatList
          data={ages}
          keyExtractor={(item) => item.toString()}
          bounces={false}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={initialIndex}
          contentContainerStyle={styles.listContent}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={9}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        <View pointerEvents="none" style={styles.selectionPill}>
          <Text style={styles.selectionText}>{selectedAge}</Text>
          <View style={styles.selectionArrow} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  wheelContainer: {
    width: "100%",
    height: PICKER_HEIGHT,
    justifyContent: "center",
    overflow: "hidden",
  },
  listContent: {
    paddingVertical: SIDE_PAD,
    paddingRight: 46,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  ageLabel: {
    fontSize: 36,
    fontWeight: "700",
    color: "#C18374",
    letterSpacing: 0.4,
  },
  selectionPill: {
    position: "absolute",
    left: 42,
    right: 10,
    height: ITEM_HEIGHT,
    borderRadius: 24,
    backgroundColor: "#F1CFC7",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  selectionText: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "800",
    color: "#B87365",
  },
  selectionArrow: {
    position: "absolute",
    right: 10,
    width: 0,
    height: 0,
    borderTopWidth: 11,
    borderBottomWidth: 11,
    borderLeftWidth: 18,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#B87466",
  },
  confirmButton: {
    width: "88%",
    height: 62,
    borderRadius: 32,
    backgroundColor: "#DDA69A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  confirmText: {
    fontSize: 34 / 2,
    color: "#6B4A45",
    fontWeight: "500",
  },
});
