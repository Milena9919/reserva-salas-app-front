import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { api } from '../../services/api';

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto > 9) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto > 9) resto = 0;

  return resto === parseInt(cpf[10]);
}

export default function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleCadastrar = async () => {
    if (!nome || !cpf || !idade || !nivelAcesso || !email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (!validarCPF(cpf)) {
      return Alert.alert('Erro', 'CPF inválido');
    }

    const serial = cpf.replace(/\D/g, '').slice(-5);

    const res = await api.cadastrarUsuario({
      nome,
      cpf,
      idade: Number(idade),
      nivelAcesso: Number(nivelAcesso),
      email,
      serial,
      senha,
    });

    if (res.success) {
      Alert.alert('Sucesso', 'Usuário cadastrado');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Falha ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Círculos decorativos */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>Cadastrar Usuários</Text>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para adicionar um novo usuário ao sistema.
        </Text>

        <Input label="Nome completo" value={nome} onChangeText={setNome} labelStyle={styles.label} inputStyle={styles.input} />
        <Input label="CPF" value={cpf} onChangeText={setCpf} labelStyle={styles.label} inputStyle={styles.input} />
        <Input label="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" labelStyle={styles.label} inputStyle={styles.input} />
        <Input label="Nível de Acesso (1 a 3)" value={nivelAcesso} onChangeText={setNivelAcesso} keyboardType="numeric" labelStyle={styles.label} inputStyle={styles.input} />
        <Input label="Email" value={email} onChangeText={setEmail} labelStyle={styles.label} inputStyle={styles.input} />
        <Input label="Senha" secureTextEntry value={senha} onChangeText={setSenha} labelStyle={styles.label} inputStyle={styles.input} />

        <Button title="Cadastrar" onPress={handleCadastrar} style={styles.primaryButton} textStyle={styles.buttonText} />

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    padding: 24,
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 30,
  },

  subtitle: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 30,
  },

  label: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#1C3B70',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
  },

  primaryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  circleTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    top: -120,
    left: -80,
    opacity: 0.28,
    zIndex: -1,
  },

  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    bottom: -100,
    right: -60,
    opacity: 0.28,
    zIndex: -1,
  },
});
