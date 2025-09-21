// app/page.tsx
"use client";

import { useState } from "react";
import {
  FaBook,
  FaUsers,
  FaClipboardCheck,
  FaEdit,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function PassMarkCalculator() {
  const [courseName, setCourseName] = useState("");
  const [classParticipation, setClassParticipation] = useState("");
  const [assignmentPresentation, setAssignmentPresentation] = useState("");
  const [classTestMarks, setClassTestMarks] = useState("");
  const [midTermMarks, setMidTermMarks] = useState("");
  const [result, setResult] = useState<{ type: string; message: string } | null>(
    null
  );

  const handleCalculate = () => {
    const cp = parseFloat(classParticipation) || 0;
    const ap = parseFloat(assignmentPresentation) || 0;
    const ct = parseFloat(classTestMarks) || 0;
    const mt = parseFloat(midTermMarks) || 0;

    // Weighted contributions
    const cpPercent = (cp / 5) * 5; // 5%
    const apPercent = (ap / 10) * 10; // 10%
    const ctPercent = (ct / 100) * 10; // 10%
    const mtPercent = (mt / 100) * 25; // 25%

    const totalBeforeFinal = cpPercent + apPercent + ctPercent + mtPercent;
    const minimumPassMark = 45.0; // Grade C
    const remainingNeeded = minimumPassMark - totalBeforeFinal;

    if (remainingNeeded <= 0) {
      setResult({
        type: "success",
        message: `🎉 Congratulations! You already secured at least a C before the final exam.\n(Current total: ${totalBeforeFinal.toFixed(
          2
        )} / 100)`,
      });
    } else {
      const requiredFinalMarks = (remainingNeeded / 50) * 100;
      if (requiredFinalMarks > 100) {
        setResult({
          type: "error",
          message: `❌ Unfortunately, it's not possible to reach grade C even with full marks in the final.\n(Current total: ${totalBeforeFinal.toFixed(
            2
          )} / 100)`,
        });
      } else {
        setResult({
          type: "info",
          message: `📘 Course: ${
            courseName || "N/A"
          }\nYou need at least ${requiredFinalMarks.toFixed(
            2
          )} marks out of 100 in the Final Exam to achieve at least grade C.\n(Current total: ${totalBeforeFinal.toFixed(
            2
          )} / 100)`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎯 Pass Mark Calculator
        </h1>

        <div className="space-y-5">
          {[
            {
              label: "Course Name",
              icon: <FaBook className="text-blue-600" />,
              value: courseName,
              setter: setCourseName,
              type: "text",
            },
            {
              label: "Class Participation (out of 5)",
              icon: <FaUsers className="text-purple-600" />,
              value: classParticipation,
              setter: setClassParticipation,
              type: "number",
            },
            {
              label: "Assignment / Presentation (out of 10)",
              icon: <FaClipboardCheck className="text-green-600" />,
              value: assignmentPresentation,
              setter: setAssignmentPresentation,
              type: "number",
            },
            {
              label: "Class Test (out of 100)",
              icon: <FaEdit className="text-pink-600" />,
              value: classTestMarks,
              setter: setClassTestMarks,
              type: "number",
            },
            {
              label: "Mid Term (out of 100)",
              icon: <FaChalkboardTeacher className="text-orange-600" />,
              value: midTermMarks,
              setter: setMidTermMarks,
              type: "number",
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="mb-1 font-medium text-gray-800 flex items-center gap-2">
                {field.icon}
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
          ))}

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-3 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div
            className={`mt-6 p-5 rounded-xl shadow-md whitespace-pre-line flex items-start gap-3 ${
              result.type === "success"
                ? "bg-green-50 border border-green-300 text-green-800"
                : result.type === "error"
                ? "bg-red-50 border border-red-300 text-red-800"
                : "bg-blue-50 border border-blue-300 text-blue-800"
            }`}
          >
            {result.type === "success" && (
              <FaCheckCircle className="w-6 h-6 text-green-600" />
            )}
            {result.type === "error" && (
              <FaTimesCircle className="w-6 h-6 text-red-600" />
            )}
            {result.type === "info" && (
              <FaInfoCircle className="w-6 h-6 text-blue-600" />
            )}
            <span>{result.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
