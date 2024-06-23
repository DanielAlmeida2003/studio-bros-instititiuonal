import { useState, useRef, useEffect } from 'react';
import './css/App.css';
import Header from './components/Header';
import Famifox  from "./img/famifox.webp"
import Nunex  from "./img/nunex.webp"
import backgroundVideo from "./video/StudioBrosBackgroundVideo.mp4"
import Card from "./components/Card"

function App() {

  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    fetch('/albums.json')  // Ensure the path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
 
        return response.json();
      })
      .then((data) => setData(data))
      // .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

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

            <section className="z-10 "> 
              
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

            <section className='z-10'>

              <h1 id='music' className='pt-40 mb-8 text-center font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl'>Music</h1>



              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((albums) => (
                  <Card key={1  } image={albums.album.name} title={img.title} description={img.description} />
                ))}
              

              </div>


            </section>

          </main>

    </>
  );
}

export default App;
