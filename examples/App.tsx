import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import A from './docs/a.md'
import B from './docs/b.md'
import './App.css'

function App() {
  return (
    <div className="App">
      <Link to="/a" style={{ marginRight: 100 }}>
        A
      </Link>
      <Link to="/b">B</Link>
      <Switch>
        <Route component={A} path="/a" exact />
        <Route component={B} path="/b" exact />
      </Switch>
    </div>
  )
}

export default App
