import clsx from "clsx";
import styles from "./styles.scss";

export const Widget = ({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx(styles.widget, className)} {...props}>
    {children}
  </div>
);

export default Widget;
