import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import { Apple } from "@material-ui/icons";

export function HomeButton() {
  return (
    <Tooltip title="Home" placement="right" arrow>
      <IconButton component={Link} to="/">
        <Apple />
      </IconButton>
    </Tooltip>
  );
}
