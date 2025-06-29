# Video Subtitler (Lemonfox.ai Integration)

A simple web application that allows users to upload short videos, automatically transcribe the audio using Lemonfox.ai API, and burn subtitles directly into the video.

## Features

-   Upload MP4 videos (up to 30 seconds)
-   Automatic audio extraction using FFmpeg
-   Transcription using Lemonfox.ai API (Whisper-compatible)
-   Subtitle burning directly into the video
-   Video preview with download option
-   Simple, clean UI built with Next.js and Tailwind CSS

## Technical Stack

-   **Frontend**: Next.js with React and Tailwind CSS
-   **Backend**: Next.js API routes
-   **Media Processing**: FFmpeg for audio extraction and subtitle burning
-   **Transcription**: Lemonfox.ai API

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/video-subtitler.git
cd video-subtitler
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

    - Create a `.env.local` file in the root directory
    - Add your Lemonfox.ai API key:
        ```
        LEMONFOX_API_KEY=your_api_key_here
        ```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

-   `POST /api/process` - Main endpoint for end-to-end processing
-   `GET /api/video/[filename]` - Endpoint for serving processed videos

## Workflow

1. User uploads an MP4 video
2. Server extracts audio using FFmpeg
3. Audio is sent to Lemonfox.ai API for transcription
4. Transcription is converted to SRT format
5. FFmpeg burns subtitles into the original video
6. User can preview and download the subtitled video

## Requirements

-   Node.js 18+
-   FFmpeg installed on the server

## License

MIT

---

Created with Next.js and Tailwind CSS
