import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/profile');
    }
    return (
        <>
            <p>This is home page</p>
            <br />
            <Button 
                variant="success"
                onClick={navigateToProfile}
            >Go to profile →
            </Button>
        </>
    )
}