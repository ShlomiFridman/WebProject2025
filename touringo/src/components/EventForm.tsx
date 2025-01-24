"use client";
import { myStyles } from "@/utils/styles";
import { useState } from "react";

export default function CreateForm() {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);
  setIsLoading(false);

  return (
    <form className="w-1/2 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center text-blue-600 dark:text-blue-400">
        Add a New Ticket
      </h2>
      <label className="block">
        <span className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Title:
        </span>
        <input
          required
          type="text"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label className="block">
        <span className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Body:
        </span>
        <textarea
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label className="block">
        <span className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Option:
        </span>
        <select
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="option 1">option 1</option>
          <option value="option 2">option 2</option>
          <option value="option 3">option 3</option>
        </select>
      </label>
      <button
        className={myStyles.button_blue}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Ticket"}
      </button>
    </form>
  );
}
