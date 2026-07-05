import { useState } from "react";
import { Star, Send, CheckCircle, MessageCircleHeart } from "lucide-react";
import surveyQuestions from "../data/surveyQuestions";

function RatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-btn ${star <= (hovered || value) ? "filled" : ""}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`Rate ${star} out of 5`}
        >
          <Star size={28} fill={star <= (hovered || value) ? "currentColor" : "none"} />
        </button>
      ))}
      {value > 0 && (
        <span className="rating-label">
          {["", "Needs work", "Fair", "Good", "Great", "Excellent"][value]}
        </span>
      )}
    </div>
  );
}

export default function SurveyPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const setAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const toggleMultiple = (id, option) => {
    const current = answers[id] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswer(id, updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    surveyQuestions.forEach((q) => {
      if (!q.required) return;
      const ans = answers[q.id];
      if (ans === undefined || ans === "" || (Array.isArray(ans) && ans.length === 0)) {
        newErrors[q.id] = "This question requires an answer";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="survey-success">
        <CheckCircle size={64} />
        <h1>Thank You!</h1>
        <p>
          Your feedback means the world to us. Every response helps us build a
          better MeshMesh experience — for you and everyone in our community.
        </p>
        <p className="survey-success-sub">
          We read every single piece of feedback personally. You're helping shape
          the future of MeshMesh!
        </p>
      </div>
    );
  }

  return (
    <div className="survey-page">
      <div className="survey-header">
        <MessageCircleHeart size={36} />
        <h1>We'd Love to Hear From You</h1>
        <p>
          Your experience matters deeply to us. Whether it's a quick rating or a
          detailed thought, every piece of feedback helps us craft something
          better — together. This takes about 2 minutes, and we're grateful for
          every second of it.
        </p>
      </div>

      <form className="survey-form" onSubmit={handleSubmit}>
        {surveyQuestions.map((q, index) => (
          <div key={q.id} className={`survey-question ${errors[q.id] ? "has-error" : ""}`}>
            <div className="question-number">{index + 1}</div>
            <div className="question-content">
              <label>
                {q.question}
                {q.required && <span className="required">*</span>}
              </label>

              {q.type === "rating" && (
                <RatingInput
                  value={answers[q.id] || 0}
                  onChange={(val) => setAnswer(q.id, val)}
                />
              )}

              {q.type === "multiple" && (
                <div className="multiple-options">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className={`option-chip ${
                        q.allowMultiple
                          ? (answers[q.id] || []).includes(opt)
                            ? "selected"
                            : ""
                          : answers[q.id] === opt
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type={q.allowMultiple ? "checkbox" : "radio"}
                        name={`question-${q.id}`}
                        checked={
                          q.allowMultiple
                            ? (answers[q.id] || []).includes(opt)
                            : answers[q.id] === opt
                        }
                        onChange={() =>
                          q.allowMultiple
                            ? toggleMultiple(q.id, opt)
                            : setAnswer(q.id, opt)
                        }
                      />
                      {opt}
                    </label>
                  ))}
                  {q.allowMultiple && (
                    <p className="multi-hint">Select all that apply</p>
                  )}
                </div>
              )}

              {q.type === "text" && (
                <textarea
                  value={answers[q.id] || ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={4}
                />
              )}

              {errors[q.id] && <span className="field-error">{errors[q.id]}</span>}
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary submit-survey-btn">
          <Send size={18} /> Submit Feedback
        </button>
      </form>
    </div>
  );
}
