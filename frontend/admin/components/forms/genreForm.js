import styles from "./form.module.css";

const GenreForm = ({ title, handleSubmit, handleChange, genre }) => {
  return (
    <div className={styles.addContent}>
      <h1 className={styles.addContentTitle}> {title} Genre</h1>
      <form className={styles.addContentForm}>
        <div className={styles.addContentItem}>
          <label>Name</label>
          <input
            name="genre"
            type="text"
            placeholder={genre && genre.genre ? genre.genre : "Genre"}
            onChange={handleChange}
          />
        </div>

        <div className={styles.addContentItem}>
          <button onClick={handleSubmit} className={styles.addContentButton}>
            {title}
          </button>
        </div>
      </form>
    </div>
  );
};
export default GenreForm;
