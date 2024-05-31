import { useState } from 'react';
import './css/App.css';
import Header from './components/Header';

import Famifox  from "./img/famifox.webp"
import Nunex  from "./img/nunex.webp"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Header />

          <main > 
            
            {/* Background Image */}
            <section className="main-background bg-custom-gradient  relative min-h-screen z-10 "> 
            </section>


            <section className="z-10 " > 
              
                <h1 id='about-us' className='pt-40 mb-8 text-center font-bold text-4xl'>About Us</h1>

                {/* First Paragraph */}
                <div className='flex  justify-center h-[400px]'>
                  <div className=' flex items-stretch w-2/3'>
                    <div className='w-1/2 flex flex-col justify-center p-8'>
                      <p className="text-justify">
                         Fábio Miguel, known as "Famifox", and Miguel Batista, known as "Nunex" are a 
                         dynamic duo of young artists hailing from the vibrant city of Lisbon.
                         Both born and raised in Quinta do Mocho neighborhood with Santomean roots, 
                         they share a lifelong friendship and a common vision of bringing their musical dreams to life.
                         <br></br><br></br>
                         Their journey into the world of music began in 2007 when they founded Alto Nível Produções, 
                         an inspired project blending traditional African rhythms with modern electronic elements. 
                         Fueled by their unwavering passion for music, they honed their craft within the confines of their own bedrooms.
                      </p>
                    </div>
                    <div className='w-1/2 p-8 flex items-center drop-shadow-xl '>
                      <img src={Famifox}  className="object-cover h-full w-full " alt="Famifox"></img>
                    </div>
                  </div>
                </div>

               {/*Second Paragraph*/}
               <div className='flex  justify-center h-[400px]'>
                <div className=' flex items-stretch w-2/3'>
                <div className='w-1/2 p-8 flex items-center'>
                    <img src={Nunex}  className="object-cover  h-full w-full drop-shadow-xl" alt="Nunex"></img>
                  </div>
                  <div className='w-1/2  p-8'>
                    <p className="text-justify">
                      Among their impressive repertoire, one track in particular set the dance floors ablaze: 
                      "Kapiro." This infectious composition, characterized by its mesmerizing guitar melodies 
                      and pulsating percussion beats, quickly became a summer sensation in 2017. The track earned 
                      recognition and su- pport from some of the industry's most esteemed figures, including Boddhi
                      Satva, Djeff Afrozila, Manoo, Rancido, Mr.ID and other renowned artists.
                      <br></br><br></br>
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
