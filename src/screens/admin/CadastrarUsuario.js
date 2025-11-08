// src/screens/admin/CadastrarUsuario.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { api } from '../../services/api';

export default function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleCadastrar = async () => {
    if (!nome || !cpf || !email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }
    const res = await api.cadastrarUsuario({ nome, cpf, email, senha });
    if (res.success) Alert.alert('Sucesso', 'Usuário cadastrado');
    else Alert.alert('Erro', 'Falha ao cadastrar');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Input label="Nome completo" value={nome} onChangeText={setNome} />
      <Input label="CPF" value={cpf} onChangeText={setCpf} />
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      
      <Button title="Cadastrar" onPress={handleCadastrar} />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#27ae60', // verde
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
