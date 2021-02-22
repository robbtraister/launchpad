import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import {
  Assignment,
  ExpandLess,
  ExpandMore,
  SettingsOverscan,
  Storage,
  TableChart,
} from "@material-ui/icons";

import styles from "../index.scss";

function LinkItem({
  children,
  text,
  to,
  tooltip,
}: {
  children: React.ReactChild;
  text: string;
  to: string;
  tooltip?: boolean;
}) {
  return (
    <Tooltip
      title={text}
      placement="right"
      arrow
      disableFocusListener={!tooltip}
      disableHoverListener={!tooltip}
      disableTouchListener={!tooltip}
    >
      <ListItem button className={styles.listItem} component={NavLink} to={to}>
        <ListItemIcon className={styles.listItemIcon}>{children}</ListItemIcon>
        <ListItemText className={styles.listItemText} primary={text} />
      </ListItem>
    </Tooltip>
  );
}

export function LinkList({ collapsed }: { collapsed?: boolean }) {
  const [assetsOpen, setAssetsOpen] = useState(false);

  const toggleAssets = useCallback(() => {
    setAssetsOpen((v) => !v);
  }, []);

  return (
    <List className={styles.list}>
      <LinkItem text="Summary" to="/summary" tooltip={collapsed}>
        <Assignment />
      </LinkItem>
      <LinkItem text="Workspaces" to="/workspaces" tooltip={collapsed}>
        <SettingsOverscan />
      </LinkItem>
      <ListItem button className={styles.listItem} onClick={toggleAssets}>
        <ListItemIcon className={styles.listItemIcon}>
          <Storage />
        </ListItemIcon>
        <ListItemText className={styles.listItemText} primary="Assets" />
        {collapsed ? null : assetsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={assetsOpen || collapsed} timeout="auto" unmountOnExit>
        <List disablePadding>
          <LinkItem text="Datasets" to="/datasets" tooltip={collapsed}>
            <SettingsOverscan />
          </LinkItem>
          <LinkItem text="Tables" to="/tables" tooltip={collapsed}>
            <TableChart />
          </LinkItem>
          <LinkItem text="Predictors" to="/predictors" tooltip={collapsed}>
            <SettingsOverscan />
          </LinkItem>
        </List>
      </Collapse>
    </List>
  );
}
