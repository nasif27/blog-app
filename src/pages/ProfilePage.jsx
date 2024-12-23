import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileMidBody from "../components/ProfileMidBody";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";

export default function ProfilePage({apiURL}) {
    // const token = localStorage.getItem('authToken');     // for testing only
    const [authToken, setAuthToken] = useLocalStorage('authToken', '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
    }, [authToken, navigate]);

    const handleSignOut = () => {
        setAuthToken('');
    }

    return (
        <>
            <NavBar handleSignOut={handleSignOut} />
            <ProfileMidBody apiURL={apiURL} />
        </>
    )
}