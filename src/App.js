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
      alert("Please fill all fields");
      return;
    }

    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        name: subject,
        deadline,
        startDate: new Date().toISOString().split("T")[0],
      },
    ]);

    setSubject("");
    setDeadline("");
  };

  // Delete subject
  const deleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // Deadline-based progress
  const getProgress = (s) => {
    const start = new Date(s.startDate);
    const end = new Date(s.deadline);
    const today = new Date();

    if (today < start) return 0;

    const totalDays = Math.max(
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)),
      1
    );

    const elapsedDays = Math.min(
      Math.ceil((today - start) / (1000 * 60 * 60 * 24)),
      totalDays
    );

    return Math.round((elapsedDays / totalDays) * 100);
  };

  // 🔥 AI SMART HOURS DISTRIBUTION
  const getSmartHours = () => {
    const totalDailyHours = Number(hours);
    if (!totalDailyHours || subjects.length === 0) return {};

    let totalWeight = 0;

    const weights = subjects.map((s) => {
      const daysRemaining = Math.max(
        Math.ceil(
          (new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24)
        ),
        1
      );
      const weight = 1 / daysRemaining;
      totalWeight += weight;
      return { id: s.id, weight };
    });

    const distributed = {};
    weights.forEach((w) => {
      distributed[w.id] = (
        (w.weight / totalWeight) *
        totalDailyHours
      ).toFixed(2);
    });

    return distributed;
  };

  const smartHours = getSmartHours();

  return (
    <div className="container">
      <h1>AI Study Planner</h1>

      <input
        placeholder="Subject name"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="number"
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
              <th>Daily Hours (AI)</th>
              <th>Deadline</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{smartHours[s.id]} hrs</td>
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
                    className="delete-btn"
                    onClick={() => deleteSubject(s.id)}
                  >
                    ❌
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