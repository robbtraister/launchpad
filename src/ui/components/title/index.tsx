import styles from "./styles.scss";

export const Title = ({ children }: { children?: React.ReactNode }) => (
  <div className={styles.header}>
    <div className={styles.hatching} />
    <div className={styles.title}>{children}</div>
  </div>
);

export default Title;
