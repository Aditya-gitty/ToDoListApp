import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, List } from 'react-native-paper';

// Define a type for each task
type Task = {
  id: string;
  title: string;
};

export default function ToDoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]); // <- Type added here

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), title: task }]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="New Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button mode="contained" onPress={addTask}>
        Add Task
      </Button>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            right={() => (
              <Button onPress={() => deleteTask(item.id)} textColor="red">
                Delete
              </Button>
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  input: {
    marginBottom: 10,
  },
});
