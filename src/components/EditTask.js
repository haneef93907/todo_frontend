import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import styles for Skeleton
import { BASE_URL } from "../config";

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch task by ID and set its name
    axios
      .get(`${BASE_URL}/${id}`) // Add '/tasks' and '/name'
      .then((res) => {
        if (res.data && res.data.name) {
          setTaskName(res.data.name);
        } else {
          console.error("Task not found.");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Stop loading once data is fetched
  }, [id]);

  // Handle task update
  const handleUpdate = () => {
    debugger;
    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    axios
      .put(`${BASE_URL}/${id}`, { name: taskName })
      .then(() => {
        alert("Task updated successfully!");
        navigate("/"); // Redirect back to TaskList
      })
      .catch((err) => console.error(err));
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate("/"); // Redirect back to TaskList
  };

  // Styles
  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      width: "300px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    button: {
      padding: "10px 15px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px",
    },
    cancelButton: {
      backgroundColor: "#e74c3c",
    },
    shimmer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px",
    },
    shimmerHeading: {
      width: "200px", 
      height: "30px", 
      marginBottom: "20px",
    },
    inputShimmer: {
      width: "300px",
      height: "40px",
    },
    buttonShimmer: {
      marginTop: "10px",
      width: "150px",
      height: "40px",
    }
  };

  if (loading) {
    return (
      <div style={styles.shimmer}>
        {/* Shimmer for heading */}
        <Skeleton style={styles.shimmerHeading} />
        {/* Shimmer for input field */}
        <Skeleton style={styles.inputShimmer} />
        {/* Shimmer for buttons */}
        <Skeleton style={styles.buttonShimmer} />
        <Skeleton style={styles.buttonShimmer} />
      </div>
    ); // Show shimmer effect while loading
  }

  return (
    <div style={styles.container}>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        style={styles.input}
      />
      <div>
        <button onClick={handleUpdate} style={styles.button}>
          Update
        </button>
        <button
          onClick={handleCancel}
          style={{ ...styles.button, ...styles.cancelButton }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTask;
