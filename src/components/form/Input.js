// src/components/Input.js
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  labelStyle,
  inputStyle,
  ...rest
}) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#ffffff99" // branco suave
        secureTextEntry={secureTextEntry}
        style={[styles.input, inputStyle]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    color: '#fff',   // ← agora a label é branca
    marginBottom: 6,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#1e293b',  // azul escuro igual sua tela
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    color: '#fff',               // texto branco
  },
});
