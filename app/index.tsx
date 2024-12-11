import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled.View`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function Home() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
  });
  // Animations
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const getCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -320) {
          console.log('dismiss to the left');
          Animated.spring(position, { toValue: -500, useNativeDriver: true }).start();
        } else if (dx > 320) {
          console.log('dismiss to the right');
          Animated.spring(position, { toValue: 500, useNativeDriver: true }).start();
        } else {
          Animated.parallel([onPressOut, getCenter]).start();
        }
      },
    }),
  ).current;

  return (
    <Container>
      <AnimatedCard
        {...panResponder.panHandlers}
        style={{
          transform: [{ scale }, { translateX: position }, { rotateZ: rotation }],
        }}>
        <Ionicons name={'pizza'} color="192a56" size={98} />
      </AnimatedCard>
    </Container>
  );
}
