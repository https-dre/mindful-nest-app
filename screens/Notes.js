import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const EmojiPicker = ({ onSelect }) => {
    const emojis = [
        '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
        '😋', '😎', '😍', '🥺', '😐', '😑', '😒', '😓', '😔', '😕',
        '😖', '😗', '😘', '😙', '😚', '☺️', '😜', '😝', '😛', '🤑',
        '🤗', '🤔', '🤐', '😶', '😏', '😬', '😌', '😷', '🤒', '🤕',
        '🤢', '🤧', '🥳', '🥴', '😵', '🤯', '🤠', '🥸', '😎', '🤓',
        '🧐', '😈', '👿', '👹', '👺', '💀', '☠️', '💩', '🤡', '👻',
        '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽',
        '🙀', '😿', '😾', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🦝',
        '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐧',
        '🐦', '🐤', '🐣', '🐥', '🦆', '🦢', '🦉', '🦄', '🐗', '🐺',
        '🐴', '🦓', '🦄', '🐝', '🦋', '🐞', '🐜', '🦗', '🦗', '🦟',
        '🐞', '🐜', '🐝', '🦄', '🐚', '🦋', '🌷', '🌻', '🌼', '🌸'
    ];

  return (
    <ScrollView style={styles.emojiPicker} horizontal={true}>
      {emojis.map((emoji, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(emoji)}>
          <Text style={styles.emoji}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const PromptWithDialog = ({ visible, setVisible, onSave }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [noteName, setNoteName] = useState('');

  const handleSave = () => {
    if (selectedEmoji && noteName) {
      onSave(selectedEmoji, noteName);
      setVisible(false);
    } else {
      console.error("Emoji ou nome da nota não selecionado!");
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Criar Nova Nota</Text>
          <EmojiPicker onSelect={(emoji) => setSelectedEmoji(emoji)} />
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da nota"
            value={noteName}
            onChangeText={setNoteName}
            placeholderTextColor={"black"}          
                      
          />
          <Button title="Salvar" onPress={handleSave} />
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const NoteComponent = ({ emoji = '🚀', name = 'Nome da Nota' }) => {
  return (
    <View style={styles.note}>
      <Text style={{ fontSize: 30 }}>{emoji}</Text>
      <TouchableOpacity style={{ width: "100%", height: "80%" }}>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text> 
      </TouchableOpacity>
    </View>
  );
};

export const Notes = () => {
  const navigation = useNavigation();
  const [promptVisible, setPromptVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleSaveNote = (emoji, name) => {
    setNotes([...notes, { emoji, name }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PromptWithDialog visible={promptVisible} setVisible={setPromptVisible} onSave={handleSaveNote} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
          <Icon name="chevron-back-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Notas</Text>
        <TouchableOpacity style={styles.icon}>
          <Icon name="folder-open-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => setPromptVisible(true)}>
          <Icon name="document-outline" size={25} />
        </TouchableOpacity>
      </View>

      <View style={styles.notesContainer}>
        {notes.map((note, index) => (
          <NoteComponent key={index} emoji={note.emoji} name={note.name} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  title: {
    fontFamily: 'SpaceGroteskMedium',
    fontSize: 25,
  },
  notesContainer: {
    backgroundColor: 'white',
    width: '85%',
    marginHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  note: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emojiPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  emoji: {
    fontSize: 40,
    margin: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    color: '#007AFF',
  },
  addNoteButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addNoteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
