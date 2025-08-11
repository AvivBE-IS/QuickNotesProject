import { format } from "date-fns";
import "./Note.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function Note(props) {
  const date = new Date("2025-08-31T12:30:00");
  const formatted = format(date, "MMM do hh:mm a");

  const deleteNote = () => {
    props.handleDelete(props.id);
    close(); // Close modal after deleting
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        withCloseButton={false}
        styles={{
          content: {
            marginLeft: "-500px", // shift left
            marginTop: "20px", // optional offset from top
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div className="noteContainer" style={{ width: "50%" }}>
          <div className="headerRow">
            <div className="noteDate">{formatted}</div>
            <button
              className="closeButton"
              aria-label="Close note"
              onClick={deleteNote}
            >
              ×
            </button>
          </div>
          <div className="noteTitle">{props.titleState}</div>
          <div className="noteText">{props.textState}</div>
        </div>
      </Modal>

      {/* Note card — clicking anywhere opens modal */}
      <div
        className="noteContainer"
        onClick={open}
        style={{ cursor: "pointer" }}
      >
        <div className="headerRow">
          <div className="noteDate">{formatted}</div>
          <button
            className="closeButton"
            aria-label="Close note"
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal from opening
              deleteNote();
            }}
          >
            ×
          </button>
        </div>
        <div className="noteTitle">{props.titleState}</div>
        <div className="noteText">{props.textState}</div>
      </div>
    </>
  );
}

export default Note;
