import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [digitalTime, setDigitalTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [regularTime, setRegularTime] = useState("");
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isWhiteScreen, setIsWhiteScreen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleClick = () => {
    setIsWhiteScreen((prev) => !prev);
  };

  const handleScreenTap = (e) => {
    const tappedOnDigitalDay = e.target.closest(".project-name");

    if (isCardOpen) {
      setIsCardOpen(false);
      return;
    }
    if (tappedOnDigitalDay) {
      setIsCardOpen(true);
      return;
    }
    setIsWhiteScreen((prev) => !prev);
  };


  const handleDigitalDayClick = () => {
    if (isMobile) {
      setIsCardOpen(true);
    }
  };

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setIsGlitching(true); 

        setTimeout(() => {
          setIsGlitching(false)
        }, 500);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.getTime();
      const midnight = new Date(now);
      midnight.setHours(0, 0, 0, 0);
      const midnightTime = midnight.getTime();
      const elapsedTime = currentTime - midnightTime;

      const totalMillisecondsInDay = 24 * 60 * 60 * 1000;
      const totalDigitalMillisecondsInDay = 10 * 100 * 100 * 100;

      const digitalElapsedMilliseconds = (elapsedTime / totalMillisecondsInDay) * totalDigitalMillisecondsInDay;

      setDigitalTime({
        hours: Math.floor(digitalElapsedMilliseconds / (100 * 100 * 100)),
        minutes: Math.floor((digitalElapsedMilliseconds % (100 * 100 * 100)) / (100 * 100)),
        seconds: Math.floor((digitalElapsedMilliseconds % (100 * 100)) / 100),
      });

      setRegularTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // <div 
    //   className={`App ${isWhiteScreen ? "white-screen" : ""} ${isGlitching ? "glitch-transition" : ""}`}      
    //   onClick={handleScreenFlip}
    // >
    <div 
      className={`App ${isWhiteScreen ? "white-screen" : ""} ${isGlitching ? "glitch-transition" : ""}`}
      // onClick={handleClick}
      // onClick={isMobile ? handleScreenTap : undefined} 
      onClick={handleScreenTap}
    >
      {!isWhiteScreen && (
        <>
          <div 
            className="floating-text" 
            style={{ top: cursorPosition.y + 10, left: cursorPosition.x + 10 }}
          >
            Click anywhere to access the real world
          </div>

          <div className="header-container">
            <div 
              className="project-name"
              onMouseEnter={() => setShowInfoBox(true)}
              onMouseLeave={() => setShowInfoBox(false)}
              onClick={handleDigitalDayClick} 
            >
              <h1>The Digital Day</h1>
            </div>
            <div>
              <h2>Would you consider changing how we specify time?</h2>
            </div>

            <div className={`info-box ${showInfoBox ? "visible" : ""}`}>
              <p>
                "The current system is arbitrary. The day is divided into twenty-four rather arbitrary but standard units--hours. 
                But we tell time in units of twelve, not twenty-four, so there have to be two cycles of twelve hours each, plus 
                the special conversion of a.m. and p.m. so we know which cycle we are talking about. Then we divide each hour 
                into sixty minutes and each minute into sixty seconds.
              </p>
              <p>
                What if we switched to metric divisions: seconds divided into tenths, milliseconds, and microseconds? We would 
                have days, millidays, and microdays. There would have to be a new hour, minute, and second: call them the digital 
                hour, the digital minute, and the digital second. <span>It would be easy: ten digital hours to the day, one 
                hundred digital minutes to the digital hour, one hundred digital seconds to the digital minute.</span>
              </p>
              <p>
                Each digital hour would last exactly 2.4 times an old hour: 144 old minutes. So the old one-hour period of the 
                schoolroom or television program would be replaced with a half-digital hour period, or 50 digital minutes--only 
                20 percent longer than the current hour. We could adapt to the differences in duration with relative ease."
              </p>
              <p>
                - The Design of Everyday Things, Don Norman (1988)
              </p>
            </div>
          </div>

          <div className="digital-display">
            <p>
              {String(digitalTime.hours).padStart(2, "0")}:
              {String(digitalTime.minutes).padStart(2, "0")}:
              {String(digitalTime.seconds).padStart(2, "0")}
            </p>
          </div>

          <footer>
            <p>
              created by 
              <br></br>
              <a href="https://www.giovanabirck.com/" target="_blank">Giovana Birck</a></p>
          </footer>
        </>
      )}

      {isWhiteScreen && (
        <div 
          className="floating-text" 
          style={{ top: cursorPosition.y + 10, left: cursorPosition.x + 10 }}
        >
          Take me back to the digital day
        </div>
      )}

      {isWhiteScreen && (
        <div className="regular-time-display">
          <div className="header-container">
            <div className="project-name">
              <h1>The Real World</h1>
            </div>
            <div>
              <h2>Just the regular stuff</h2>
            </div>
          </div>
          <div className="digital-display">
            <p>{regularTime}</p>
          </div>
          <footer>
            <p>
              created by 
              <br></br>
              <a className="a-normal-stuff" href="https://www.giovanabirck.com/" target="_blank">Giovana Birck</a></p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;