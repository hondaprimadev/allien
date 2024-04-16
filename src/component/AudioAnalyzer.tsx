import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

interface IAudioAnalyzer {
  hertzCounter(number: number): void;
  start?: boolean;
  clicked?: boolean;
  reset?: boolean;
  setFinish(finish: boolean): void;
  setClicked(clicked: boolean): void;
}

const AudioAnalyzer: React.FC<IAudioAnalyzer> = ({
  hertzCounter,
  start,
  setFinish,
  clicked,
  reset,
  setClicked,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [soundPatterns, setSoundPatterns] = useState<number[][]>([]);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  const colorPalette = [
    "#FF0000",
    // "#FF3300",
    // "#FF6600",
    // "#FF9900",
    // "#FFCC00",
    // "#FFFF00",
    // "#CCFF00",
    // "#99FF00",
    // "#66FF00",
    // "#33FF00",
    // "#00FF00",
    // "#00FF33",
    // "#00FF66",
    // "#00FF99",
    // "#00FFCC",
    // "#00FFFF",
    // "#00CCFF",
    // "#0099FF",
    // "#0066FF",
    // "#0033FF",
  ];

  useEffect(() => {
    const initAudio = async () => {
      const audioContext = new (window.AudioContext || AudioContext)();
      const analyser = audioContext.createAnalyser();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      setAudioContext(audioContext);
      setAnalyser(analyser);
    };

    initAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    let updateInterval = setInterval(() => {}, 0);
    if (start) {
      const updateFrequencyData = () => {
        if (analyser) {
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);

          const newPattern = Array.from(dataArray);

          setSoundPatterns((prevPatterns) => {
            const updatedPatterns = [...prevPatterns, newPattern];

            if (updatedPatterns.length > 100) {
              setFinish(true);
            }
            return updatedPatterns; // Menyimpan 5000 pola terakhir
          });

          // Calculate dominant frequency
          const maxIndex = dataArray.indexOf(Math.max(...dataArray));
          const hertzValue =
            (maxIndex * audioContext!.sampleRate) / bufferLength;

          hertzCounter(hertzValue);
        }
      };
      updateInterval = setInterval(updateFrequencyData, 100); // Update setiap 100ms
    }
    return () => clearInterval(updateInterval);
  }, [analyser, start]);

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colorPalette.length);
    }, 100); // Ganti warna setiap 100ms

    return () => clearInterval(colorChangeInterval);
  }, []);

  useEffect(() => {
    if (start) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx && soundPatterns.length > 0) {
          const bufferLength = analyser?.frequencyBinCount ?? 0;
          const pixelRatio = window.devicePixelRatio || 1;
          const width = canvas.clientWidth * pixelRatio;
          const height = canvas.clientHeight * pixelRatio;

          canvas.width = width;
          canvas.height = height;

          ctx.clearRect(0, 0, width, height);
          const scale = 1; // Faktor skala untuk memperbesar grafik
          const strokeWidth = 0.8; // Ketebalan garis
          ctx.lineWidth = strokeWidth;

          soundPatterns.forEach((pattern, patternIndex) => {
            ctx.beginPath();
            ctx.strokeStyle =
              colorPalette[
                ((patternIndex % colorPalette.length) + colorIndex) %
                  colorPalette.length
              ];
            for (let i = 0; i < bufferLength; i++) {
              const x = (i / (bufferLength - 1)) * width;
              const y = (1 - (pattern[i] / 255) * scale) * height; // Menggunakan faktor skala
              if (i === 0) {
                ctx.moveTo(x * 3, y);
              } else {
                ctx.lineTo(x * 3, y);
              }
            }
            ctx.stroke();
          });
        }
      }
    }
  }, [soundPatterns, analyser, colorIndex, start]);

  useEffect(() => {
    start !== undefined && captureComponent();
  }, [clicked]);

  useEffect(() => {
    setSoundPatterns([...[]]);
  }, [reset]);

  const captureComponent = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((_canvas) => {
        const dataUrl = _canvas.toDataURL();
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "sample.png";
        link.click();
      });
    }
  };
  return (
    <div
      style={{ width: "auto", margin: "auto", backgroundColor: "black" }}
      ref={componentRef}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "300px" }}
      ></canvas>
    </div>
  );
};

export default AudioAnalyzer;
