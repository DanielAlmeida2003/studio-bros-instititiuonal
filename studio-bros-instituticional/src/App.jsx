import { useState, useRef, useEffect } from 'react';
import './css/App.css';

import Header from './components/Header';
import Famifox from "./img/famifox.webp";
import Nunex from "./img/nunex.webp";
import backgroundVideo from "./video/StudioBrosBackgroundVideo.mp4";

import { getAccessToken } from './service/spotifyCallBacks.js';

import AlbumFetch from './fetch/Albums.js';
import AlbumService from './service/albumsService.js';

import { FaSpotify } from "react-icons/fa";
import { artistId } from './service/apiLink.js';
import YoutubeService from './service/youtube-callback.js';
import VideoFetch from './fetch/Videos.js';

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
  const videoRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const albumsService = new AlbumService(AlbumFetch);
    const videosService = new YoutubeService(VideoFetch);

    const fetchSpotifyAlbums = async () => {
      try {
        const albumsWithCovers = await albumsService.fetchAlbumsWithCoverImages(artistId, accessToken, { signal });
        setAlbums(albumsWithCovers);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log(error);
        }
      }
    };

    const fetchYoutubeVideos = async () => {
      try {

        const youtube = await videosService.fetchVideosFromChannel({ signal });
        setVideos(youtube);

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log(error);
        }
      }
    };

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }

    fetchSpotifyAlbums();
    fetchYoutubeVideos();

    return () => {
      abortController.abort();
    };
  }, [accessToken]);

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

        <section className="z-10 min-h-screen">
          <h1 id='music' className='mb-8 pt-[220px] text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Music</h1>
          <div className="grid mx-auto grid-cols-1 w-2/3 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map(album => (
              <div key={album.id} className="border-0 p-4 hover:border-0 hover:p-1 duration-300 ease-out rounded shadow-md">
                <img src={album.images[0].url} alt={album.name} className="mb-2" />
                <h4 className="text-lg font-bold">{album.name}</h4>
                <p className="text-sm mb-4">Release Date: {album.release_date}</p>
                <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl">
                  <FaSpotify />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h1 id='videos' className='mb-8 pt-[220px] text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Video</h1>
          <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>

                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>

                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>

                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>

                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>
            </div>


            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>



            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
