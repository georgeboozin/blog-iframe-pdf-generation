import { useState } from "react";
import reactLogo from "../assets/react.svg";

export function Navigator() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="card">
        <a href="/classic">classic</a>
      </div>
      <div className="card">
        <a href="/css-in-js">css in js</a>
      </div>
    </div>
  );
}
