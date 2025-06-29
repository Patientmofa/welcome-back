import React, { useState, useEffect } from 'react';
import './App.css';
import { photos, loveQuotes, arrivalDate } from './data';

function App() {
  const [countdown, setCountdown] = useState({});
  const [surprise, setSurprise] = useState(null);
  const [revealedMessage, setRevealedMessage] = useState(null);
  const [lastSurpriseType, setLastSurpriseType] = useState(null); // New state for alternating surprises

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = arrivalDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds, arrived: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSurpriseMe = () => {
    let nextType;
    if (lastSurpriseType === 'quote') {
      nextType = 'flower';
    } else {
      nextType = 'quote';
    }
    setLastSurpriseType(nextType);

    if (nextType === 'quote') {
      const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
      setSurprise({ type: 'quote', content: randomQuote });
    } else { // nextType === 'flower'
      setSurprise({ type: 'flower', content: '🌹' }); // Always a single rose
    }
  };

  const handlePhotoClick = (message) => {
    setRevealedMessage(message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="welcome-message">هلّا عدتي يا غاليتي</h1>

        <section className="countdown-section">
          <h2>Countdown until you're home:</h2>
          {countdown.arrived ? (
            <p className="arrived-message">Welcome Home, my love!</p>
          ) : (
            <div className="countdown-timer">
              <div>{countdown.days} <span>Days</span></div>
              <div>{countdown.hours} <span>Hours</span></div>
              <div>{countdown.minutes} <span>Minutes</span></div>
              <div>{countdown.seconds} <span>Seconds</span></div>
            </div>
          )}
        </section>

        <section className="gallery-section">
          <h2>Our Memories</h2>
          <div className="photo-gallery">
            {photos.map((photo, index) => (
              <div key={index} className="photo-item" onClick={() => handlePhotoClick(photo.message)}>
                <img src={photo.src} alt={`Memory ${index + 1}`} />
              </div>
            ))}
          </div>
          {revealedMessage && (
            <div className="revealed-message-overlay" onClick={() => setRevealedMessage(null)}>
              <p className="revealed-message">{revealedMessage}</p>
            </div>
          )}
        </section>

        <section className="surprise-section">
          <h2>A Little Surprise for You!</h2>
          <button onClick={handleSurpriseMe}>Surprise Me!</button>
          {surprise && (
            <div className="surprise-content">
              {surprise.type === 'quote' && <p className="surprise-quote">{surprise.content}</p>}
              {surprise.type === 'flower' && <span className="surprise-flower">{surprise.content}</span>}
            </div>
          )}
        </section>

        <section className="audio-section">
          <h2>A Message from Me</h2>
          {/* Replace with your audio file */}
          <audio controls>
            <source src="/xxx.mp3" type="audio/mpeg" />
            {/* WICHTIG: Ersetze "your_audio_message.mp3" durch den tatsächlichen Namen deiner Audiodatei im "public"-Ordner. */}
            {/* Passe auch den "type" an, z.B. "audio/ogg" für .ogg-Dateien. */}
            Your browser does not support the audio element.
          </audio>
          <p>
            {/* Instructions for customizing audio */}
            To add your audio message, replace `placeholder_audio.mp3` with the path to your audio file in the `public` folder.
          </p>
        </section>
      </header>
    </div>
  );
}

export default App;