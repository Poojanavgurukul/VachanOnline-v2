import React from "react";
import { AppBar, Box, makeStyles, Toolbar } from "@material-ui/core";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import * as actions from "../../store/actions";

import SideDrawer from "../Drawer/Drawer";
import { connect } from "react-redux";
const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
    boxShadow: "0 -1px 4px #7e7676",
  },
  text: {
    fontSize: 10,
    margin: "2px 5px",
    padding: "0 2px",
    whiteSpace: "nowrap",
  },
}));

const BottomBar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <div className="bottomBar">
          <MenuItem
            icon="import_contacts"
            title="Parallel Bible"
            item={views.PARALLELBIBLE}
            base="bottom"
          />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.COMMENTARY}
            base="bottom"
          />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="search"
            title="Search"
            item={views.SEARCH}
            base="bottom"
          />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="event"
            title="Reading Plans"
            item={views.READINGPLANS}
            base="bottom"
          />
        </div>
        <div className="bottomBar" onClick={toggleDrawer("right", true)}>
          <MenuItem icon="more_vert" title="Menu" base="bottom" />
        </div>
      </Toolbar>
      <SideDrawer
        toggleDrawer={toggleDrawer}
        state={state}
        login={props.login}
        userDetails={props.userDetails}
      />
    </AppBar>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(null, mapDispatchToProps)(BottomBar);