import React from "react";

export default function Header() {
  return (
    <header className="">
      <div className="flex justify-between  font-medium px-3 py-5  shadow-sm">
        <h1>Where in the world ?</h1>
        <button>Change mode</button>
      </div>
    </header>
  );
}
