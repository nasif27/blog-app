import { Modal, Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { EditContext } from "../EditContext";
// import { PostArrayContext } from "../PostsArrayContext";

export default function EditPostModal({
    // posts,
    // currentPostsTitle,
    // currentPostsContent, 
    updateModalShow, 
    handleCloseUpdateModal, 
    apiURL
    }) {

    // const editId = localStorage.getItem("editId");
    const editId = useContext(EditContext).editId;

    // const posts = useContext(PostArrayContext).posts;
    // const [posts, setPosts] = useState([]);
    // const currentPosts = posts.filter((post) => post.id === editId)[0];
    // console.log('currentPosts', currentPosts);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    // const [postTitle, setPostTitle] = useState('');
    // const [postContent, setPostContent] = useState('');

    const fetchPostTitle = (url, postId) => {
        axios
        .get(`${url}/postTitle/${postId}`)
        .then((response) => response.data)
        .then((data) => setPostTitle(data))
        .catch((error) => console.error('Error', error));
    };

    const fetchPostContent = (url, postId) => {
        axios
        .get(`${url}/postContent/${postId}`)
        .then((response) => response.data)
        .then((data) => setPostContent(data))
        .catch((error) => console.error('Error', error));
    };

    useEffect(() => {
        if (updateModalShow === 'updatePost') {
            fetchPostTitle(apiURL, editId);
            fetchPostContent(apiURL, editId);
        }
    }, [apiURL, editId, updateModalShow]);

    
    const handleEditPost = (e) => {
        e.preventDefault();

        // get stored JWT token
        const token = localStorage.getItem("authToken");

        // Decode the token to fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id;

        // Prepare data to be sent
        const data = {
            // user_id: userId,
            title: postTitle,
            content: postContent
        }

        // Make API call to create post to DB
        if (userId) {
            axios
            .put(`${apiURL}/posts/${editId}`, data)
            .then((response) => {
                console.log('Success:', response.data);
                handleCloseUpdateModal();
            })
            .catch((error) => {
                console.log("Error", error);
            })
        }
    }

    return (
        <>
            <Modal 
                    show={updateModalShow !== null}
                    onHide={handleCloseUpdateModal}
                    animation={false}
                    centered
                >
                    <Modal.Body className="my-2">
                        <Form 
                            className="d-grid gap-3 px-5"
                            // onSubmit={modalShow === 'CreatePost' ? handleCreatePost : handleCreatePost}
                            onSubmit={handleEditPost}
                        >
                            <h2 className="mb-2" style={{fontWeight: "bold"}}>
                                {/* {modalShow === 'CreatePost' ? 'Create Post' : 'Update Post'} */}
                                Update Post
                            </h2>

                            <p>{editId !== null ? `post id: ${editId}` : ''}</p>

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
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
        </>
    );
}