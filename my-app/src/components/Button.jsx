function Button(props) {
  const buttonStyle = {
    display: "inline-block",

    border: "2px solid #333",
    width: "165px",
    borderRadius: "4px",
    backgroundColor: "#f0f0f0",
    padding: "8px 12px",
    fontSize: "16px",
    textAlign: "center",
    cursor: "pointer",
    whiteSpace: "normal",
    overflow: "hidden",
  };

  return (
    <div>
      <button style={buttonStyle} onClick={props.onClick}>
        Add
      </button>
    </div>
  );
}

export default Button;
