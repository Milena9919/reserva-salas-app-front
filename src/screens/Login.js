import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email === 'admin' && senha === '123') {
      navigation.replace('AdminMain');
    } else if (email === 'usuario' && senha === '123') {
      navigation.replace('UserMain');
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Círculos decorativos */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      {/* Logo */}
      <Image 
        source={require('../../assets/images/logo.jpeg')} 
        style={styles.logo} 
      />

      {/* Texto de boas-vindas */}
      <Text style={styles.welcome}>Bem-vindo de volta</Text>
      <Text style={styles.subtitle}>Acesse sua conta para gerenciar as reservas</Text>

      {/* Inputs estilo linha */}
      <TextInput
        placeholder="Digite seu email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>
        Esqueceu a senha? <Text style={styles.link}>Redefinir</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1B30',
    paddingHorizontal: 20,
  },

  /** Decorações circulares como no print */
  circleTop: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: '#1C3B70',
    top: -120,
    left: -80,
    opacity: 0.4,
  },
  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    bottom: -100,
    right: -60,
    opacity: 0.35,
  },

  logo: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 70,
    marginBottom: 10,
  },

  welcome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitle: {
    color: '#d0d0d0',
    fontSize: 14,
    marginBottom: 30,
  },

  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#6AA9E9',
    color: '#fff',
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  forgotPassword: {
    marginTop: 15,
    color: '#ccc',
  },

  link: {
    color: '#6AA9E9',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
