import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 ">
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl font-bold mb-8 text-center">About</h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Beat is a modern music streaming web application designed to provide an immersive and seamless listening experience for music enthusiasts. The platform allows users to explore a wide range of tracks, stream audio in real time, and manage their music preferences through an intuitive and visually clean interface.
          </p>
          
          <p>
            Built using a full-stack architecture, Beat integrates a responsive frontend with a robust backend system to ensure secure authentication, efficient data handling, and scalable performance. Users can create personalized playlists, save their favorite tracks, and easily search for music based on their interests.
          </p>
          
          <p>
            Beat is developed with modern web technologies to emphasize reliability, maintainability, and future scalability. The project reflects a strong focus on clean code, modular design, and real-world application structure, making it both a practical music platform and a demonstration of full-stack development skills.
          </p>
          
          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time music streaming</li>
              <li>Personalized playlists</li>
              <li>Advanced search functionality</li>
              <li>Cross-device compatibility</li>
              <li>Secure user authentication</li>
              <li>Clean, intuitive interface</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About