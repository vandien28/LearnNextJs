"use client";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Edit from "../popup/edit";

type Data = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

type Props = {
  data: Data[];
};

export default function TableData(props: Props) {
  const [show, setShow] = useState(false);
  const { data } = props;
  const [editingData, setEditingData] = useState<Data | null>(null);
  const handleEdit = (
    id: number,
    userId: string,
    title: string,
    body: string
  ) => {
    setShow(true);
    setEditingData({ id, userId, title, body });
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có muốn xoá post có id là " + id + " không?")) {
      fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.success("Delete success!");
            mutate("http://localhost:8000/posts");
          } else {
            toast.error("Failed delete!");
          }
        });
    } else {
      toast.warning("Close delete!");
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>userID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th colSpan={3} className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.userId}</td>
                <td>{i.id}</td>
                <td>{i.title}</td>
                <td>{i.body}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(i.id, i.userId, i.title, i.body)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(i.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Edit showPopup={show} setShowPopup={setShow} data={editingData}></Edit>
    </div>
  );
}
