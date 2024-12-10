import styled from 'styled-components/native';
import { Animated, Pressable } from 'react-native';
import { useRef, useState } from 'react';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function Home() {
  const [up, setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  const toggleUp = () => setUp(prev => !prev);
  const moveUp = () => {
    Animated.timing(POSITION.y, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
    }).start(toggleUp);
  };
  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['-360deg', '360deg'],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['rgb(255,99,71)', 'rgb(71,166,255)'],
  });
  POSITION.y.addListener(() => console.log(bgColor));
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [{ rotateY: rotation }, { translateY: POSITION.y }],
          }}
        />
      </Pressable>
    </Container>
  );
}
