import React, { useEffect, useState } from "react";
import data from "./data";
function App() {
  let newData = "";
  const [para, setPara] = useState([]);
  const [count, setCount] = useState("");
  const changeHandler = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }
    if (count > 158) {
      amount = 8;
    }
    setPara(data.slice(0, amount));
  };
  function copy() {
    document.execCommand("copy");
  }
  const fetchData = async () => {
    const response = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=150&start-with-lorem=1"
    );
    const getData = await response.json();
    newData = getData;
    // setPara(newData);
    console.log(getData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="section-center">
      <div className="title">
        <h3>Tired of Boring Lorem ipsum?</h3>
      </div>
      <form onSubmit={changeHandler} className="lorem-form">
        <label htmlFor="amount">Paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className="btn">Generate</button>
      </form>
      <article className="lorem-text">
        {para.map((text, index) => {
          return (
            <p onclick={copy} key={index}>
              {text}
            </p>
          );
        })}
      </article>
    </section>
  );
}

export default App;
