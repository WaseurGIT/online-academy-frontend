import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import AssignmentCard from "./AssignmentCard";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/assignments")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error("Error fetching assignments:", err));
  }, []);

  return (
    <div className="py-26 bg-gray-50 min-h-screen">
      <SectionTitle title="Assignments" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
