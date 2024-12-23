import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function AuthPage({apiURL}) {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => {
        setModalShow('SignUp');
    };

    const handleShowSignIn = () => {
        setModalShow('SignIn');
    };

    const handleClose = () => {
        setModalShow(null);
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [emailUsername, setEmailUsername] = useState(null);
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useLocalStorage('authToken', '');
    
    const navigate = useNavigate();
    
    // if auth token exist, navigate to profile page
    useEffect(() => {
        if (authToken) {
            navigate('/profile');
        }
    }, [authToken, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${apiURL}/signup`, {username, email, password});
            console.log(res.data);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignIn = async (e) => {
        e. preventDefault();

        try {
            const res = await axios.post(`${apiURL}/signin`, {username, email, password});
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log('Sign in was successfull, token saved');
                handleClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* <div className="d-flex m-4 p-4 border justify-content-center"> */}
            <Row style={{height: '100vh'}}>
                <Col 
                    className="bg-primary text-white d-flex flex-column justify-content-center align-items-center"
                >
                    <h1>MyBlog</h1><br />
                    <h2>Bring the distant closer</h2>
                    <p>Use this web app to connect with people and share your insights</p>
                </Col>

                <Col 
                    className="d-flex flex-column border gap-2 justify-content-center align-items-center"
                >
                    {/* <div className="d-flex flex-column border gap-4 justify-content-center align-items-center"> */}
                        <p>If you do not have an account yet, please click Sign Up button to register.</p>
                        <Button onClick={handleShowSignUp}>Sign Up</Button><br />
                        
                        <p>Already have an account? Please Sign In to enter your profile page.</p>
                        <Button onClick={handleShowSignIn}>Sign In</Button>
                    {/* </div> */}
                </Col>
            </Row>

            <Modal 
                show={modalShow !== null}   // Modal will only appear if modalShow is not equal to NULL
                onHide={handleClose}
                animation={false}       // animation is turned off to avoid button label & modal title to change slightly
                centered
            >
                <Modal.Body className="my-2">

                    <Form 
                        className="d-grid gap-2 px-5" 
                        onSubmit={modalShow === 'SignUp' ? handleSignUp : handleSignIn}
                    >
                        <h2 className="mb-4" style={{fontWeight: "bold"}}>
                            {modalShow === 'SignUp' ? 'Sign Up Account' : 'Sign in to your account'}
                        </h2>
                        <Form.Group>
                            <Form.Control 
                                type="username"
                                placeholder="Enter your username"
                                // value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group hidden={modalShow === 'SignIn'}>
                            {/* <Form.Control 
                                type="email"
                                placeholder={modalShow === 'SignUp' ? 'Enter your email' : 'Enter your email/username'}
                                value={modalShow === 'SignUp' ? email : emailUsername}
                                onChange={modalShow === 'SignUp' ? (e) => setEmail(e.target.value) : (e) => setEmailUsername(e.target.value)}
                                required
                            /> */}

                            <Form.Control
                                type="email"
                                placeholder='Enter your email'
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={modalShow === 'SignUp'}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                type="password"
                                placeholder="Enter your password"
                                // value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="mt-3" type="submit">{modalShow === 'SignUp' ? 'Sign Up' : 'Sign In'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        
            {/* </div> */}
        </>
    );
}