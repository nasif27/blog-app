import axios from "axios";
// import { useState } from "react";
// import { jwtDecode } from "jwt-decode";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
// import { useContext, useEffect } from "react";
import { useContext } from "react";
import { EditContext } from "../EditContext";
import { jwtDecode } from "jwt-decode";

export default function PostCard({
        profilePic, 
        postId, 
        username, 
        createdDate, 
        updatedDate, 
        title, 
        content, 
        apiURL
    }) {
    
    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    // const userId = decode.id;
    const usernameFromToken = decode.username;

    const setIsEdit = useContext(EditContext).setIsEdit;
    const setEditId = useContext(EditContext).setEditId;

    const handleShowUpdateModal = () => {
        if (username === usernameFromToken) {
            setIsEdit('updatePost');
            setEditId(postId);
        }
    }

    const handleDeletePost = async (id) => {
        try {
            if (username === usernameFromToken) {
                const res = await axios.delete(`${apiURL}/posts/${id}`);
                console.log('item deleted successfully', res.data);
            }
        } catch (error) {
            console.error('error', error)    
        }
    };

    const formattedCreatedDate = new Date(createdDate).toLocaleDateString('en-GB');
    const formattedUpdatedDate = new Date(updatedDate).toLocaleDateString('en-GB');

    return (
        <>
            <Card className="mb-2">
                <Card.Body>
                    <Row>
                        <Col className="d-flex">
                            <Image 
                                src={profilePic} 
                                roundedCircle
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: "4px solid blue"
                                }}
                            />

                            <Container className="m-0">
                                <p className="m-0">{username}</p>
                                <div className="d-flex gap-2">
                                    <p className="m-0">Created: {formattedCreatedDate}</p>
                                    <p className="m-0" style={{display: updatedDate === null ? 'none' : ''}}>Edited: {formattedUpdatedDate}</p>
                                </div>
                            </Container>
                        </Col>

                        <Col className="d-flex gap-4 justify-content-end">
                            <i 
                                className="bi bi-pencil-square"
                                style={{display: username !== usernameFromToken ? 'none' : ''}}
                                onClick={handleShowUpdateModal}
                                >
                            </i>
                            
                            <i 
                                className="bi bi-trash-fill" 
                                style={{display: username !== usernameFromToken ? 'none' : ''}}
                                onClick={() => handleDeletePost(postId)}
                                >
                            </i>
                        </Col>
                    </Row>

                    <Card.Title className="mt-3">{title}</Card.Title>

                    <Card.Text>{content}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}