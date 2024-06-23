import { useState, useRef, useEffect } from 'react';
import './css/App.css';
import Header from './components/Header';
import Famifox  from "./img/famifox.webp"
import Nunex  from "./img/nunex.webp"
import backgroundVideo from "./video/StudioBrosBackgroundVideo.mp4"
import { getAccessToken } from './service/spotifyCallBacks';
import { artistApi} from './Services/apiLink.js'
import { FaSpotify } from "react-icons/fa";

function App() { 

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getAccessToken().then(token => setAccessToken(token));

  }, );

  const handleLogin = () => {
    window.location = getAuthUrl();
  };

  return (
    <>
      {accessToken ? (
        <StudioBrosData accessToken={accessToken} />
      ) : (
        <div className="flex h-screen items-center bg-gray-200 justify-center">
          <div className="border-gray-900 h-20 w-20 animate-spin rounded-full border-8 border-t-black" />
        </div>
      )}
    </>
  );
};

  const StudioBrosData = ({ accessToken }) => {
    
    const [artistData, setArtistData] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    const videoRef = useRef(null);

    useEffect(() => {
      fetch(artistApi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const artist = data.artists.items[0];
          setArtistData(artist);
          return artist.id;
        })
        .then(artistId => fetchAlbumsWithCoverImages(artistId, accessToken))
        .then(albumsWithCovers => setAlbums(albumsWithCovers));

        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }

    }, [accessToken]);
  
    const fetchAlbums = async (artistId, token) => {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.items;
    };

    const fetchAlbumsWithCoverImages = async (artistId, token) => {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.items.filter(album => album.images && album.images.length > 0);
    };
  
    const fetchTracksFromAlbums = async (albums, token) => {
      const allTracks = [];
      for (const album of albums) {
        const response = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?limit=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        allTracks.push(...data.items.map(track => ({ ...track, albumCover: album.images[0].url })));
      }
      return allTracks;
    };

  if (!artistData) 
    return(
      <>
          <div className="flex h-screen items-center bg-gray-900 justify-center">
            <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-black" />
          </div>
      </>
    );

  return (
    <>
      <Header />
        <main >     
            {/* Background Image */}
            <section className="flex justify-center items-center w-screen bg-black h-screen overflow-hidden relative">
              {/* Video Background */}
              <video 
                ref={videoRef}
                src={backgroundVideo} 
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-10" 
              />

              {/* Shadow Layer */}
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"></div>

              {/* Content Layer */}
              <div className="relative z-30 text-white text-center">
                <h1 className="text-8xl  custom-stroke">Studio Bros</h1>
                <a href="#about-us">
                  <button className='p-4 border-white border-2 hover:bg-white hover:text-black transition-all duration-300 rounded-md bg-transparent mt-10 w-80 text-white font-bold text-xl '>
                    Explore
                  </button>
                </a>

              </div>
            </section>


            <section className="z-10 " > 
              
              <h1 id='about-us' className='pt-40 mb-8 text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>About Us</h1>

              {/* First Paragraph */}
              <div className='flex flex-col md:flex-row justify-center h-auto md:h-[400px]'>
                <div className='flex flex-col md:flex-row items-stretch w-full md:w-2/3'>
                  <div className='w-full p-8 md:w-1/2'>
                    <p className="text-justify sm:text-center md:text-left">
                      Fábio Miguel, known as "Famifox", and Miguel Batista, known as "Nunex" are a 
                      dynamic duo of young artists hailing from the vibrant city of Lisbon.
                      Both born and raised in Quinta do Mocho neighborhood with Santomean roots, 
                      they share a lifelong friendship and a common vision of bringing their musical dreams to life.
                      <br/><br/>
                      Their journey into the world of music began in 2007 when they founded Alto Nível Produções, 
                      an inspired project blending traditional African rhythms with modern electronic elements. 
                      Fueled by their unwavering passion for music, they honed their craft within the confines of their own bedrooms.
                    </p>
                  </div>
                  <div className='w-full p-8 md:w-1/2 flex items-center drop-shadow-xl'>
                    <img src={Famifox} className="object-cover h-full w-full" alt="Famifox" />
                  </div>
                </div>
              </div>
\
              {/* Second Paragraph */}
              <div className='flex flex-col md:flex-row justify-center h-auto md:h-[400px]'>
                <div className='flex flex-col md:flex-row items-stretch w-full md:w-2/3'>
                  <div className='w-full p-8 md:w-1/2 flex items-center drop-shadow-xl'>
                      <img src={Nunex} className="object-cover h-full w-full drop-shadow-xl" alt="Nunex" />              
                  </div>
                  <div className='w-full p-8 md:w-1/2'>
                    <p className="text-justify sm:text-center md:text-left">
                      Among their impressive repertoire, one track in particular set the dance floors ablaze: 
                      "Kapiro." This infectious composition, characterized by its mesmerizing guitar melodies 
                      and pulsating percussion beats, quickly became a summer sensation in 2017. The track earned 
                      recognition and support from some of the industry's most esteemed figures, including Boddhi
                      Satva, Djeff Afrozila, Manoo, Rancido, Mr.ID and other renowned artists.
                      <br/><br/>
                      The success of their chart-topping hits propelled the duo onto the European stage and quickly
                      around the world, where they captivated audiences in major cities such such as London, Paris,
                      Madrid, Luxembourg, Caracas, Bogotá and Panamá with their electrifying live performances.
                    </p>
                  </div>

                </div>
              </div> 
            </section>

            <section className="z-10 min-h-screen " > 
              
              <h1 id='music' className=' mb-8 pt-[220px] text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Music</h1>
              
              {/* <a href={artistData.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open in Spotify</a> */}

              <div className="grid mx-auto grid-cols-1 w-2/3 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums.map(album => (
                  <div key={album.id} className="border-0 p-4 hover:border-0 hover:p-1 duration-300 ease-out rounded shadow-md">
                    <img src={album.images[0].url} alt={album.name} className="mb-2" />
                    <h4 className="text-lg font-bold">{album.name}</h4>
                    <p className="text-sm mb-4">Release Date: {album.release_date}</p>

                    <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl ">
                      <FaSpotify />
                    </a>

                  </div>
                ))}
              </div>

            </section>      

      </main>

    </>
  );
}

export default App;
