import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Tooltip from "@material-ui/core/Tooltip";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { BLUETRANSPARENT } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    color: BLUETRANSPARENT,
    cursor: "pointer",
  },
}));
export default function Bookmark({ uid, sourceId, bookCode, chapter }) {
  const classes = useStyles();
  const firebase = useFirebase();
  const [bookmarked, setBookmarked] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState([]);

  useFirebaseConnect(`users/${uid}/bookmarks/${sourceId}/${bookCode}`);
  const firebaseData = useSelector(
    ({ firebase: { data } }) =>
      data.users &&
      data.users[uid] &&
      data.users[uid].bookmarks &&
      data.users[uid].bookmarks[sourceId] &&
      data.users[uid].bookmarks[sourceId][bookCode]
  );
  React.useEffect(() => {
    setBookmarks(firebaseData || []);
  }, [firebaseData]);

  React.useEffect(() => {
    if (Object.keys(bookmarks).length !== 0) {
      setBookmarked(bookmarks.indexOf(parseInt(chapter)) > -1);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, chapter]);

  function toggleBookmark() {
    const newBookmarks = bookmarked
      ? bookmarks.filter((a) => parseInt(a) !== parseInt(chapter))
      : bookmarks.concat([parseInt(chapter)]);
    return firebase
      .ref("users/" + uid + "/bookmarks/" + sourceId + "/" + bookCode)
      .set(newBookmarks, function (error) {});
  }
  return (
    <div onClick={toggleBookmark} className={classes.info}>
      {bookmarked ? (
        <Tooltip title="Bookmarked">
          <BookmarkIcon style={{ color: "#ff0000" }} fontSize="small" />
        </Tooltip>
      ) : (
        <Tooltip title="Add Bookmark">
          <BookmarkBorderIcon fontSize="small" />
        </Tooltip>
      )}
    </div>
  );
}
