import React, { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MIN = 30;
const MAX = 200;
const ITEM_W = 60;
const VISIBLE = 5;
const CONTAINER_W = ITEM_W * VISIBLE;

const data = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

const WeightPicker = ({ onChange }: { onChange?: (v: number) => void }) => {
  const [selected, setSelected] = useState(65);
  const listRef = useRef<FlatList>(null);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_W);
    const value = data[index];
    setSelected(value);
    onChange?.(value);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.unit}>kg</Text>
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={data}
          horizontal
          keyExtractor={(item) => String(item)}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_W}
          decelerationRate="fast"
          contentOffset={{ x: (65 - MIN) * ITEM_W, y: 0 }}
          getItemLayout={(_, index) => ({
            length: ITEM_W,
            offset: ITEM_W * index,
            index,
          })}
          onMomentumScrollEnd={onMomentumEnd}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={[styles.num, item === selected && styles.numActive]}>
                {item}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: ITEM_W * 2 }}
        />
        <View style={styles.fadeLeft} pointerEvents="none" />
        <View style={styles.fadeRight} pointerEvents="none" />
      </View>
      <View style={styles.arrow} />
    </View>
  );
};

export default WeightPicker;

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  unit: { fontSize: 13, color: "#B07060" },
  container: { width: CONTAINER_W, height: 72, overflow: "hidden" },
  item: {
    width: ITEM_W,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  num: { fontSize: 22, color: "#C9A09A" },
  numActive: { fontSize: 46, fontWeight: "500", color: "#8C5A50" },
  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: "linear-gradient(to right, #FAF0EE, transparent)" as any,
  },
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: "linear-gradient(to left, #FAF0EE, transparent)" as any,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 13,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#B07060",
  },
});
