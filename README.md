# Pickers R&D (React Native + Expo)

This project is an R&D playground for building mobile pickers.

Main finding:
- There are very limited ready-made libraries for **weight picker**, **age picker**, and highly **customizable picker** use cases.
- `react-native-ruler-picker` works for ruler-style interaction.
- The most flexible and future-proof approach is building custom pickers with **`react-native-reanimated` + `FlatList`**.

## Project Goal

- Research picker UX patterns for health/body inputs.
- Build reusable picker components for `height`, `weight`, and `age`.
- Keep UI smooth with 60 FPS scroll/animation behavior.

## Current Idea

Use this architecture:
- **Data layer:** generate picker items (numbers, units, labels).
- **Scroll layer:** `FlatList` with snapping (`snapToInterval`) and center alignment.
- **Animation layer:** `react-native-reanimated` for active-item scale/opacity/parallax.
- **Selection layer:** derive selected value from scroll offset and item height.

## Picker Types (Short Notes)

- **Height picker**
  - Supports `cm` and optionally `ft/in`.
  - Usually range: `100-230 cm`.
  - Can be one wheel (cm) or two wheels (ft + in).
  - There is one library for this one "react-native-ruler-picker". It is not customizable.

- **Weight picker**

  - Supports `kg` and optionally `lb`.
  - Usually range: `30-250 kg`.
  - Can include decimals (e.g. `70.5 kg`) if needed.

- **Age picker**
  - Numeric age selection (e.g. `1-100`).
  - Simple wheel/ruler UI is enough.
  - Optional validation for app-specific min/max age.

## How to Build Them (Short)

- Define `ITEM_HEIGHT`, center indicator position, and value range.
- Render values in `FlatList` with top/bottom spacer items so center selection works.
- Use `onScroll` + Reanimated shared value to track scroll offset.
- Convert `offsetY` to selected index with `Math.round(offsetY / ITEM_HEIGHT)`.
- Highlight center item using animated styles (scale, opacity, color).
- Snap accurately with `snapToInterval={ITEM_HEIGHT}` and `decelerationRate="fast"`.
- Expose `value` + `onChange` props to make picker components reusable.

## Suggested Reusable API

Each picker component can share a common API:
- `min`, `max`, `step`
- `unit` (`cm`, `kg`, `lb`, etc.)
- `initialValue`
- `onValueChange(value)`
- `labelFormatter(value)`

This keeps all pickers consistent while still allowing custom behavior.

## Run the Project

```bash
npm install
npx expo start
```

## Why Reanimated + FlatList

- Full control over visuals and interaction.
- Easy to customize for different product styles.
- Better long-term maintainability than relying on limited third-party picker packages.


## 📺 Implementation Previews

| HeightPicker | WeightPicker | AgePicker |
| :---: | :---: |  :---: |
| <video src="https://github.com/user-attachments/assets/89365ea5-7ab3-4aea-accc-f8a4f7b00d9d" controls></video>  | <video src="https://github.com/user-attachments/assets/42a853fe-6ea1-4b75-9b2c-9a1210748ff9" controls></video> | <video src="https://github.com/user-attachments/assets/45c0328d-a36d-4727-8b46-d8ff6726bcd1" controls></video> |

---


