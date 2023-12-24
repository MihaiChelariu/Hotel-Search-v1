import { ChangeEvent, FormEvent, useState } from "react";
import { bubbleSort } from "./bubbleSort";

import "./App.css";
import "./output.css";

function App() {
  const [inputArray, setInputArray] = useState("");

  const handleBubbleSort = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr: number[] = inputArray.split(",").filter(Number).map(Number);

    const startTime = performance.now();
    const sorted = bubbleSort(arr);
    const endTime = performance.now();

    setInputArray(sorted.join(", "));
    console.log("Bubble sort took " + (endTime - startTime) + "ms");
  };

  const handleMergeSort = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("not implemented yet");
  };

  const handleInput = (arr: ChangeEvent<HTMLTextAreaElement>) => {
    setInputArray(arr.target.value);
  };

  return (
    <>
      <div className="center-div">
        <div className="forms-div">
          <form className="bubbl-sort" onSubmit={handleBubbleSort}>
            <label>Enter numbers to Bubble-sort:</label>
            <br></br>
            <textarea required onChange={handleInput}></textarea>
            <button>Bubble Sort</button>
          </form>
          <form className="merge-sort" onSubmit={handleMergeSort}>
            <label>Enter numbers to Merge-sort:</label>
            <br></br>
            <textarea required onChange={handleInput}></textarea>
            <button>Merge Sort</button>
          </form>
          {/*<form className="quick-sort" onSubmit={handleQuicksort}>
          <label>Enter numbers to quick sort:</label>
          <br></br>
          <input type="text" required onChange={handleInput}></input>
          <button>Quick Sort</button>
        </form>
        <form className="selection-sort" onSubmit={handleSelectionSort}>
          <label>Enter numbers to selection sort:</label>
          <br></br>
          <input type="text" required onChange={handleInput}></input>
          <button>Selection Sort</button>
        </form> */}
        </div>
        <div className="output">Result: {inputArray}</div>
      </div>
    </>
  );
}

export default App;
