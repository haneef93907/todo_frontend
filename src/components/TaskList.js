import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  // Fetch tasks
  useEffect(() => {
    axios.get("https://merntodo-5d2c99817bd7.herokuapp.com/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a task
  const addTask = () => {
    if (!taskName.trim()) return;
    axios.post("https://merntodo-5d2c99817bd7.herokuapp.com/api/tasks", { name: taskName })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error(err));
    setTaskName("");
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`https://merntodo-5d2c99817bd7.herokuapp.com/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error(err));
  };

  // Styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f7f9fc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      color: "#333",
      marginBottom: "20px",
    },
    inputContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "70%",
      marginRight: "10px",
    },
    button: {
      padding: "10px 15px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonDelete: {
      marginLeft: "10px",
      backgroundColor: "#e74c3c",
    },
    list: {
      listStyle: "none",
      padding: "0",
    },
    listItem: {
      backgroundColor: "#fff",
      margin: "10px 0",
      padding: "10px 15px",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    responsive: {
      "@media (max-width: 768px)": {
        container: {
          padding: "10px",
        },
        input: {
          width: "100%",
          marginRight: "0",
        },
        button: {
          width: "100%",
          marginTop: "10px",
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>To-Do App</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add a task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.listItem}>
            {task.name}
            <button
              onClick={() => deleteTask(task._id)}
              style={{ ...styles.button, ...styles.buttonDelete }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
