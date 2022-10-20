import React, {useState} from 'react';
import './index.css'
import Content from "./components/Content";
import banner from "./img/Spotify_Logo_CMYK_White.png";
import Popup from "./components/Popup";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({});

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const SetPopupContent = (content: {}) => {
        setContent(content)
        togglePopup()
    }

    return (
        <div className="App spotify-background">
            <header className="sticky-top">
                <div className="spotify-head">
                    <img className="spotify-logo" src={banner} alt='Trable with image'/>
                </div>
            </header>
            <Content SetPopupContent={SetPopupContent}/>
            { isOpen && <Popup content={content} closePopup={togglePopup}/>}
        </div>
    );
}

export default App;
