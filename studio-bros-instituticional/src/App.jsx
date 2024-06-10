import { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import ReactPlayer from 'react-player';
import Famifox  from "./img/famifox.webp"
import Nunex  from "./img/nunex.webp"
import backgroundVideo from "./video/StudioBrosBackgroundVideo.mp4"


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Header />

          <main > 
              
            {/* Background Image */}
            <section className="main-background bg-custom-gradient   relative min-h-screen z-10 ">

              <div className=' w-full min-h-screen z-20 opacity-70 bg-black absolute'>
              </div>

              <ReactPlayer 
                url={backgroundVideo}
                playing
                muted
                className="z-10"
                width="100%"
                height="auto"
            />
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
          </main>

    </>
  );
}

export default App;
