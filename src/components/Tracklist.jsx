import play from '../img/play.svg'

const TrackList = (props) => {
    console.log(props)
    return (
        <div>
            {props.tracks && props.tracks.items.map(item => (
                <div className='track-wrap' key={item.id}>
                    <span className='track-num'>{item.track_number}</span>
                    <span className='track-name'>{item.name}</span>
                    <span className='track-dur'>{item.duration_ms}</span>
                    <a href={item.external_urls.spotify}><img className='track-play' src={play} alt='Trable with image'></img></a>
                </div>
            ))}
        </div>
    )
}

export default TrackList;
