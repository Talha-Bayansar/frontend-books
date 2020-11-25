import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/form";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  useEffect(() => {
    async function getBooks() {
      setIsLoading(true);
      const response = await fetch(process.env.REACT_APP_URL_SERVER);
      const body = await response.json();
      setBooks(body);
      setIsLoading(false);
    }

    getBooks();
  }, []);

  async function deleteBook(book) {
    const fetchOptions = {
      method: "DELETE",
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
    setBooks(body);
  }

  return (
    <div className="App">
      {isLoading ? <p>LOADING DATA</p> : false}
      {books.map((b) => (
        <p
          className="book"
          onClick={() => setBookToEdit(b)}
          key={b.id}
          style={{
            backgroundColor: `${bookToEdit === b ? "grey" : "transparent"}`,
          }}
        >
          title: {b.title + " - "}
          author: {b.author + " - "}
          sells: {b.sells}
          <button onClick={() => deleteBook(b)}>Delete</button>
        </p>
      ))}
      <Form
        bookToEdit={bookToEdit}
        setIsLoading={setIsLoading}
        addBook={(body) => setBooks([...books, body])}
        setBooks={setBooks}
      />
    </div>
  );
}

export default App;
