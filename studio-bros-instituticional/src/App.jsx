import { useState, useRef, useEffect } from 'react';
import './css/App.css';

import Header from './components/Header';
import Famifox from "./img/famifox.webp";
import Nunex from "./img/nunex.webp";
import backgroundVideo from "./video/StudioBrosBackgroundVideo.mp4";

import { getAccessToken } from './service/spotifyCallBacks.js';

import { dataAlbums } from './data/albums.js';
import { dataVideos } from './data/videos.js';

import { FaSpotify, FaYoutube, FaInstagram, FaTwitter, FaDeezer, FaFacebook } from "react-icons/fa";


import Footer from './components/Footer.jsx';



function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };
    fetchToken();
  }, []);

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
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);

  const [visibleAlbums, setVisibleAlbums] = useState(8); // Number of albums to display
  const [visibleVideos, setVisibleVideos] = useState(6); // Number of albums to display


  const videoRef = useRef(null);

  useEffect(() => {

    setAlbums(dataAlbums);
    setVideos(dataVideos);


  }, [accessToken]);

  const handleShowMore = () => {
    setVisibleAlbums(prevVisible => prevVisible + 4);
  };

  const handleShowMoreVideos = () => {
    setVisibleVideos(prevVisible => prevVisible + 4);
  };

  if (!albums && !videos)
    return (
      <>
        <div className="flex h-screen items-center bg-gray-900 justify-center">
          <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-black" />
        </div>
      </>
    );

  return (
    <>
      <Header />
      <main>
        <section className="flex justify-center items-center w-screen bg-black h-screen overflow-hidden relative">
          <video
            ref={videoRef}
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"></div>
          <div className="relative z-30 text-white text-center">
            <h1 className="text-8xl custom-stroke">Studio Bros</h1>
            <a href="#about-us">
              <button className='p-4 border-white border-2 hover:bg-white hover:text-black transition-all duration-300 rounded-md bg-transparent mt-10 w-80 text-white font-bold text-xl '>
                Explore
              </button>
            </a>
          </div>
        </section>

        <section className="z-10">
          <h1 id='about-us' className='pt-40 mb-8 text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>About Us</h1>
          <div className='flex flex-col md:flex-row justify-center h-auto md:h-[400px]'>
            <div className='flex flex-col md:flex-row items-stretch w-full md:w-2/3'>
              <div className='w-full p-8 md:w-1/2'>
                <p className="text-justify sm:text-center md:text-left">
                  Fábio Miguel, known as "Famifox", and Miguel Batista, known as "Nunex" are a
                  dynamic duo of young artists hailing from the vibrant city of Lisbon.
                  Both born and raised in Quinta do Mocho neighborhood with Santomean roots,
                  they share a lifelong friendship and a common vision of bringing their musical dreams to life.
                  <br /><br />
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
                  <br /><br />
                  The success of their chart-topping hits propelled the duo onto the European stage and quickly
                  around the world, where they captivated audiences in major cities such as London, Paris,
                  Madrid, Luxembourg, Caracas, Bogotá, and Panamá with their electrifying live performances.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="z-10 min-h-screen ">
          <h1 id='music' className='mb-8 pt-[220px] text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Music</h1>
          <div className="grid mx-auto grid-cols-1 w-2/3 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.slice(0, visibleAlbums).map(album => (
              <div key={album.id} className="border-0 p-4 hover:border-0 hover:p-1 duration-300 ease-out rounded shadow-md cardMusic" >
                <img src={album.images[0].url} target={visibleAlbums} alt={album.name} className="mb-2" />
                <h4 className="text-lg font-bold">{album.name}</h4>
                <p className="text-sm mb-4">Release Date: {album.release_date}</p>
                <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl">
                  <FaSpotify />
                </a>
              </div>
            ))}
          </div>

          {visibleAlbums < albums.length && (
            <div className="bottom-0 mt-6 w-full text-xl text-white bp">
              <div className="bottom-0 mt-6 w-full text-xl text-white bp">
                <div className="flex justify-center">
                  <button type="button" 
                    className="py-2.5 w-[200px] px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none duration-300 bg-black rounded-lg border border-gray-200
                    hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-black
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleShowMore}
                    >
                    See more details
                  </button>
                </div>
              </div>
            </div>
          )}

        </section>

        <section>
          <h1 id='videos' className='mb-8 pt-[220px] text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Videos</h1>


          <div className="grid mx-auto  lg:grid-cols-2 md:grid-cols-1 w-2/3 justify-center">
            
          {videos.slice(0, visibleVideos).map(album => (
              <div key={album.videoId} className="border-0 p-4 duration-300 w-full h-auto   ease-out rounded">
                <div className="relative">
                  <img src={album.thumbnail[3].url} alt={album.name} className="mb-2 w-full object-cover" />
                </div>
                <h4 className="text-lg font-bold">{album.title}</h4>
                <p className="text-sm mb-4">Release Date: {album.publishDate}</p>
                <p className='text-sm'>
                  {album.description}
                </p>
                <a href={`https://www.youtube.com/watch?v=${album.videoId}`} target="_blank" rel="noopener noreferrer" className="text-red-500 duration-300 hover:text-red-300 text-2xl">
                  <FaYoutube />
                </a>
              </div>
            ))}
          </div>

          {visibleVideos < videos.length && (
            <div className="bottom-0 mt-8 w-full text-xl text-white bp">
              <div className="bottom-0 mt-6 w-full text-xl text-white bp">
                <div className="flex justify-center">
                  <button type="button" 
                    className="py-2.5 w-[200px] px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none duration-300 bg-black rounded-lg border border-gray-200
                    hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-black
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleShowMoreVideos}
                    >
                    See more details
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section>

          <h1 id='social' className='pt-[170px] mb-3 text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Social Media</h1>


            <div className="button-container flex flex-wrap">

              <div className="mt-2">
                <a target='_blank' href='https://www.instagram.com/studiobros/'>
                  <div className="glass-btn purple-btn ">
                      <FaInstagram  className='imgForSocialMedia text-3xl text-violet-700'></FaInstagram>
                  </div>
                </a>
              </div>

              <div className="mt-2">
                <a target='_blank' href='https://www.youtube.com/@studiobros'>
                  <div className="glass-btn red-btn">
                      <FaYoutube  className='imgForSocialMedia text-3xl text-red-500'></FaYoutube>
                  </div>
                </a>
              </div>

              <div className="mt-2">
                <a target='_blank' href='https://www.facebook.com/studiobrosofficial/?locale=pt_PT'>
                  <div className="glass-btn blue-btn">
                      <FaFacebook  className='imgForSocialMedia text-3xl text-blue-700'></FaFacebook>
                  </div>
                </a>
              </div>

              <div className="mt-2">
                <a target='_blank' href='https://open.spotify.com/artist/5TGycVupaB4WmtdWZNC2b3?si=9TqSYzfqSCWk91iF1KtmoA'>
                              <div className="glass-btn green-btn">
                                  <FaSpotify  className='imgForSocialMedia text-3xl text-green-500'></FaSpotify>
                              </div>
                </a>
              </div>

              <div className="mt-2">
                <a target='_blank' href='https://music.apple.com/pt/artist/studio-bros/1354469914'>
                  <div className="glass-btn red-btn">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/2048px-Apple_Music_icon.svg.png" alt="soundcloud" className='imgForSocialMediaForAppleMusic'/>
                  </div>
                </a>
              </div>

              <div className="mt-2"> 
                <a target='_blank' href='https://soundcloud.com/studiobrosofficial'>
                  <div className="glass-btn amber-btn">
                    
                      <img src="https://i.postimg.cc/tgQ1H1Rp/soundcloud.png" alt="soundcloud" className='imgForSocialMedia'/>
                  
                  </div>
                </a>
              </div>

              <div className="mt-2">
                <a target='_blank' href='https://www.deezer.com/pt/artist/14382037'>
                  <div className="glass-btn black-btn">
                      <FaDeezer className='imgForSocialMedia text-3xl '></FaDeezer>
                  </div>
                </a>
              </div>

            </div>

        </section>

      </main>

      <Footer>

      </Footer>
    </>
  );
}

export default App;
