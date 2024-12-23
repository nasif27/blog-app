import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";

export default function CreateUpdatePostModal({modalShow, handleCloseModal, apiURL}) {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const handleCreatePost = (e) => {
        e.preventDefault();
        // get stored JWT token
        const token = localStorage.getItem("authToken");

        // Decode the token to fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id;

        // Prepare data to be sent
        const data = {
            user_id: userId,
            title: postTitle,
            content: postContent
        }

        // Make API call to create post to DB
        axios
        .post(`${apiURL}/posts`, data)
        .then((response) => {
            console.log('Success:', response.data);
            handleCloseModal();
        })
        .catch((error) => {
            console.log("Error", error);
        })
    }


    return (
        <>
            <Modal 
                    show={modalShow !== null}
                    onHide={handleCloseModal}
                    animation={false}
                    centered
                >
                    <Modal.Body className="my-2">
                        <Form 
                            className="d-grid gap-3 px-5"
                            // onSubmit={modalShow === 'CreatePost' ? handleCreatePost : () => handleEditPost(event, postId)}
                            onSubmit={handleCreatePost}
                        >
                            <h2 className="mb-2" style={{fontWeight: "bold"}}>
                                {/* {modalShow === 'CreatePost' ? 'Create Post' : 'Update Post'} */}
                                Create Post
                            </h2>

                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>
        
                            <Form.Group>
                                <Form.Label>Content</Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    rows={3}
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button className="mt-3" type="submit">
                                {/* {modalShow === 'CreatePost' ? 'Post' : 'Update'} */}
                                Post
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
        </>
    );
}