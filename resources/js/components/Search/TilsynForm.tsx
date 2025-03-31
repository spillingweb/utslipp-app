import styles from "./TilsynForm.module.css";

const TilsynForm = () => {
  return (
    <form className={styles.resultForm}>
      <label htmlFor="name">Navn</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="email">E-post</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="phone">Telefon</label>
      <input type="tel" name="phone" id="phone" />
      <label htmlFor="message">Melding</label>
      <textarea name="message" id="message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
};

export default TilsynForm;
