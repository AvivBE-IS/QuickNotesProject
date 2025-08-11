import { format } from "date-fns";

function Note(props) {
  console.log({ props });
  const date = new Date("2025-08-31T12:30:00");
  const formatted = format(date, "MMM do hh:mm a");

  const styles = {
    nameDiv: {
      textAlign: "left",
      color: "rgb(194, 178, 175)",
      fontSize: "7px",
    },
    textDiv: {
      fontSize: "20px",
      textAlign: "left",
    },
    titleDiv: {
      fontSize: "30px",
      textAlign: "left",
      fontWeight: "bold",
    },
  };

  return (
    <div>
      <div style={styles.nameDiv}>{formatted}</div>
      <br />
      <div style={styles.titleDiv}>{props.titleState} </div>
      <br />
      <div style={styles.textDiv}>{props.textState}</div>
    </div>
  );
}

export default Note;
