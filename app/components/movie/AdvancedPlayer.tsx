// "use client";

// import { useEffect, useRef } from "react";
// import Hls from "hls.js";

// export default function AdvancedPlayer({ src }: { src: string }) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

//   const isHLS = src.endsWith(".m3u8");

//   const getYouTubeId = (url: string) => {
//     if (url.includes("youtu.be")) {
//       return url.split("/").pop();
//     }
//     const urlObj = new URL(url);
//     return urlObj.searchParams.get("v");
//   };

//   const youtubeId = isYouTube ? getYouTubeId(src) : null;

//   useEffect(() => {
//     if (!videoRef.current) return;

//     if (isHLS && Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(src);
//       hls.attachMedia(videoRef.current);
//     }
//   }, [src]);

//   if (isYouTube && youtubeId) {
//     return (
//       <div className="w-full max-w-6xl aspect-video">
//         <iframe
//           className="w-full h-full rounded-lg"
//           src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-6xl">
//       <video
//         ref={videoRef}
//         src={!isHLS ? src : undefined}
//         controls
//         autoPlay
//         className="w-full rounded-lg"
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function AdvancedPlayer({ src }: { src?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ---------------- SAFETY CHECK ---------------- */

  if (!src || src.trim() === "") {
    return (
      <div className="text-white text-center p-10">
        ❌ No video URL provided
      </div>
    );
  }

  console.log("🎬 Playing Source:", src);

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

  const isHLS = src.toLowerCase().includes(".m3u8");

  // const getYouTubeId = (url: string) => {
  //   try {
  //     if (url.includes("youtu.be")) {
  //       return url.split("/").pop();
  //     }
  //     const urlObj = new URL(url);
  //     return urlObj.searchParams.get("v");
  //   } catch {
  //     return null;
  //   }
  // };
  const getYouTubeId = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      // youtu.be short link
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }

      // youtube.com links
      if (parsedUrl.hostname.includes("youtube.com")) {
        // watch?v=
        const v = parsedUrl.searchParams.get("v");
        if (v) return v;

        // embed/
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname.split("/embed/")[1];
        }

        // shorts/
        if (parsedUrl.pathname.startsWith("/shorts/")) {
          return parsedUrl.pathname.split("/shorts/")[1];
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  const youtubeId = isYouTube ? getYouTubeId(src) : null;

  /* ---------------- HLS HANDLING ---------------- */

  useEffect(() => {
    if (!videoRef.current) return;

    let hls: Hls | null = null;

    if (isHLS) {
      // Chrome / Edge
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      }
      // Safari native support
      else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = src;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, isHLS]);

  /* ---------------- YOUTUBE ---------------- */

  if (isYouTube && youtubeId) {
    return (
      <div className="w-full max-w-6xl aspect-video">
        {/* <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        /> */}
        <iframe
          key={youtubeId}
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  /* ---------------- NORMAL VIDEO ---------------- */

  return (
    <div className="w-full max-w-6xl">
      {/* <video
        ref={videoRef}
        src={!isHLS ? src : undefined}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="w-full rounded-lg bg-black"
      /> */}
      <video
        key={src} // 👈 THIS IS THE MAGIC FIX
        ref={videoRef}
        src={!isHLS ? src : undefined}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="w-full rounded-lg bg-black"
      />
    </div>
  );
}
