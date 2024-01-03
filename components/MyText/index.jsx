import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';

const MyText = ({ text, style, onPress, }) => {
  const textStyle = {
    // Default styles can be added here
    fontSize: 16,
    color: 'black',
    // Merge the default styles with the provided styles
    ...style,
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return <Text style={textStyle}>{text}</Text>;
};

export default MyText;
