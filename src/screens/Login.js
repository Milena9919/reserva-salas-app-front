import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
  if (email === 'admin' && senha === '123') {
    navigation.replace('AdminMain'); // Direciona para as tabs do admin
  } else if (email === 'usuario' && senha === '123') {
    navigation.replace('UserMain'); // Direciona para as tabs do usuário
  } else {
    alert('Usuário ou senha incorretos');
  }
};


  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo.jpeg')} style={styles.logo} />


      {/* Título */}
      <Text style={styles.title}>Login</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite sua senha"
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
        Esqueceu a senha? <Text style={styles.link}>REDEFINIR SENHA</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 20,
  },
  logo: {
    width: 140,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 15,
    color: '#555',
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});
