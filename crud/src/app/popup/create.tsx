import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { FormGroup, FormLabel } from "react-bootstrap";

type Props = {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function PopupCreate(props: Props) {
  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleClose = () => {
    props.setShowPopup(false);
    setUserId("");
    setTitle("");
    setBody("");
  };

  const handleSave = () => {
    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, title, body }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          handleClose();
          toast.success("Create success!");
          mutate("http://localhost:8000/posts");
        } else {
          toast.error("Failed create!");
        }
      });
  };

  return (
    <>
      <Modal
        show={props.showPopup}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="userID" className="mb-3">
            <FormLabel>UserId</FormLabel>
            <Form.Control
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="title" className="mb-3">
            <FormLabel>Title</FormLabel>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <Form.Group controlId="body">
            <FormLabel>Body</FormLabel>
            <Form.Control
              value={body}
              onChange={(e) => setBody(e.target.value)}
              as="textarea"
              rows={7}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupCreate;
