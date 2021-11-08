import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Badge, IconButton } from "@mui/material";
import { useAuth } from "../../Provider/Auth";
import { useHistory } from "react-router-dom";
import { useCart } from "../../Provider/Cart";
import { BasicModal } from "../Modal";

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { authToken, Logout } = useAuth();
  const { Cart } = useCart();
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            {authToken ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => handleOpen()}
                >
                  <Badge badgeContent={Cart.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                disabled
              >
                <RemoveShoppingCartIcon />
              </IconButton>
            )}

            {authToken ? (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => Logout()}
              >
                <ExitToAppIcon />
              </IconButton>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => handleLogin()}
                >
                  <LoginIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <BasicModal open={open} handleClose={handleClose} />
    </>
  );
}
