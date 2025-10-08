import React, { useEffect, useRef } from "react";
import { Dimensions, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Wave({ height = 160 }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const d1 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "M0,120 C360,180 1080,60 1440,120 L1440,320 L0,320 Z",
      "M0,140 C360,100 1080,200 1440,140 L1440,320 L0,320 Z",
      "M0,120 C360,180 1080,60 1440,120 L1440,320 L0,320 Z",
    ],
  });

  const d2 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "M0,160 C360,220 1080,100 1440,160 L1440,320 L0,320 Z",
      "M0,180 C360,140 1080,200 1440,180 L1440,320 L0,320 Z",
      "M0,160 C360,220 1080,100 1440,160 L1440,320 L0,320 Z",
    ],
  });

  return (
    <Svg
      width={SCREEN_WIDTH}
      height={height}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      style={{ position: "absolute", bottom: 0 }}
    >
      <AnimatedPath fill="#ffffff" fillOpacity={0.6} d={d1} />
      <AnimatedPath fill="#ffffff" fillOpacity={0.4} d={d2} />
    </Svg>
  );
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
