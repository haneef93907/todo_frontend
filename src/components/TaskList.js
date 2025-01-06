import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";  // Import Skeleton for shimmer effect
import { BASE_URL } from "../config";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);  // Loading state
  const navigate = useNavigate();

  // Fetch tasks
  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Add a task
  const addTask = () => {
    if (!taskName.trim()) return;
    axios
      .post(`${BASE_URL}`, { name: taskName })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTaskName("");
        toast.success("Task added successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((err) => console.error(err));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then(() =>
        setTasks(tasks.filter((task) => task._id !== id))
      )
      .catch((err) => console.error(err));
  };

  // Navigate to EditTask
  const editTask = (id) => {
    navigate(`/edit-task/${id}`);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    buttonEdit: {
      marginLeft: "10px",
      backgroundColor: "#3498db",
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
    shimmer: {
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>To-Do App</h1>

      {/* Search Input */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Task Input */}
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

      {/* Task List */}
      <ul style={styles.list}>
        {loading
          ? [...Array(5)].map((_, index) => (
              <li key={index} style={styles.listItem}>
                <Skeleton width="70%" height={30} style={styles.shimmer} />
              </li>
            ))
          : filteredTasks.map((task) => (
              <li key={task._id} style={styles.listItem}>
                {task.name}
                <div>
                  <button
                    onClick={() => editTask(task._id)}
                    style={{ ...styles.button, ...styles.buttonEdit }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{ ...styles.button, ...styles.buttonDelete }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default TaskList;
