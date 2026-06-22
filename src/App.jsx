import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { useApi } from "./api"

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Auth0 hooks
  const { loginWithRedirect, logout, isAuthenticated, isLoading, error, user } = useAuth0()

  if (isLoading) return <div style={{ padding: "40px", textAlign: "center" }}>Authenticating…</div>
  if (error) return (
    <div style={{ padding: "40px", color: "red" }}>
      <strong>Auth0 Error:</strong> {error.message}
      <br />
      <small>Check browser console and Auth0 dashboard settings.</small>
    </div>
  )

  // API hook
  const { callApi } = useApi()

  // Test API call
  const testApi = async () => {
    try {
      const res = await callApi("/api/hello")
      alert("API Response: " + JSON.stringify(res.data))
    } catch (err) {
      console.error(err)
      alert("API Error: " + err.message)
    }
  }

  return (
    <>
      {/* Auth0 Login / Logout Section */}
      <div style={{ padding: "20px", textAlign: "right" }}>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect()}>
            Login
          </button>
        )}

        {isAuthenticated && (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome, {user.name}
            </span>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Secure API Call Button */}
      {isAuthenticated && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <button onClick={testApi}>
            Call Secure API
          </button>
        </div>
      )}

      {/* Your existing Vite + React UI */}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
