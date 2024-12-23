import { useContext, useEffect, useState } from "react";
import { Button, Container, Image, Nav } from "react-bootstrap";
import PostCard from "./PostCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import CreateUpdatePostModal from "./CreateUpdatePostModal";
import { EditContext } from "../EditContext";
import EditPostModal from "./EditPostModal";
import CreatePostModal from "./CreatePostModal";
// import { PostArrayContext } from "../PostsArrayContext";
// import useLocalStorage from "use-local-storage";
// import { useParams } from "react-router-dom";

export default function ProfileMidBody({apiURL}) {
    // const pic = "https://www.veeforu.com/wp-content/uploads/2024/07/Green-color-abstract-sci-fi-design-line-4K-Background.jpg";
    const pic = "https://wallpapers.com/images/hd/naruto-shippuden-characters-zia63mm7yewlsb6r.jpg";
    const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5bw7catRrdLjAh7BBU3F8Nb4Zv2IllPgddA&s";
    
    const [modalShow, setModalShow] = useState(null);

    const handleShowCreatePost = () => setModalShow('CreatePost');
    const handleCloseModal = () => setModalShow(null);

    const [posts, setPosts] = useState([]);     // 1 user, Many posts   [{post.id, post.created_at, post.updated_at, post.title, post.content}]
    // const posts = useContext(PostArrayContext).posts;
    // const setPosts = useContext(PostArrayContext).setPosts;
    const [isAllPost, setIsAllPost] = useState('no');
    
    // const [id, setId] = useLocalStorage('id', '');
    const [id, setId] = useState('');   // id = post id
    const parsedId = parseInt(id);      // change id from string to integer

    const [username, setUsername] = useState("");   // username got from decoded authToken will be passed here
    
    const isEdit = useContext(EditContext).isEdit;
    // const editId = useContext(EditContext).editId;

    const setIsEdit = useContext(EditContext).setIsEdit;
    const setEditId = useContext(EditContext).setEditId;

    const hanldeCloseUpdateModal = () => {
        setIsEdit(null);
        setEditId(null);
    }

    // fetch posts based on user id
    const fetchPosts = (url, userId) => {
        axios
        .get(`${url}/postss/user/${userId}`)
        .then((response) => response.data)
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error:", error));
    };


    const fetchSpecificPost = (url, postId) => {
        axios
        .get(`${url}/postss/${postId}`)
        .then((response) => response.data)
        .then((data) => setPosts(data))
        .catch((error) => console.error('Error', error));
    };

    const triggerAllPostsTrue = () => setIsAllPost('yes');
    const triggerAllPostsFalse = () => setIsAllPost('no');

    const fetchAllPosts = (url) => {
        axios
        .get(`${url}/postss`)
        .then((response) => response.data)
        .then((data) => setPosts(data))
        .catch((error) => console.error('Error', error));
    };

    
    // it will run this 1 time only
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        // check the existence of token in local storage
        if (token) {
            if (isAllPost === 'no') {
                const decode = jwtDecode(token);    // it will return object after decoding the token
                const userId = decode.id;
                const username = decode.username;
                setUsername(username);
                fetchPosts(apiURL, userId);
                // setIsAllPost(false);
            } else {
                fetchAllPosts(apiURL);
            }
        }

        console.log('isAllPosts', isAllPost);

    }, [apiURL, isAllPost]);


    return (
        <>
            <Container className="border">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div style={{width: '100%', height: '300px', overflow: 'hidden'}}>
                        <Image src={pic} fluid style={{height: "100%", width: "100%", objectFit: 'cover', objectPosition: 'top'}} />
                    </div>
                    <br />
                    <Image 
                        src={profilePic} 
                        roundedCircle
                        style={{
                            width: 150,
                            height: 150,
                            position: "absolute",
                            top: "280px",
                            border: "4px solid white"
                        }}
                    />
                    <p style={{marginTop: "50px"}}>{username}</p>
                    <p className="mb-4">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Hic cupiditate veniam iste quaerat dolore fuga. Earum unde 
                        sed quis numquam!
                    </p>
                </div>

                <div className="d-flex gap-1 justify-content-center mb-3">
                    <input 
                        className="rounded"
                        placeholder="Enter post id to filter"
                        type="number"   // number still in the form of string
                        value={id}
                        onChange={(e) => setId(e.target.value)} 
                    />

                    <Button variant="success" onClick={() => fetchSpecificPost(apiURL, parsedId)}>
                        Submit
                    </Button>
                </div>

                <Nav variant="underline" justify>
                    <Nav.Item>
                        <Nav.Link onClick={triggerAllPostsTrue}>All Users&apos; Posts</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link onClick={triggerAllPostsFalse}>My Posts</Nav.Link>
                    </Nav.Item>
                </Nav>

                {posts.map((post) => (
                    <PostCard 
                        key={post.id} 
                        profilePic={profilePic}
                        postId={post.id} 
                        username={post.username}
                        createdDate={post.created_at}
                        updatedDate={post.updated_at}
                        title={post.title}
                        content={post.content}
                        apiURL={apiURL}
                    />
                ))}

                {/* <CreateUpdatePostModal 
                    modalShow={modalShow} 
                    handleCloseModal={handleCloseModal} 
                    apiURL={apiURL}
                /> */}

                <CreatePostModal
                    modalShow={modalShow}
                    handleCloseModal={handleCloseModal}
                    apiURL={apiURL}
                />

                <EditPostModal
                    // key={post.id}
                    // posts={posts}
                    // currentPostsTitle={post.title}
                    // currentPostsContent={post.content} 
                    updateModalShow={isEdit}
                    handleCloseUpdateModal={hanldeCloseUpdateModal}
                    apiURL={apiURL}
                />

            </Container>
            <Button 
                onClick={handleShowCreatePost} 
                style={{position: "fixed", top: "50%", left: '90%'}} 
                className="rounded-circle">
                +
            </Button>
        </>
    );
}