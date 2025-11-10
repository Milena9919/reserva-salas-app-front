// src/screens/admin/CadastrarSala.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { api } from '../../services/api';

export default function CadastrarSala() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const navigation = useNavigation();

  const handleCadastrar = async () => {
    if (!nome) return Alert.alert('Erro', 'Nome é obrigatório');
    const res = await api.cadastrarSala({ nome, descricao, nivelAcesso });
    if (res.success) Alert.alert('Sucesso', 'Sala cadastrada');
    else Alert.alert('Erro', 'Falha ao cadastrar');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Input
        label="Número da Porta"
        value={nome}
        onChangeText={setNome}
      />
      <Input
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Input
        label="Nível de acesso"
        value={nivelAcesso}
        onChangeText={setNivelAcesso}
        placeholder="ex: 0, 1, 2"
      />

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
    backgroundColor: '#27ae60', // verde escuro
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
