import styles from "./SearchBox.module.css";

const SearchBox = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className={styles.text}>Wyszukaj kontakt</label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
