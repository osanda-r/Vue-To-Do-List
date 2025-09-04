<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        fluid
        class="fill-height d-flex align-center justify-center"
        style="background: white"
      >
        <v-row
          align="center"
          justify="center"
          class="ma-0 pa-0"
          style="width: 100%"
        >
          <v-col cols="12" sm="8" md="6" lg="4" xl="3">
            <v-card
              class="mx-auto pa-4"
              elevation="10"
              rounded="lg"
              style="background: #fff"
            >
              <v-toolbar color="green" dark rounded="lg" flat>
                <v-toolbar-title class="text-h5 font-weight-bold"
                  >To-Do List</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-row class="mb-4" align="center">
                  <v-col cols="8">
                    <v-text-field
                      v-model="newTodo"
                      label="Add a task"
                      @keyup.enter="addTodo"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex align-center">
                    <v-btn
                      color="light yellow"
                      @click="addTodo"
                      class="ml-2"
                      elevation="2"
                      rounded
                    >
                      Add
                    </v-btn>
                  </v-col>
                </v-row>
                <v-list class="mt-2" style="background: transparent">
                  <v-list-item
                    v-for="(todo, i) in todos"
                    :key="todo.id"
                    class="mb-2"
                    style="border-radius: 8px; background: #f0f4ff"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-body-1">
                        {{ todo.text }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon color="error" @click="confirmDelete(i)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item v-if="todos.length === 0">
                    <v-list-item-content>
                      <v-list-item-title class="text-grey">
                        No tasks yet.
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <!-- TO-DO Delete Confirmation -->
                <v-dialog v-model="dialog" max-width="400">
                  <v-card>
                    <v-card-title class="text-h7">
                      Are you sure ?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="grey" text @click="dialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn color="error" text @click="deleteTodo"
                        >Confirm</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- Toast Snackbar -->
                <v-snackbar
                  v-model="snackbar"
                  color="success"
                  timeout="2000"
                  class="align-center"
                >
                  To-do deleted!
                </v-snackbar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Firebase config (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyCPENp31Fe4I4jTD1v1BDYphjE2KcCCUfM",
  authDomain: "to-do-list-563b5.firebaseapp.com",
  projectId: "to-do-list-563b5",
  storageBucket: "to-do-list-563b5.appspot.com",
  messagingSenderId: "564182145796",
  appId: "1:564182145796:web:4f053e6b5824fe319c8e51"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todosCollection = collection(db, "todos");

const newTodo = ref("");
const todos = ref([]); // [{ id, text }]
const dialog = ref(false);
const snackbar = ref(false);
const deleteIndex = ref(null);

// Load todos from Firestore
async function loadTodos() {
  const querySnapshot = await getDocs(todosCollection);
  todos.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
  }));
}

onMounted(loadTodos);

async function addTodo() {
  if (newTodo.value.trim()) {
    // Add to Firestore
    await addDoc(todosCollection, {
      text: newTodo.value.trim(),
    });
    await loadTodos(); // reload from Firestore for sync
    newTodo.value = "";
  }
}

function confirmDelete(index) {
  deleteIndex.value = index;
  dialog.value = true;
}

async function deleteTodo() {
  if (deleteIndex.value !== null) {
    const todo = todos.value[deleteIndex.value];
    if (todo && todo.id) {
      await deleteDoc(doc(todosCollection, todo.id));
      await loadTodos(); // reload from Firestore for sync
    }
    snackbar.value = true;
    deleteIndex.value = null;
  }
  dialog.value = false;
}
</script>
  
  dialog.value = false;

</script>

<script>
export default {
  data: () => ({ drawer: null }),
};
</script>
