import React, { useContext, useState } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../Context/SongContext";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";
import {
  FiPlay,
  FiMoreVertical,
  FiTrash2,
  FiPlus,
  FiList,
} from "react-icons/fi";

const SongCard = ({ title, artistName, songSrc, userId, songId, file }) => {
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchSong } = useContext(FetchContext);
  const { dispatchQueue, dispatchList } = useContext(QueueContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  let decoded;
  if (token) {
    decoded = decodeToken(token);
  }

  const [showOptions, setShowOptions] = useState(false);

  const handlePlay = () => {
    song.setSongName(title);
    song.setArtistName(artistName);
    song.setSongUrl(`${__URL__}/api/v1/stream/${songSrc}`);
    audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
    audio.load();
    audio.play();
    song.setIsPlaying(true);
  };

  const deleteSong = async () => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    const headers = {
      "x-auth-token": localStorage.getItem("access_token"),
    };

    try {
      const { status } = await axios.delete(
        `${__URL__}/api/v1/song/delete/${songId}?file=${file}`,
        { headers }
      );

      if (status === 200) {
        setFetchSong((prev) => !prev);
      }
    } catch (error) {
      alert("Error deleting song");
      console.error(error);
    }
  };

  const handleAddToPlaylist = () => {
    dispatchList({ type: "ADD_SONG", payload: { title, artistName, songSrc } });
    navigate("/playlists");
  };

  const handlePlayNext = () => {
    dispatchQueue({
      type: "ADD_TO_QUEUE",
      payload: { title, artistName, songSrc },
    });
    alert("Added to queue");
  };

  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#6594B1] transition-all">
        <div className="flex items-center justify-between">
          {/* Left Section: Play Button and Info */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlay}
              className="w-12 h-12 bg-[#6594B1] rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all group/play"
            >
              <FiPlay className="w-6 h-6 text-white ml-0.5 group-hover/play:scale-110 transition-transform" />
            </button>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{title}</h3>
              <p className="text-sm text-gray-400 truncate">{artistName}</p>
            </div>
          </div>

          {/* Right Section: Options */}
          <div className="flex items-center space-x-3">
            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={handleAddToPlaylist}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Add to playlist"
              >
                <FiPlus className="w-5 h-5 text-gray-400 hover:text-[#6594B1]" />
              </button>

              <button
                onClick={handlePlayNext}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Play next"
              >
                <FiList className="w-5 h-5 text-gray-400 hover:text-[#6594B1]" />
              </button>

              {decoded && decoded.id === userId && (
                <button
                  onClick={deleteSong}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete song"
                >
                  <FiTrash2 className="w-5 h-5 text-gray-400 hover:text-red-400" />
                </button>
              )}
            </div>

            {/* Mobile Options Button */}
            <div className="md:hidden relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <FiMoreVertical className="w-5 h-5 text-gray-400" />
              </button>

              {/* Mobile Options Dropdown */}
              {showOptions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#213C51] border border-white/10 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleAddToPlaylist();
                        setShowOptions(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      <FiPlus className="w-4 h-4" />
                      <span>Add to Playlist</span>
                    </button>

                    <button
                      onClick={() => {
                        handlePlayNext();
                        setShowOptions(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      <FiList className="w-4 h-4" />
                      <span>Play Next</span>
                    </button>

                    {decoded && decoded.id === userId && (
                      <button
                        onClick={() => {
                          deleteSong();
                          setShowOptions(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Delete Song</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showOptions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default SongCard;
