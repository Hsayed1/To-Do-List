import React, { useState } from "react";
import {
  Card,
  IconButton,
  Container,
  CardContent,
  Typography,
  TextField,
  Button,
  CardMedia,
  Snackbar,
} from "@mui/material";
import { Check, Delete, Edit } from "@mui/icons-material";
import "./ComponentStyles/ListItem.css";

// Props for the ListItem component
interface ListItemProps {
  title: string;
  checkItem: (id: number) => void;
  id: number;
  isCompleted: boolean;
  deleteItem: (id: number) => void;
  editItem: (id: number, newTitle: string) => void;
  selectTemplate: (id: number) => void;
  image?: string; 
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  checkItem,
  id,
  isCompleted,
  deleteItem,
  editItem,
  selectTemplate,
  image,
}) => {
  // State to manage the edited title, editing mode, and error message
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  // Function to mark a task as done
  const markAsDone = () => checkItem(id);

  // Function to remove a task
  const remove = () => deleteItem(id);

  // Function to toggle editing mode
  const handleEdit = () => setIsEditing(!isEditing);

  // Function to handle saving edits and display error if new title is empty
  const handleEditSave = () => {
    if (newTitle.trim() !== "") {
      editItem(id, newTitle.trim());
      setIsEditing(false);
    } else {
      // Display an error message if the new title is empty
      setErrorSnackbar(true);
    }
  };

  // Function to select a task as a template
  const selectAsTemplate = () => {
    selectTemplate(id);
  };

  // Determine the style for the task based on completion status
  const toDoStyle = isCompleted
    ? "textDecorationLineThrough"
    : "textDecorationNone";

  return (
    <Container className="listItemContainer">
      <Card variant="outlined" className="cardContainer">
        <CardContent>
          {isEditing ? (
            <>
              <TextField
                fullWidth
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
              <Button
                variant="contained"
                color="primary"
                className="saveButton"
                onClick={handleEditSave}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="templateButton"
                onClick={selectAsTemplate}
              >
                Select as Template
              </Button>
            </>
          ) : (
            // Display task details and buttons when not in editing mode
            <>
              <Typography variant="h5" component="h2" className={toDoStyle}>
                <IconButton onClick={markAsDone}>
                  <Check style={{ color: "Green" }} />
                </IconButton>
                {title}
                <IconButton onClick={remove} className="deleteButton">
                  <Delete style={{ color: "Red" }} />
                </IconButton>
                <IconButton onClick={handleEdit} className="editButton">
                  <Edit style={{ color: "black" }} />
                </IconButton>
              </Typography>
              {image && (
                // Display image if provided
                <CardMedia
                  component="img"
                  alt="Task Image"
                  height="200"
                  width="200"
                  image={image}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* displaying error message if edited task is empty*/}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbar(false)}
        message="Task cannot be empty"
      />
    </Container>
  );
};

export default ListItem;
