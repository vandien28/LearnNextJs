"use client";
import useSWR from "swr";
import Table from "./table/page";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Create from "./popup/create";


export default function Home() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/posts",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>error</div>;
  if (isLoading) return <div>cLoading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button className="w-50 mb-5 mt-5" onClick={() => handleShow()}>
          Create
        </Button>
      </div>
      <Table data={data}></Table>
      <Create showPopup={show} setShowPopup={setShow}></Create>
    </div>
  );
}
