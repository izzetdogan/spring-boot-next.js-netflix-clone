import styles from "./form.module.css";
const UserForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form className={styles.addContentForm}>
      <div className={styles.addContentItem}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder={user ? user.name : "Name"}
          onChange={handleChange}
        />
      </div>
      <div className={styles.addContentItem}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder={user ? user.email : "@mail.com"}
          onChange={handleChange}
          disabled={user ? true : false}
        />
      </div>
      {!user && (
        <div className={styles.addContentItem}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
      )}

      <div className={styles.addContentItem}>
        <label>Admin</label>
        <select
          name="isAdmin"
          className={styles.addContentSelect}
          onChange={handleChange}
        >
          <option value=" ">Type</option>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      <div className={styles.addContentItem}>
        <button onClick={handleSubmit} className={styles.addContentButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
