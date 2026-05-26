// src/screens/MovimentacaoScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { PRODUTOS_INICIAIS } from '../data/database';

const TIPOS = [
  { tipo: 'entrada', label: '📦 Entrada', cor: '#2d6a4f', desc: 'Recebimento de mercadoria' },
  { tipo: 'saida', label: '🚚 Saída', cor: '#c0392b', desc: 'Venda / Retirada' },
  { tipo: 'devolucao', label: '↩️ Devolução', cor: '#e07b39', desc: 'Estorno / Retorno de obra' },
];

export default function MovimentacaoScreen({ navigation, route }) {
  const produtoInicial = route.params?.produto || null;
  const nomeUsuario = route.params?.nomeUsuario || 'Usuário';

  const [produtoSelecionado, setProdutoSelecionado] = useState(produtoInicial);
  const [tipo, setTipo] = useState('saida');
  const [quantidade, setQuantidade] = useState('');
  const [obs, setObs] = useState('');

  const handleRegistrar = () => {
    if (!produtoSelecionado) {
      Alert.alert('Atenção', 'Selecione um produto.');
      return;
    }
    const qtd = parseFloat(quantidade);
    if (!qtd || qtd <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade válida.');
      return;
    }

    const novaMovimentacao = {
      id: Date.now().toString(),
      produtoId: produtoSelecionado.id,
      tipo,
      quantidade: qtd,
      obs,
      data: new Date().toLocaleString('pt-BR'),
      responsavel: nomeUsuario,
    };

    const tipoLabel = TIPOS.find((t) => t.tipo === tipo)?.label || tipo;
    Alert.alert(
      '✅ Registrado com sucesso!',
      `${tipoLabel}\n${produtoSelecionado.nome}\nQtd: ${qtd} ${produtoSelecionado.unidade}`,
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Estoque', {
              nomeUsuario,
              novasMovimentacoes: [novaMovimentacao],
            }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarTexto}>‹ Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Registrar Movimentação</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Produto */}
        <Text style={styles.secao}>Produto</Text>
        {produtoSelecionado ? (
          <View style={styles.produtoCard}>
            <Text style={styles.produtoNome}>{produtoSelecionado.nome}</Text>
            <TouchableOpacity onPress={() => setProdutoSelecionado(null)}>
              <Text style={styles.trocar}>Trocar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.produtoLista}>
            {PRODUTOS_INICIAIS.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.produtoOpcao}
                onPress={() => setProdutoSelecionado(p)}
              >
                <Text style={styles.produtoOpcaoNome}>{p.nome}</Text>
                <Text style={styles.produtoOpcaoUn}>{p.unidade}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tipo */}
        <Text style={styles.secao}>Tipo de Movimentação</Text>
        <View style={styles.tipoRow}>
          {TIPOS.map((t) => (
            <TouchableOpacity
              key={t.tipo}
              style={[
                styles.tipoBtn,
                tipo === t.tipo && { backgroundColor: t.cor, borderColor: t.cor },
              ]}
              onPress={() => setTipo(t.tipo)}
            >
              <Text style={[styles.tipoBtnLabel, tipo === t.tipo && { color: '#fff' }]}>
                {t.label}
              </Text>
              <Text style={[styles.tipoBtnDesc, tipo === t.tipo && { color: '#fff9' }]}>
                {t.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantidade */}
        <Text style={styles.secao}>
          Quantidade {produtoSelecionado ? `(${produtoSelecionado.unidade})` : ''}
        </Text>
        <View style={styles.qtdRow}>
          <TouchableOpacity
            style={styles.qtdBtn}
            onPress={() => setQuantidade((prev) => Math.max(0, (parseFloat(prev) || 0) - 1).toString())}
          >
            <Text style={styles.qtdBtnTexto}>−</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.qtdInput}
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity
            style={styles.qtdBtn}
            onPress={() => setQuantidade((prev) => ((parseFloat(prev) || 0) + 1).toString())}
          >
            <Text style={styles.qtdBtnTexto}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Observação */}
        <Text style={styles.secao}>Observação (opcional)</Text>
        <TextInput
          style={styles.obsInput}
          value={obs}
          onChangeText={setObs}
          placeholder="Ex: Venda para obra Rua das Flores, devolução parcial..."
          multiline
          numberOfLines={3}
          placeholderTextColor="#bbb"
        />

        {/* Botão */}
        <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
          <Text style={styles.botaoTexto}>✅ CONFIRMAR MOVIMENTAÇÃO</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f0' },
  header: {
    backgroundColor: '#1a3a2a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  voltarBtn: { padding: 4 },
  voltarTexto: { color: '#8fbc8f', fontSize: 16 },
  headerTitulo: { color: '#f5c842', fontWeight: '800', fontSize: 16 },
  scroll: { padding: 16 },
  secao: { fontWeight: '700', color: '#1a3a2a', fontSize: 13, marginTop: 20, marginBottom: 8, letterSpacing: 0.3 },
  produtoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  produtoNome: { fontWeight: '700', color: '#1a3a2a', fontSize: 14, flex: 1 },
  trocar: { color: '#2d6a4f', fontWeight: '700', fontSize: 13 },
  produtoLista: { gap: 8 },
  produtoOpcao: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  produtoOpcaoNome: { color: '#333', fontWeight: '600' },
  produtoOpcaoUn: { color: '#999', fontSize: 12 },
  tipoRow: { gap: 8 },
  tipoBtn: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  tipoBtnLabel: { fontWeight: '700', color: '#333', fontSize: 14 },
  tipoBtnDesc: { color: '#999', fontSize: 11, marginTop: 2 },
  qtdRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtdBtn: {
    backgroundColor: '#2d6a4f',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtdBtnTexto: { color: '#fff', fontSize: 24, fontWeight: '700' },
  qtdInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#1a3a2a',
    padding: 10,
  },
  obsInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  botao: {
    backgroundColor: '#f5c842',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  botaoTexto: { color: '#1a3a2a', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
});
