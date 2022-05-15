import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "../App";

const PageNotFound = () => {
  return (
    <main>
      <button
        onClick={() => {
          socket.emit("eventsToServer", { room: "6", text: "test" });
        }}
      >
        {" "}
        Click Me
      </button>
      <div className="nothing-to-show">
        <h2>Oops... This page is not found.</h2>
      </div>
    </main>
  );
};

export default PageNotFound;
