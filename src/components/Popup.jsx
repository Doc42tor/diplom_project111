const Popup = (props) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.closePopup}>x</span>
                <div className='popup-content'>
                    {props.content}
                </div>
            </div>
        </div>
    );
}
export default Popup;