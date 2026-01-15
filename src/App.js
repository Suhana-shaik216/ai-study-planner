import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subjects, setSubjects] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("subjects"));
    if (saved) setSubjects(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  // Add subject
  const addSubject = () => {
    if (!subject || !hours || !deadline) {
      alert("Fill all fields");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        name: subject,
        deadline,
        startDate: today,
        completedDays: [],
      },
    ]);

    setSubject("");
    setDeadline("");
  };

  // Delete subject
  const deleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // Mark today as done
  const markTodayDone = (id) => {
    const today = new Date().toISOString().split("T")[0];

    setSubjects(
      subjects.map((s) => {
        if (s.id !== id) return s;

        if (s.completedDays.includes(today)) {
          alert("Today's work already marked as done!");
          return s;
        }

        return {
          ...s,
          completedDays: [...s.completedDays, today],
        };
      })
    );
  };

  // Correct progress calculation
  const getProgress = (s) => {
    const start = new Date(s.startDate);
    const end = new Date(s.deadline);

    const totalDays = Math.max(
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1,
      1
    );

    const completed = s.completedDays.length;

    return Math.min(Math.round((completed / totalDays) * 100), 100);
  };

  // Divide daily hours equally (simple version)
  const dividedHours =
    subjects.length > 0 ? (hours / subjects.length).toFixed(1) : 0;

  return (
    <div className="container">
      <h1>AI Study Planner</h1>

      <input
        placeholder="Subject name"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        placeholder="Total daily study hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={addSubject}>Add Subject</button>

      {subjects.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Daily Hours</th>
              <th>Deadline</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{dividedHours} hrs</td>
                <td>{s.deadline}</td>
                <td>
                  <div className="progress-box">
                    <div
                      className="progress-bar"
                      style={{ width: `${getProgress(s)}%` }}
                    >
                      {getProgress(s)}%
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="done-btn"
                    onClick={() => markTodayDone(s.id)}
                  >
                    Mark Today Done
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteSubject(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;