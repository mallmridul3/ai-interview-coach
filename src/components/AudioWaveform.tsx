import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
  stream: MediaStream | null;
  barCount?: number;
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording,
  stream,
  barCount = 18,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!isRecording || !stream) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {}
        audioContextRef.current = null;
      }

      // Draw idle resting state
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const w = canvas.width;
          const h = canvas.height;
          const totalBars = barCount;
          const barWidth = 3;
          const gap = (w - totalBars * barWidth) / (totalBars - 1);

          ctx.fillStyle = '#d4d4d8';
          for (let i = 0; i < totalBars; i++) {
            const x = i * (barWidth + gap);
            const barH = 4;
            const y = (h - barH) / 2;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barH, 2);
            ctx.fill();
          }
        }
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const renderWave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const cCtx = canvas.getContext('2d');
        if (!cCtx) return;

        analyser.getByteFrequencyData(dataArray);

        const w = canvas.width;
        const h = canvas.height;
        cCtx.clearRect(0, 0, w, h);

        const totalBars = barCount;
        const barWidth = 3;
        const gap = (w - totalBars * barWidth) / (totalBars - 1);

        for (let i = 0; i < totalBars; i++) {
          const dataIndex = Math.floor((i / totalBars) * (bufferLength * 0.7));
          const val = dataArray[dataIndex] || 0;
          // Scale height between 4px and max canvas height - 4px
          const percent = val / 255;
          const barH = Math.max(4, percent * (h - 6));
          const x = i * (barWidth + gap);
          const y = (h - barH) / 2;

          // Dynamic gradient based on loudness
          cCtx.fillStyle = percent > 0.4 ? '#ef4444' : percent > 0.15 ? '#10b981' : '#71717a';
          cCtx.beginPath();
          cCtx.roundRect(x, y, barWidth, barH, 2);
          cCtx.fill();
        }

        animationFrameRef.current = requestAnimationFrame(renderWave);
      };

      renderWave();
    } catch (err) {
      console.warn('AudioWaveform init warning:', err);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, [isRecording, stream, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={28}
      className={`inline-block ${className}`}
      title={isRecording ? 'Live Voice Activity' : 'Audio Idle'}
    />
  );
};
