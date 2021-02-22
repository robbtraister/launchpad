import clsx from "clsx";
import { useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Divider, IconButton, Tooltip } from "@material-ui/core";
import { UnfoldMore } from "@material-ui/icons";

import layout from "ui/styles/layout.scss";

import { HomeButton } from "./components/HomeButton";
import { LinkList } from "./components/LinkList";
import { NotificationButton } from "./components/NotificationButton";
import { ProfileButton } from "./components/ProfileButton";

import styles from "./index.scss";

const collapseButtonClasses = {
  root: styles.collapseButton,
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const onToggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);

  return (
    <>
      <div
        data-testid="sidebar"
        className={clsx(layout.column, layout.spaceBetween, styles.sidebar, {
          [styles.collapsed]: collapsed,
        })}
      >
        <div className={clsx(layout.column)}>
          <div>
            <HomeButton />
          </div>
          <Divider />
          <Switch>
            <Route path="/account" />
            <Route>
              <LinkList collapsed={collapsed} />
            </Route>
          </Switch>
        </div>
        <div className={clsx(layout.column)}>
          <div>
            <Switch>
              <Route path="/account" />
              <Route>
                <NotificationButton />
              </Route>
            </Switch>
          </div>
          <div className={clsx(layout.row, layout.spaceBetween, layout.wrap)}>
            <ProfileButton />

            <Tooltip
              title={collapsed ? "Expand" : "Collapse"}
              placement="right"
              arrow
            >
              <IconButton
                aria-label="Collapse"
                classes={collapseButtonClasses}
                onClick={onToggleCollapsed}
              >
                <UnfoldMore />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
