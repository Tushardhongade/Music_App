import React, { useContext } from "react";
import axios from "axios";
import { SongContext } from "../Context/SongContext";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { FiMusic, FiPlay, FiX } from "react-icons/fi";
import { FetchContext } from "../Context/FetchContext";

const PlaylistSong = ({ title, artistName, songSrc, playlistId }) => {
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchPlaylist } = useContext(FetchContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const decoded = decodeToken(token);

  const handlePlay = () => {
    audio.pause();
    audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
    song.setSongName(title);
    song.setArtistName(artistName);
    song.setSongUrl(songSrc);
    audio.load();
    audio.play();
    song.setIsPlaying(true);
  };

  const removeSong = async () => {
    if (!window.confirm("Remove this song from playlist?")) return;

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("access_token"),
    };

    try {
      const { status } = await axios.delete(
        `${__URL__}/api/v1/playlist/remove/${playlistId}?song=${title}`,
        { headers }
      );

      if (status === 200) {
        setFetchPlaylist((prev) => !prev);
      }
    } catch (error) {
      alert("Error removing song");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4">
      {/* Song Info and Play Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePlay}
          className="w-10 h-10 bg-[#6594B1] rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all group"
        >
          <FiPlay className="w-5 h-5 text-white ml-0.5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#213C51] rounded flex items-center justify-center">
            <FiMusic className="w-6 h-6 text-[#6594B1]" />
          </div>
          <div>
            <h3 className="font-medium text-white truncate max-w-xs">
              {title}
            </h3>
            <p className="text-sm text-gray-400">{artistName}</p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={removeSong}
        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
        title="Remove from playlist"
      >
        <FiX className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
      </button>
    </div>
  );
};

export default PlaylistSong;
