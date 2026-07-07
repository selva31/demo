import { useState } from "react";

// A reusable Greeting component that accepts "props"
function Greeting({ message }) {
  return <h2 className="greeting-text">{message}</h2>;
}

// The main application component
export default function CounterApp() {
  // Define a state variable named "count" initialized to 0
  const [count, setCount] = useState(0);

  // Event handler function to update state
  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <div className="container">
      <h1>My React Application</h1>
      <Greeting message="Welcome! Manage your counts below:" />

      <div className="card">
        <p>
          Current Count: <strong>{count}</strong>
        </p>

        {/* Buttons that trigger event handlers on click */}
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </div>
  );
}
