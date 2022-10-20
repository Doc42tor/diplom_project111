import '../index.css'
import search_img from '../img/magnifyier.svg'
import left_arrow from '../img/left-arrow.svg'
import right_arrow from '../img/right-arrow.svg'
import {useState} from "react";
import {findAlbums, getTracks} from '../api/api.js'
import TrackList from "./Tracklist";


const Content = (props) => {
    let [searchValue, setSearchValue] = useState('');
    let [page, setPage] = useState(1)
    let [albumsData, setAlbums] = useState({})

    async function searchAlbum() {
        if (searchValue.length !== 0) {
            setAlbums(await findAlbums(searchValue, 1))
            setPage(1)
            window.scrollTo(0, 0)
        }
    }

    async function incPage() {
        if (searchValue.length !== 0 && albumsData.albums.next != null) {
            setAlbums(await findAlbums(searchValue, page + 1))
            setPage(page + 1)
            window.scrollTo(0, 0)
        }
    }

    async function decPage() {
        if (page > 1 && searchValue.length !== 0) {
            setAlbums(await findAlbums(searchValue, page - 1))
            setPage(page - 1)
            window.scrollTo(0, 0)
        }
    }

    async function setTracks(id) {
        props.SetPopupContent(<TrackList tracks={await getTracks(id)}/>)
    }

    return (
        <div className='spotify-background'>
            <div className="spotify-search">
                <input className="search-inp" type='search' onChange={(e) => {
                    setSearchValue(e.currentTarget.value)
                }} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        searchAlbum()
                    }
                }}/>
                <input className="search-btn bg-img" type='button' style={{backgroundImage: 'url(' + search_img + ')'}}
                       onClick={searchAlbum}/>
            </div>
            <div className='content'>
                {albumsData.albums && albumsData.albums.items.map(item => (
                    <div className="content-item" key={item.id} onClick={(() => {
                        setTracks(item.id)
                    })}>
                        <img src={item.images[1].url} className="album-image" alt='trable with image'/>
                        <h3 className="text-truncate" title={item.name}>{item.name}</h3>
                        <p className="album-description">Дата релиза: {item.release_date}</p>
                    </div>
                ))}
            </div>
            <div className='page-nav sticky-bottom'>
                <div className='page-button bg-img' style={{backgroundImage: 'url(' + left_arrow + ')'}}
                     onClick={decPage}></div>
                <span className='page-counter'>{page}</span>
                <div className='page-button bg-img' style={{backgroundImage: 'url(' + right_arrow + ')'}}
                     onClick={incPage}></div>
            </div>
        </div>
    )
}
export default Content;
