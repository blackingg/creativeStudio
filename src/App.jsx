import React, { useEffect, useRef, useState } from "react";
import { Cursor } from "./components/Cursor";
import Hero from "./components/Hero";
import Body from "./components/Body";

function App() {
  return (
    <div className="bg-black cursor-none">
      <Cursor />
      <Hero />
      <Body />
    </div>
  );
}

export default App;
