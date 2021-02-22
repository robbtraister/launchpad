import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverOrigin,
  Tooltip,
} from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";

const profileAnchorOrigin: PopoverOrigin = {
  horizontal: "right",
  vertical: "center",
};
const profileTransformOrigin: PopoverOrigin = {
  horizontal: "left",
  vertical: "bottom",
};

export function ProfileButton() {
  const [profileButtonEl, setProfileButtonEl] = useState(null);

  const openProfileMenu = useCallback((event) => {
    setProfileButtonEl(event.currentTarget);
  }, []);

  const closeProfileMenu = useCallback(() => {
    setProfileButtonEl(null);
  }, []);

  return (
    <>
      <Tooltip title="Profile" placement="right" arrow>
        <IconButton
          aria-controls="profile-menu"
          aria-haspopup="true"
          aria-label="Account"
          onClick={openProfileMenu}
        >
          <AccountCircleOutlined />
        </IconButton>
      </Tooltip>

      <Popover
        id="profile-menu"
        anchorEl={profileButtonEl}
        anchorOrigin={profileAnchorOrigin}
        keepMounted
        onClose={closeProfileMenu}
        open={Boolean(profileButtonEl)}
        transformOrigin={profileTransformOrigin}
      >
        <MenuList>
          <MenuItem disabled divider>
            user@company.com
          </MenuItem>
          <MenuItem component={Link} to="/account" onClick={closeProfileMenu}>
            Account
          </MenuItem>
          <MenuItem component="a" href="/logout">
            Logout
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
