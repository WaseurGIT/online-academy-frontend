import React, { useContext, useEffect, useState } from "react";
import axiosSecure from "../axios/AxiosSecure";
import { AuthContext } from "../context/AuthProvider";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    // setLoading(true);
    axiosSecure
      .get(
        `http://localhost:5000/assignment-submissions/by-student?email=${user.email}`
      )
      .then((res) => {
        setSubmissions(res.data.data || []);
      })
      .catch((err) => console.error("Error loading submissions:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Assignment Submissions
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading submissions…</p>
      ) : submissions.length === 0 ? (
        <p className="text-gray-600">
          You have not submitted any assignments yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {submissions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(sub.submittedAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 mt-2">
                <strong>Submitted by:</strong> {sub.studentName}
              </p>

              {sub.fileUrl ? (
                <a
                  href={sub.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 hover:underline"
                >
                  📎 View File
                </a>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  No file URL provided.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
