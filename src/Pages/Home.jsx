import React from 'react'
import Silk from '../Components/Silk';
import { useRef } from 'react';
import VariableProximity from '../Components/VariableProximity';
import TextType from '../Components/TextType';

const Home = () => {
    const containerRef = useRef(null);
    const handleAnimationComplete = () => {
      console.log('Animation completed!');
    };

    return (
    <div className='h-screen w-screen relative'>
        <Silk
            speed={5}
            scale={1}
            color="#821717"
            noiseIntensity={0}
            rotation={0}
        />

        <div className="absolute inset-0 flex items-start justify-center mt-50 z-10"
            ref={containerRef}
        >
        <VariableProximity
            label={'BEAT'}
            className={'variable-proximity-demo text-white text-8xl'}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={150}
            falloff='gaussian'
        />
        </div>
        <div className="absolute inset-0 flex items-start justify-center z-10 mt-90 text-white 
            text-5xl font-extrabold text-center tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] 
            font-poppins">
    <TextType 
        text={[
            "Feel the beat, anytime, anywhere.",
            "Your personal music universe.",
            "Discover music, feel the rhythm.",
            "Listen. Vibe. Repeat.",
            "Where every beat tells a story",
            "Music that moves you forward.",
            "Endless music, endless vibes.",
            "Play your mood, anytime.",
            "Your soundtrack, your style.",
            "Your world, your music, your beat.",
            "Where your playlist comes alive."
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
    />
</div>

    </div>
  )
}

export default Home

