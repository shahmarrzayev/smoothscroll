import gsap from "gsap";
import "./App.css";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger'ı gsap ile kullanabilmek için etkinleştir
gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvas = useRef();
  useEffect(() => {
    if (canvas) {
      const context = canvas.getContext("2d");
      const frameCount = 300;
      canvas.width = 1158;
      canvas.height = 770;

      const currentFrame = (index) =>
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
          index + 1
        )
          .toString()
          .padStart(4, "0")}.jpg`;

      const images = [];
      const airpods = {
        frame: 0,
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);

        // console.log(canvas);
        images.push(img);
      }

      const render = () => {
        // console.log(airpods.frame);
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        context.drawImage(images[airpods.frame], 0, 0);
      };

      gsap.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        delay: 1.5,
        end: "+=1000",
        scrollTrigger: {
          // scrub: 0.8,
          // snap: "labels",
          // delay: 4,
        },
        onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
      });

      images[0].onload = render;
    }
  }, []);

  return (
    <>
      <canvas id="canvas" ref={canvas}></canvas>
    </>
  );
}

export default App;
