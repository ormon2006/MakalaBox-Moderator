import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import user from "../../images/user (2).png";
import HeaderNotSearch from "../HeaderNonSearch/HeaderNonSearch";
import dayjs from "dayjs";
import "./ExaminationArticle.scss";
import $api from "../../../http";
import LoadingAnimation from "../Loading/Loading";
import ArticleViewer from "../BlockNote/BlockNote";
import ActionButtons from "../ActionBtn/ActionBtn";

const ExaminationArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articleVisible, setArticleVisible] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [moderatorComment, setModeratorComment] = useState(""); // Новое состояние

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [post, setPost] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [preLoad, setPreLoad] = useState(false);

  useEffect(() => {
    setPreLoad(true);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await $api.get(`articles/moderation/${id}/`);
        setPost(response.data);
        setIsSuccess(true);
      } catch (e) {
        console.log(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleApprove = async () => {
    try {
      await $api.patch(`articles/moderation/${id}/`, { status: "approved" });
      showMessage("Статья успешно одобрена", "green");
      navigateAfterDelay(`/moderator-page`, 3000);
    } catch (error) {
      console.error("Ошибка при одобрении статьи:", error);
      showMessage("Ошибка при одобрении статьи", "red");
    }
  };

  const handleReject = async () => {
    try {
      await $api.patch(`articles/moderation/${id}/`, {
        status: "rejected",
        moderatorComment,
      });
      showMessage("Статья успешно отклонена", "red");
      navigateAfterDelay(`/moderator-page`, 3000);
    } catch (error) {
      console.error("Ошибка при отклонении статьи:", error);
      showMessage("Ошибка при отклонении статьи", "red");
    }
  };

  const handleAction = (action) => {
    setConfirmAction(action);
    setDialogOpen(true);
  };

  const handleDialogClose = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      if (confirmAction === "reject") {
        setArticleVisible(false);
        showMessage("Вы отклонили статью", "red");
        navigateAfterDelay(`/moderator-page`, 3000);
      } else if (confirmAction === "publish") {
        setArticleVisible(false);
        showMessage("Вы дали разрешение на публикацию статьи", "green");
        navigateAfterDelay("/moderator-page", 3000);
      }
    }
    setConfirmAction(null);
  };

  const showMessage = (text, color) => {
    setMessageText(text);
    setMessageColor(color);
    setOpenSnackbar(true);
  };

  const navigateAfterDelay = (path, delay) => {
    setTimeout(() => {
      navigate(path);
    }, delay);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  if (isError) {
    return <div>При получении данных произошла ошибка</div>;
  }

  if (!post) {
    return <div>Нет статей для проверки</div>;
  }

  return (
    isSuccess && (
      <>
        <main>
          <HeaderNotSearch />
          <section className="ExaminationArticle__section">
            <div className="container">
              <div className="ExaminationArticle__content">
                {/* <div className="ExaminationArticle__photo">
                  <img src={post.photo} alt="" />
                </div> */}
                <div className="ExaminationArticle__flex">
                  <div className="ExaminationArticle__avatar">
                    <img
                      src={post.author.photo || user}
                      alt="Author Avatar"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="ExaminationArticle__author">
                      <h3>{post.author.fullName}</h3>
                      <p className="date__p">
                        {dayjs(post.created)
                          .locale("ru")
                          .format("DD MMM, HH:MM, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
                  {" "}
                  <div className="ExaminationArticle__organization">
                    <h4>Организация</h4>
                    <div className="ExaminationArticle__org">
                      <ul>
                        <li>{post.organization.name}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ExaminationArticle__category">
                    <h4>Категории</h4>
                    <div className="ExaminationArticle__categories">
                      <ul>
                        {post.categories &&
                          post.categories.map((category, index) => (
                            <li  key={index}>
                              {category}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                <hr />
                <h2 className="ExaminationArticle__title">{post.title}</h2>

                <div className="ExaminationArticle__text">
                  {preLoad ? <ArticleViewer body={post.body} /> : null}
                </div>
              </div>
              <ActionButtons
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleAction={handleAction}
                articleId={id}
                articleVisible={articleVisible}
                confirmAction={confirmAction}
                setConfirmAction={setConfirmAction}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                moderatorComment={moderatorComment} // Передаем `moderatorComment`
                setModeratorComment={setModeratorComment} // Передаем `setModeratorComment`
                handleDialogClose={handleDialogClose}
                openSnackbar={openSnackbar}
                handleCloseSnackbar={handleCloseSnackbar}
                messageText={messageText}
                messageColor={messageColor}
              />
            </div>
          </section>
        </main>
      </>
    )
  );
};

export default ExaminationArticle;
