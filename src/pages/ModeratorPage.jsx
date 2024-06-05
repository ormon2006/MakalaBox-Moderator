import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../assets/components/Header/Header";
import ProfileForm from "../assets/components/ProfileForm/ProfileForm";
import Published from "../assets/components/Published/Published";
import $api from "../http";
import { Context } from "../main";
import LoadingAnimation from "../assets/components/Loading/Loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ModeratorPage = () => {
  const { store } = useContext(Context);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (location.state && location.state.loginSuccess) {
      setOpenSnackbar(true);
    }
  }, [location]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await $api.get(`articles/moderation/`);
        const fetchedPosts = response.data.results;
        setPosts(fetchedPosts);
        localStorage.setItem("cachedPosts", JSON.stringify(fetchedPosts));
        setIsLoading(false);
      } catch (e) {
        if (e.response?.status === 401) {
          await store.checkAuth();
        } else {
          console.log(e);
          setError("Ошибка загрузки данных");
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
  }, [store]); // Добавляем 'store' в массив зависимостей

  return (
    <>
      <div>
        {isLoading ? (
          <LoadingAnimation />
        ) : error ? (
          <p>Ошибка: {error}</p>
        ) : (
          <>
            <Header />
            <ProfileForm />
            <Published posts={posts} />
            <Snackbar
              open={openSnackbar}
              autoHideDuration={600}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success">
                Вы успешно вошли
              </Alert>
            </Snackbar>
          </>
        )}
      </div>
    </>
  );
};

export default ModeratorPage;
