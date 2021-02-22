import clsx from "clsx";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
// import { v4 } from "uuid";
import { Breadcrumbs as MuiBreadcrumbs } from "@material-ui/core";

import layout from "ui/styles/layout.scss";

import styles from "./index.scss";

interface BreadcrumbProp {
  id: string;
  to: string;
  label: string;
}

const breadcrumbContext = createContext<{
  breadcrumbs: BreadcrumbProp[];
  setBreadcrumbs: React.Dispatch<React.SetStateAction<BreadcrumbProp[]>>;
}>({ breadcrumbs: [], setBreadcrumbs: () => {} });

const useBreadcrumbs = () => useContext(breadcrumbContext);

const BreadcrumbProviderImpl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbProp[]>([]);

  const value = useMemo(() => ({ breadcrumbs, setBreadcrumbs }), [
    breadcrumbs,
    setBreadcrumbs,
  ]);

  return (
    <breadcrumbContext.Provider value={value}>
      {children}
    </breadcrumbContext.Provider>
  );
};

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <BreadcrumbProviderImpl key="1">{children}</BreadcrumbProviderImpl>;
};

export function Breadcrumbs({
  separator,
}: {
  separator?: string | ReactElement;
}) {
  const { breadcrumbs } = useBreadcrumbs();

  return breadcrumbs.length ? (
    <MuiBreadcrumbs
      data-testid="breadcrumbs"
      aria-label="breadcrumbs"
      separator={separator}
      className={clsx(layout.row, styles.breadcrumbs)}
    >
      {breadcrumbs.map((breadcrumb) => (
        <div key={breadcrumb.to}>
          <NavLink to={breadcrumb.to}>{breadcrumb.label}</NavLink>
        </div>
      ))}
    </MuiBreadcrumbs>
  ) : null;
}

let count = 0;
export const Breadcrumb = ({
  label,
  to,
}: {
  label: BreadcrumbProp["label"];
  to?: BreadcrumbProp["to"];
}) => {
  const [id] = useState(() => `${count++}`);
  const { setBreadcrumbs } = useBreadcrumbs();
  const { url } = useRouteMatch();

  useEffect(() => {
    setBreadcrumbs((bcs) => {
      const clone = [...bcs];
      const index = clone.findIndex((bc) => bc.id === id);
      const insert = index >= 0 ? index : clone.length;
      clone[insert] = { id, label, to: to || url };
      return clone;
    });
  }, [id, setBreadcrumbs, to, label, url]);

  useEffect(() => {
    return () => {
      setBreadcrumbs((bcs) => bcs.filter((bc) => bc.id !== id));
    };
  }, [id, setBreadcrumbs]);

  return null;
};
