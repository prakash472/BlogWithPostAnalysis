import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { Modal, Button } from "antd";

const DeletePost = () => {
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = () => {
    setIsModalVisible(false);
    axiosInstance
      .delete("customuser/delete/posts/" + id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        /*  history.push({
          pathname: "/home/",
        }); */
        //   window.location.reload();
      });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <main className="home">
      <section className="container">
        <div
          className="row"
          style={{
            paddingTop: "10px",
          }}
        >
          <>
            <Button type="primary" onClick={showModal}>
              Delete
            </Button>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete post?</p>
            </Modal>
          </>
        </div>
      </section>
    </main>
  );
};

export default DeletePost;
