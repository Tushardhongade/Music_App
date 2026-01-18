import React, { useState, useContext } from "react";
import axios from "axios";
import { SongContext } from "../Context/SongContext";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";
import { FiMusic, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlistName, playlistId, noSongs }) => {
  const { setFetchPlaylist } = useContext(FetchContext);
  const { __URL__ } = useContext(SongContext);
  const { list, dispatchList } = useContext(QueueContext);
  const [loading, setLoading] = useState(false);

  const addSongToPlaylist = async () => {
    if (list.length === 0) {
      alert("Please select a song from the Explore page first");
      return;
    }

    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("access_token"),
    };

    try {
      const { data, status } = await axios.post(
        `${__URL__}/api/v1/playlist/add/${playlistId}`,
        list,
        { headers }
      );

      if (status === 200) {
        alert("Song added to playlist");
        setFetchPlaylist((prev) => !prev);
        dispatchList({ type: "CLEAR_LIST" });
      }
    } catch (error) {
      alert("Error adding song to playlist");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="relative group">
      {/* Add to Playlist Button */}
      <button
        onClick={addSongToPlaylist}
        disabled={loading || list.length === 0}
        className="absolute -top-2 -right-2 w-8 h-8 bg-[#6594B1] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Add selected song to this playlist"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <FiPlus className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Playlist Card */}
      <Link to={`/playlist/${playlistId}`} className="block">
        <div className="space-y-4">
          {/* Cover Image */}
          <div className="relative">
            <div className="w-full h-40 bg-gradient-to-br from-[#213C51] to-[#6594B1] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <FiMusic className="w-12 h-12 text-white opacity-50" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {noSongs} songs
            </div>
          </div>

          {/* Playlist Info */}
          <div>
            <h3 className="font-semibold text-white truncate">
              {playlistName}
            </h3>
            <p className="text-sm text-gray-400">
              {noSongs} {noSongs === 1 ? "song" : "songs"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard;
