import React, { useState } from "react";
import "../App.css";

function Form(props) {
  const { addBook, setIsLoading } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [sells, setSells] = useState(0);

  async function createBook(book) {
    setIsLoading(true);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(book),
    };
    const response = await fetch(
      process.env.REACT_APP_URL_SERVER,
      fetchOptions
    );
    const body = await response.json();
    console.log(`async createBook: received response ${JSON.stringify(body)}`);
    addBook(body);
    setIsLoading(false);
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      Title:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      Author:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
      />
      Sells:
      <input
        className="form__input"
        type="number"
        step={1000}
        value={sells}
        onChange={(e) => setSells(parseInt(e.target.value))}
      />
      <button
        className="form__button"
        onClick={() =>
          createBook({
            title: title,
            author: author,
            sells: sells,
          })
        }
      >
        Bevestigen
      </button>
    </form>
  );
}

export default Form;
