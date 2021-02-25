export const YesScript = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) => (
  <div {...props} className="yes-script">
    {children}
  </div>
);

export default YesScript;
