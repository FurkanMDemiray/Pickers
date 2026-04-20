import React, { useCallback } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RulerComponentProps {
  /** Array of values to display on the ruler */
  data: number[];

  /** Height of each item row (controls spacing/density) */
  itemHeight?: number;

  /** How often a major tick appears (e.g. every 5 items) */
  majorEvery?: number;

  /** Width of a major tick line */
  majorTickWidth?: number;

  /** Width of a minor tick line */
  minorTickWidth?: number;

  /** Color of ticks and labels */
  tickColor?: string;

  /** Font size of major labels */
  labelFontSize?: number;

  /** Padding multiplier for top/bottom (multiples of itemHeight) */
  paddingMultiplier?: number;

  /** Callback fired when scroll settles on a value */
  onValueChange?: (value: number) => void;

  /** Override style for the outer container */
  containerStyle?: ViewStyle;

  /** Override style for each row */
  rowStyle?: ViewStyle;

  /** Override style for tick line */
  tickStyle?: ViewStyle;

  /** Override style for the label text */
  labelStyle?: TextStyle;

  /** Custom label renderer — replaces default text */
  renderLabel?: (value: number) => React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

const RulerComponent: React.FC<RulerComponentProps> = ({
  data,
  itemHeight = 40,
  majorEvery = 5,
  majorTickWidth = 40,
  minorTickWidth = 20,
  tickColor = "#B77A6B",
  labelFontSize = 16,
  paddingMultiplier = 3,
  onValueChange,
  containerStyle,
  rowStyle,
  tickStyle,
  labelStyle,
  renderLabel,
}) => {
  // ── Scroll handler ──────────────────────────────────────────────────────────
  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
      const value = data[index];
      if (value !== undefined) {
        onValueChange?.(value);
      }
    },
    [data, itemHeight, onValueChange],
  );

  // ── Item renderer ───────────────────────────────────────────────────────────
  const renderItem = useCallback(
    ({ item }: { item: number }) => {
      const isMajor = item % majorEvery === 0;
      const tickWidth = isMajor ? majorTickWidth : minorTickWidth;

      return (
        <View style={[styles.row, { height: itemHeight }, rowStyle]}>
          {/* Tick */}
          <View
            style={[
              styles.tick,
              {
                width: tickWidth,
                backgroundColor: tickColor,
              },
              tickStyle,
            ]}
          />

          {/* Label */}
          {isMajor &&
            (renderLabel ? (
              renderLabel(item)
            ) : (
              <Text
                style={[
                  styles.label,
                  { fontSize: labelFontSize, color: tickColor },
                  labelStyle,
                ]}
              >
                {item}
              </Text>
            ))}
        </View>
      );
    },
    [
      majorEvery,
      majorTickWidth,
      minorTickWidth,
      itemHeight,
      tickColor,
      tickStyle,
      rowStyle,
      labelFontSize,
      labelStyle,
      renderLabel,
    ],
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.toString()}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingVertical: itemHeight * paddingMultiplier,
      }}
      style={containerStyle}
      onMomentumScrollEnd={handleScrollEnd}
      renderItem={renderItem}
    />
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tick: {
    height: 2,
    marginRight: 10,
  },
  label: {
    // base — overridden by props
  },
});

export default RulerComponent;
