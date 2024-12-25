import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
// import useLocalStorage from "use-local-storage";
import { EditContext } from "./EditContext";
// import { PostArrayContext } from "./PostsArrayContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const apiURL = 'https://vercel-express-blog-api.vercel.app';
  const blog_API_URL = 'https://vercel-express-blog-api.vercel.app/';

  const [page, setPage] = useState(null);

  useEffect(() => {
    // Fetch data from the Express API
    axios
      .get(blog_API_URL)
      .then((response) => setPage(response.data))
      .catch((error) => console.error("Error fetching the message:", error));

  }, []);

  // const [posts, setPosts] = useState([]);     // 1 user, Many posts   [{post.id, post.created_at, post.updated_at, post.title, post.content}]

  // const [isEdit, setIsEdit] = useLocalStorage('isEdit', null);
  // const [editId, setEditId] = useLocalStorage('editId', null);

  const [isEdit, setIsEdit] = useState(null);
  const [editId, setEditId] = useState(null);

  console.log('isEdit', isEdit);
  console.log('editId', editId);

  return (
    <>
    {/* // <PostArrayContext.Provider value={{posts, setPosts}}> */}
      {page ? ( 
        <EditContext.Provider value={{isEdit, setIsEdit, editId, setEditId}}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<AuthPage apiURL={apiURL} />} />
              <Route path="/profile" element={<ProfilePage apiURL={apiURL} />} />
            </Routes>
          </BrowserRouter>
        </EditContext.Provider>
      )
      : 'Loading data...'}
    {/* // </PostArrayContext.Provider> */}
    </>
  );
}