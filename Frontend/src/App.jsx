import { useState, useEffect } from 'react'
import { Code2, Send, Sparkles } from 'lucide-react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setIsLoading(true)
    try {
      const response = await axios.post('await axios.post('https://cleancode-1.onrender.com/ai/get-review', { code })
', { code })
      setReview(response.data)
    } catch (error) {
      setReview('Error occurred while reviewing code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 className="nav-title">CleanCode</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          
          {/* Left Panel - Code Editor */}
          <div className="left-panel">
            <div className="panel-header">
              <button
                onClick={reviewCode}
                disabled={isLoading}
                className={`review-btn ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Reviewing...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Review Code</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="editor-container">
              <div className="editor-header">
                <div className="window-controls">
                  <div className="control red"></div>
                  <div className="control yellow"></div>
                  <div className="control green"></div>
                </div>
                <span className="file-name">main.js</span>
              </div>
              
              <div className="editor-wrapper">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                  padding={20}
                  style={{
                    fontFamily: '"Fira Code", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                    fontSize: 14,
                    lineHeight: 1.6,
                    height: "100%",
                    backgroundColor: "#1a1b26",
                    color: "#a9b1d6",
                    outline: "none"
                  }}
                  className="code-editor"
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Review Results */}
          <div className="right-panel">
            <div className="review-container">
              <div className="review-content">
                {review ? (
                  <div className="markdown-content">
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                      {review}
                    </Markdown>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <Sparkles size={32} />
                    </div>
                    <div className="empty-text">
                      <p className="empty-title">Ready for Code Review</p>
                      <p className="empty-subtitle">
                        Click "Review Code" to get AI-powered feedback on your code
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
