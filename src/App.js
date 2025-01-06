
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  </Router>
);

export default App;

