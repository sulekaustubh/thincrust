'use client';

import React, { useState } from 'react';

export default function AudioExtractor() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setAudioUrl(null);

    // 🧠 THIS is the key: use dynamic import + extract from `.default`
    const ffmpegModule = await import('@ffmpeg/ffmpeg');
    const createFFmpeg = ffmpegModule.default.createFFmpeg;
    const fetchFile = ffmpegModule.default.fetchFile;

    const ffmpeg = createFFmpeg({ log: true });

    try {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
      await ffmpeg.run('-i', 'input.mp4', '-q:a', '0', '-map', 'a', 'output.mp3');
      const data = ffmpeg.FS('readFile', 'output.mp3');
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }));
      setAudioUrl(url);
    } catch (err) {
      console.error('FFmpeg error:', err);
      alert('Failed to extract audio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {loading && <p>Processing… hang tight ⏳</p>}
      {audioUrl && (
        <a href={audioUrl} download="audio.mp3">
          Download Extracted MP3
        </a>
      )}
    </div>
  );
}
