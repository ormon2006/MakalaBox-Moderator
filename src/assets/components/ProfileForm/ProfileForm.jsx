import { useState, useEffect, useRef, forwardRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./ProfileForm.scss";
import avatar from "../../images/Profile-ava.png";
import download from "../../images/download.png";
import trash from "../../images/trash.png";
import edit from "../../images/edit.png";
import person1 from "../../images/person1.png";
import person2 from "../../images/person2.png";
import person3 from "../../images/person3.png";
import person4 from "../../images/person4.png";
import person5 from "../../images/person5.png";
import person6 from "../../images/person6.png";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Personal = () => {
  const [firstName, setFirstName] = useState("Введите ваше фамилие");
  const [lastName, setLastName] = useState("Введеите ваше имя");
  const [nickname, setNickname] = useState("moderator");
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0); // добавили состояние для угла поворота
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isSelectingAvatar, setIsSelectingAvatar] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openEditSnackbar, setOpenEditSnackbar] = useState(false);
  const [openResetSnackbar, setOpenResetSnackbar] = useState(false);
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    const newUser = { firstName, lastName, nickname, selectedImage, scale, rotate };
    setUsers([...users, newUser]);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("nickname", nickname);

    if (selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
      localStorage.setItem('scale', scale)
      localStorage.setItem('rotate', rotate)
      console.log("Setting rotate in localStorage:", rotate);
      console.log("Setting scale in localStorage:", scale);
    }
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
    setIsEditingNickname(false);

    setOpenSnackbar(true);
  };

  const handleReset = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("nickname");
    localStorage.removeItem("selectedImage");
    setFirstName("Ваше Фамилия");
    setLastName("Ваше Имя");
    setNickname("moderator");
    setSelectedImage(null);
    setScale(1);
    setRotate(0); // сброс угла поворота при сбросе
  };

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedNickname = localStorage.getItem("nickname");
    const storedImage = localStorage.getItem("selectedImage");
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedNickname) setNickname(storedNickname);
    if (storedImage) setSelectedImage(storedImage);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleResetClick = () => {
    setOpenResetSnackbar(true);
  };

  const handleButtonClickReset = () => {
    handleResetClick();
    handleReset();
  };

  const handleScaleChange = (newScale) => {
    setScale(newScale);
  };

  const handleRotateChange = (newRotate) => {
    setRotate(newRotate);
  };

  const handleAvatarSelect = (image) => {
    setSelectedImage(image);
    setIsSelectingAvatar(false);
  };

  const handleBtnEdit = () => {
    setIsEditingFirstName(!isEditingFirstName);
    setIsEditingLastName(!isEditingLastName);
    setIsEditingNickname(!isEditingNickname);
    setOpenEditSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <main>
        <section className="ProfileForm__section">
          <div className="container">
            <div className="ProfileForm__flex">
              <div className="ProfileForm__avatar">
                {isLoading ? (
                  <img src={avatar} alt="Avatar" />
                ) : (
                  <div className="ProfileForm__ava-img">
                    {selectedImage ? (
                      <AvatarEditor
                        ref={editorRef}
                        image={selectedImage}
                        width={199}
                        height={199}
                        border={50}
                        color={[255, 255, 255, 0.6]}
                        scale={scale}
                        rotate={rotate} // передаем угол поворота
                      />
                    ) : (
                      <img src={avatar} alt="Avatar" />
                    )}
                  </div>
                )}

                <div className="setting__form">
                  <div className="avatar__flex">
                    <div className="add__avatar">
                      <label htmlFor="fileInput">
                        <p>Добавить фото</p>
                        <img src={download} alt="Download" />
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="remove__avatar">
                      <p onClick={() => setSelectedImage(null)}>Удалить</p>
                      <img src={trash} alt="Trash" />
                    </div>
                  </div>

                  <div className="avatar__flex-one">
                    <div className="add__avatar">
                      <label htmlFor="fileInput">
                        <p>Добавить фото</p>
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="remove__avatar">
                      <p onClick={() => setSelectedImage(null)}>Удалить</p>
                    </div>
                  </div>
                  <div className="ProfileForm-scale">
                    <div
                      className="ProfileForm__scale"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <label htmlFor="">Масштаб</label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) =>
                          handleScaleChange(parseFloat(e.target.value))
                        }
                      />
                    </div>
                    <div
                      className="ProfileForm__rotate"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <label htmlFor="">Поворот</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={rotate}
                        onChange={(e) =>
                          handleRotateChange(parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="ProfileForm__select-avatar">
                    <button
                      style={{
                        padding: "10px",
                        background: "none",
                        borderRadius: "15px",
                        border: "1px solid black",
                      }}
                      onClick={() => setIsSelectingAvatar(!isSelectingAvatar)}
                    >
                      Выбрать аватар
                    </button>
                    {isSelectingAvatar && (
                      <div className="avatar-selection">
                        {[
                          person1,
                          person2,
                          person3,
                          person4,
                          person5,
                          person6,
                        ].map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Person ${index + 1}`}
                            onClick={() => handleAvatarSelect(img)}
                            className="avatar-option"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="ProfileForm__nick">
                <form action="">
                  <div className="ProfileForm__surname">
                    <label htmlFor="">Фамилия</label>
                    <div className="ProfileForm__input-container">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        readOnly={!isEditingLastName}
                      />
                    </div>
                  </div>
                  <div className="ProfileForm__name">
                    <label htmlFor="">Имя</label>
                    <div className="ProfileForm__input-container">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        readOnly={!isEditingFirstName}
                      />
                    </div>
                  </div>
                  <div className="ProfileForm__nickname">
                    <label htmlFor="">Никнейм</label>
                    <div className="ProfileForm__input-container">
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        readOnly={!isEditingNickname}
                      />
                    </div>
                  </div>
                  <div className="ProfileForm__btn">
                    <button
                      style={{}}
                      className="ProfileForm__reset"
                      type="button"
                      onClick={handleButtonClickReset}
                    >
                      Сбросить
                    </button>

                    <button
                      className="ProfileForm__saved"
                      type="button"
                      onClick={handleSave}
                    >
                      Сохранить
                    </button>
                    <button
                      className="ProfileForm__edit"
                      type="button"
                      onClick={handleBtnEdit}
                    >
                      Редактировать
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Ваши данные сохранены!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openEditSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenEditSnackbar(false)}
      >
        <Alert onClose={() => setOpenEditSnackbar(false)} severity="info">
          Вы можете редактировать профиль
        </Alert>
      </Snackbar>
      <Snackbar
        open={openResetSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenResetSnackbar(false)}
      >
        <Alert onClose={() => setOpenResetSnackbar(false)} severity="info">
          Ваши данные сброшены
        </Alert>
      </Snackbar>
    </>
  );
};

Alert.displayName = "Alert";

export default Personal;
