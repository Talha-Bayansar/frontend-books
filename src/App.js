import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_URL_SERVER;
  useEffect(() => {
    async function getBooks() {
      setIsLoading(true);
      const response = await fetch(url);
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
        <p key={b.title}>
          id: {b.id + " "}
          title: {b.title + " "}
          author: {b.author + " "}
          sells: {b.sells}
        </p>
      ))}
    </div>
  );
}

export default App;
