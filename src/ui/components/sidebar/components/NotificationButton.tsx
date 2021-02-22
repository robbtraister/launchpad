import { IconButton, Tooltip } from "@material-ui/core";
import { Notifications } from "@material-ui/icons";

export function NotificationButton() {
  return (
    <Tooltip title="Notifications" placement="right" arrow>
      <IconButton aria-label="Notifications">
        <Notifications />
      </IconButton>
    </Tooltip>
  );
}
