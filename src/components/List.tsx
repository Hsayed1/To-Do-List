import React, { useMemo, useRef } from "react";
import ListItem from "./ListItem";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

// Props for List component
interface ListProps {
  listItems: Task[];
  checkItem: (id: number) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, newTitle: string) => void;
  filter: "all" | "completed" | "uncompleted";
  searchText: string;
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const List: React.FC<ListProps> = ({
  listItems,
  checkItem,
  deleteItem,
  editItem,
  filter,
  searchText,
  setTask,
}) => {
  // filtered list based on filter and search text
  const filteredList = useMemo(() => {
    return listItems
      .filter((item) => {
        switch (filter) {
          case "completed":
            return item.isCompleted;
          case "uncompleted":
            return !item.isCompleted;
          default:
            return true;
        }
      })
      .filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [filter, listItems, searchText]);

  // Function to handle selecting as a template
  const selectTemplate = (id: number) => {
    const selectedTemplate = listItems.find((item) => item.id === id);
    if (selectedTemplate) {
      // TODO: Implement logic to fork a todo that has already been created
    }
  };

  // Refs for tracking drag and drop
  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);

  // Function to handle sorting the list after drag and drop
  const handleSort = () => {
    const listClone = [...listItems];
    const draggedItem = listClone.splice(dragItem.current, 1)[0];
    listClone.splice(draggedOverItem.current, 0, draggedItem);
    // Update the state with the sorted list
    setTask(listClone);
  };

  return (
    <div>
      {/* Render list items */}
      {filteredList.map((item, index) => (
        <div
          draggable
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (draggedOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* pass list props */}
          <ListItem
            key={item.id}
            title={item.title}
            checkItem={checkItem}
            id={item.id}
            isCompleted={item.isCompleted}
            deleteItem={deleteItem}
            editItem={editItem}
            selectTemplate={selectTemplate}
          />
        </div>
      ))}
    </div>
  );
};

export default List;
