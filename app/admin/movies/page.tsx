// "use client";

// import { useState } from "react";
// import { useMovieStore } from "@/store/movieStore";

// export default function ManageMovies() {
//   const { movies, addMovie, deleteMovie } = useMovieStore();
//   const [description, setDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const [genre, setGenre] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");

//   const handleSubmit = () => {
//     addMovie({
//       id: crypto.randomUUID(), // ✅ ID add karo
//       title,
//       genre,
//       description,
//       thumbnail,
//       videoUrl,
//     });

//     setTitle("");
//     setGenre("");
//     setDescription("");
//     setThumbnail("");
//     setVideoUrl("");
//   };
//   // const handleSubmit = async () => {
//   //   try {
//   //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         title,
//   //         description,
//   //         genre,
//   //         thumbnailUrl: thumbnail,
//   //         videoUrl,
//   //       }),
//   //     });

//   // if (!res.ok) {
//   //   const text = await res.text();
//   //   console.error(text);
//   //   alert("Error from server");
//   //   return;
//   // }

//   //   const data = await res.json();
//   //   console.log("Movie added:", data);

//   //   alert("Movie added successfully!");

//   //   setTitle("");
//   //   setGenre("");
//   //   setDescription("");
//   //   setThumbnail("");
//   //   setVideoUrl("");
//   // } catch (error) {
//   //   console.error("Error adding movie:", error);
//   // }
//   // };
//   return (
//     <div className="pt-24 px-10">
//       <h2 className="text-3xl mb-6">Upload Movie</h2>

//       <div className="grid grid-cols-2 gap-4 mb-10">
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="p-3 bg-gray-800 rounded"
//         />
//         <input
//           placeholder="Description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           className="p-3 bg-gray-800 rounded"
//         />
//         <input
//           placeholder="Genre"
//           value={genre}
//           onChange={e => setGenre(e.target.value)}
//           className="p-3 bg-gray-800 rounded"
//         />

//         <input
//           placeholder="Thumbnail URL"
//           value={thumbnail}
//           onChange={e => setThumbnail(e.target.value)}
//           className="p-3 bg-gray-800 rounded"
//         />

//         <input
//           placeholder="Video URL"
//           value={videoUrl}
//           onChange={e => setVideoUrl(e.target.value)}
//           className="p-3 bg-gray-800 rounded"
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-red-600 px-6 py-3 rounded mb-10"
//       >
//         Add Movie
//       </button>

//       <div className="grid grid-cols-4 gap-6">
//         {movies.map(movie => (
//           <div key={movie.id} className="bg-gray-900 p-4 rounded">
//             {/* <img
//               src={movie.thumbnail}
//               className="h-40 w-full object-cover mb-2"
//             /> */}
//             <img
//               src={
//                 movie.thumbnail ||
//                 "https://via.placeholder.com/300x400?text=No+Image"
//               }
//               className="h-40 w-full object-cover mb-2"
//             />
//             <h3>{movie.title}</h3>
//             <button
//               onClick={() => deleteMovie(movie.id)}
//               className="text-red-500 mt-2"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useMovieStore, ContentType } from "@/store/movieStore";

interface Episode {
  id: string;
  title: string;
  videoUrl: string;
}

interface Season {
  id: string;
  seasonNumber: number;
  episodes: Episode[];
}

export default function ManageMovies() {
  const { movies, addMovie, deleteMovie } = useMovieStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [type, setType] = useState<ContentType>("movie");

  const [seasons, setSeasons] = useState<Season[]>([]);

  // Add Season
  const addSeason = () => {
    setSeasons(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        seasonNumber: prev.length + 1,
        episodes: [],
      },
    ]);
  };

  // Add Episode
  const addEpisode = (seasonId: string) => {
    setSeasons(prev =>
      prev.map(season =>
        season.id === seasonId
          ? {
              ...season,
              episodes: [
                ...season.episodes,
                {
                  id: crypto.randomUUID(),
                  title: `Episode ${season.episodes.length + 1}`,
                  videoUrl: "",
                },
              ],
            }
          : season,
      ),
    );
  };

  // Update Episode Video URL (IMMUTABLE FIX)
  const updateEpisodeVideo = (
    seasonId: string,
    episodeId: string,
    value: string,
  ) => {
    setSeasons(prev =>
      prev.map(season =>
        season.id === seasonId
          ? {
              ...season,
              episodes: season.episodes.map(ep =>
                ep.id === episodeId ? { ...ep, videoUrl: value } : ep,
              ),
            }
          : season,
      ),
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setGenre("");
    setThumbnail("");
    setVideoUrl("");
    setSeasons([]);
    setType("movie");
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title required");
      return;
    }

    if (type === "movie" && !videoUrl.trim()) {
      alert("Movie video URL required");
      return;
    }

    if ((type === "series" || type === "drama") && seasons.length === 0) {
      alert("Please add at least one season");
      return;
    }

    if (type === "movie") {
      addMovie({
        title,
        description,
        genre,
        thumbnail,
        type: "movie",
        videoUrl,
      });
    } else {
      addMovie({
        title,
        description,
        genre,
        thumbnail,
        type,
        seasons,
      });
    }

    resetForm();
  };

  return (
    <div className="pt-24 px-10 text-white">
      <h2 className="text-3xl mb-6">Upload Content</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-3 bg-gray-800 rounded"
        />

        <input
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="p-3 bg-gray-800 rounded"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-3 bg-gray-800 rounded col-span-2"
        />

        <input
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
          className="p-3 bg-gray-800 rounded"
        />

        {type === "movie" && (
          <input
            placeholder="Video URL"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            className="p-3 bg-gray-800 rounded"
          />
        )}

        <select
          value={type}
          onChange={e => setType(e.target.value as ContentType)}
          className="p-3 bg-gray-800 rounded"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="drama">Drama</option>
        </select>
      </div>

      {(type === "series" || type === "drama") && (
        <div className="mb-6">
          <button
            onClick={addSeason}
            className="bg-blue-600 px-4 py-2 rounded mb-4"
          >
            Add Season
          </button>

          {seasons.map(season => (
            <div key={season.id} className="bg-gray-900 p-4 rounded mb-4">
              <h3 className="text-lg font-semibold">
                Season {season.seasonNumber}
              </h3>

              <button
                onClick={() => addEpisode(season.id)}
                className="text-green-400 mt-2"
              >
                Add Episode
              </button>

              {season.episodes.map(ep => (
                <input
                  key={ep.id}
                  placeholder={ep.title + " Video URL"}
                  value={ep.videoUrl}
                  onChange={e =>
                    updateEpisodeVideo(season.id, ep.id, e.target.value)
                  }
                  className="block mt-2 p-2 bg-gray-800 rounded w-full"
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-red-600 px-6 py-3 rounded mb-10"
      >
        Add Content
      </button>

      <div className="grid grid-cols-4 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="bg-gray-900 p-4 rounded">
            <img
              src={movie.thumbnail || "https://via.placeholder.com/300x400"}
              alt={movie.title}
              className="h-40 w-full object-cover mb-2 rounded"
            />
            <h3 className="font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-400">
              {(movie.type ?? "movie").toUpperCase()}
            </p>

            <button
              onClick={() => deleteMovie(movie.id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
