import React, { createContext, useState, useEffect } from 'react';
import { request } from '../../helpers/request';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  async function getOwnedBooks() {
    const responce = await request('/backend/author/books', 'GET', {}, {}, true);
    console.log(responce);
    if (responce.books) {
      setOwnedBooks(responce.books);
    }
  } 

  useEffect(() => {
    if (account) {
      getOwnedBooks();
    }
  }, [account]);

  return (
    <AppContext.Provider value={{ 
      searchTerm, setSearchTerm, 
      account, setAccount, 
      isLoading, setIsLoading, 
      ownedBooks, setOwnedBooks, 
      favoriteBooks, setFavoriteBooks, 
      selectedBook, setSelectedBook
    }}> 
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };