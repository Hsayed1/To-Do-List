import React, { useState } from "react";
import {
  FormControl,
  Container,
  TextField,
  Button,
  Input,
  InputLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import "./ComponentStyles/TodoForm.css";
import { orange, deepOrange } from "@mui/material/colors";

// Props for TodoForm component
interface TodoFormProps {
  addItem: (text: string, image: File | null) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addItem }) => {
  // State for managing task text and image
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Function to handle form submission
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(text, image);
    // Clear the form inputs after submitting
    setImage(null);
    setText("");
  };

  // Function to handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get selected file from the input field
    const file = e.target.files && e.target.files[0];
    setImage(file);
  };

  // MUI theme for styling
  const theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: orange,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="formContainer">
        <form onSubmit={submit}>
          <FormControl fullWidth={true}>
            {/* Text input for task */}
            <TextField
              className="textField"
              label="Enter your Task"
              required={true}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {/* File input for a image */}
            <Input
              type="file"
              inputProps={{
                accept: "image/*",
                onChange: handleImageChange,
              }}
            />
            {/* submit button */}
            <Button
              className="submitButton"
              variant="contained"
              color="primary"
              type="submit"
            >
              Add Task
            </Button>
          </FormControl>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default TodoForm;
