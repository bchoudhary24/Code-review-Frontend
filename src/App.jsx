import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import Editor from "react-simple-code-editor";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  // Highlight code syntax on load/update
  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    if (!code.trim()) {
      setReview("⚠ Please write some code before reviewing.");
      return;
    }

    try {
      setLoading(true);
      console.log("📤 Sending code to backend:", code);

      const response = await axios.post(
        "https://code-review-backend-2.onrender.com/ai/get-review",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Backend Response:", response.data);
      setReview(response.data?.review || response.data || "No review received.");
    } catch (err) {
      console.error("❌ Error from backend:", err);
      setReview("⚠ Error fetching review. Please check your backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        {/* Left Section: Code Editor */}
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                color: "white",
                backgroundColor: "#1e1e1e",
                borderRadius: "8px",
              }}
            />
          </div>

          <div
            onClick={!loading ? reviewCode : undefined}
            className="review"
            style={{
              marginTop: "10px",
              padding: "12px",
              backgroundColor: "#3b82f6",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.2s",
            }}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Reviewing...
              </>
            ) : (
              "✨ Review Code"
            )}
          </div>
        </div>

        {/* Right Section: Review Output */}
        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
