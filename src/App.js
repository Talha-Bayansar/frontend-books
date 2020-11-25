import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/form";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="App">
      {isLoading ? <p>LOADING DATA</p> : false}
      {books.map((b) => (
        <p key={b.id}>
          title: {b.title + " - "}
          author: {b.author + " - "}
          sells: {b.sells}
        </p>
      ))}
      <Form addBook={(body) => setBooks([...books, body])} />
    </div>
  );
}

export default App;
