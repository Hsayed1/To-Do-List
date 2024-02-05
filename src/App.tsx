import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import List from "./components/List";
import {
  Button,
  Container,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./Styles/App.css";
import { deepOrange, orange } from "@mui/material/colors";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  editing?: boolean;
  image?: string;
}

function App() {
  // State for storing tasks and the ID counter
  const [listItems, setTask] = useState<Task[]>(() => {
    // Load data from local storage on initial render
    const storedData = localStorage.getItem("tasks");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [idCounter, setIdCounter] = useState(() => {
    // Load the ID counter from local storage on initial render
    const storedCounter = localStorage.getItem("idCounter");
    return storedCounter ? parseInt(storedCounter, 10) : 1;
  });

  // State for managing task filtering and searching
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
    "all"
  );
  const [searchText, setSearchText] = useState("");

  // Function to save data to local storage
  const saveDataToLocalStorage = (tasks: Task[], counter: number) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("idCounter", counter.toString());
  };

  useEffect(() => {
    // Save data to local storage whenever listItems or idCounter changes
    saveDataToLocalStorage(listItems, idCounter);
  }, [listItems, idCounter]);

  // Function to toggle the completion status of a task
  const checkItem = (id: number) => {
    setTask((prevListItems) =>
      prevListItems.map((item) => {
        if (item.id === id) item.isCompleted = !item.isCompleted;
        return item;
      })
    );
  };

  // Function to delete a task by ID
  const deleteItem = (id: number) => {
    setTask((prevListItems) => prevListItems.filter((item) => item.id !== id));
  };

  // Function to add a new task
  const addItem = (text: string) => {
    const newTask: Task = {
      id: idCounter,
      title: text,
      isCompleted: false,
    };

    setTask((prevListItems) => [...prevListItems, newTask]);
    setIdCounter((prevCounter) => prevCounter + 1);
  };

  // Function to edit the title of a task
  const editItem = (id: number, newTitle: string) => {
    setTask((prevListItems) =>
      prevListItems.map((item) => {
        if (item.id === id) {
          item.title = newTitle;
          item.editing = false;
        }
        return item;
      })
    );
  };

  // Define MUI theme
  const theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: orange,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="FormContainer">
          <h1>What Should We Do Today?</h1>
          <div>
            <Container className="Container" maxWidth="sm">
              {/* Buttons to filter tasks */}
              <Button
                variant={filter === "all" ? "contained" : "outlined"}
                onClick={() => setFilter("all")}
                className="Button"
                color="secondary"
              >
                View All
              </Button>
              <Button
                variant={filter === "completed" ? "contained" : "outlined"}
                onClick={() => setFilter("completed")}
                className="Button"
                color="secondary"
              >
                View Completed
              </Button>
              <Button
                variant={filter === "uncompleted" ? "contained" : "outlined"}
                onClick={() => setFilter("uncompleted")}
                className="Button"
                color="secondary"
              >
                View Uncompleted
              </Button>
            </Container>
          </div>
          {/* Form to add new tasks */}
          <TodoForm addItem={addItem} />
          <div className="SearchTextField ">
            {/* Text field for searching tasks */}
            <TextField
              label="Search by contains..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              color="secondary"
            />
          </div>
        </div>
        {/* List component to display tasks */}
        <List
          listItems={listItems}
          checkItem={checkItem}
          deleteItem={deleteItem}
          editItem={editItem}
          filter={filter}
          searchText={searchText}
          setTask={setTask}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
