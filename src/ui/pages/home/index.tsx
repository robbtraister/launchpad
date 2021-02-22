import clsx from "clsx";

import layout from "ui/styles/layout.scss";

import { Table } from "./table";

export function Home() {
  return (
    <div className={clsx(layout.fill, layout.column, layout.centeredContent)}>
      <Table />
    </div>
  );
}
