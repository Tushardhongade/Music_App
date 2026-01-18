import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import PlaylilstSong from "../components/PlaylistSong"; // Changed to match your actual file name
import { FiTrash2, FiMusic, FiArrowLeft } from "react-icons/fi";

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchPlaylist } = useContext(FetchContext);
  const { __URL__ } = useContext(SongContext);

  const headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("access_token"),
  };

  const deletePlaylist = async () => {
    if (!window.confirm("Are you sure you want to delete this playlist?"))
      return;

    setLoading(true);
    try {
      const { status } = await axios.delete(
        `${__URL__}/api/v1/playlist/delete/${id}`,
        { headers }
      );

      if (status === 200) {
        alert("Playlist deleted successfully");
        navigate("/playlists");
      }
    } catch (error) {
      alert("Error deleting playlist");
      console.error(error);
    }
    setLoading(false);
  };

  const getPlaylist = async () => {
    try {
      const { data } = await axios.get(`${__URL__}/api/v1/playlist/${id}`, {
        headers,
      });
      setPlaylist(data["playlist"]);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [fetchPlaylist]);

  if (loading || !playlist) {
    return (
      <div className="min-h-screen bg-[#213C51] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#6594B1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#213C51] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/playlists")}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <FiArrowLeft className="w-6 h-6 text-gray-400" />
              </button>
              <div className="w-16 h-16 bg-[#6594B1] rounded-lg flex items-center justify-center">
                <FiMusic className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {playlist.playlistName}
                </h1>
                <p className="text-gray-400">
                  {playlist.songs?.length || 0} songs • Created by You
                </p>
              </div>
            </div>

            <button
              onClick={deletePlaylist}
              disabled={loading}
              className="flex items-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Songs List */}
        <div className="space-y-2">
          {playlist.songs?.length === 0 ? (
            <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <FiMusic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                No songs in this playlist
              </h3>
              <p className="text-gray-400">Add songs from the Explore page</p>
            </div>
          ) : (
            playlist.songs.map((song, index) => (
              <div
                key={song._id || index}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-[#6594B1] transition-all"
              >
                <PlaylilstSong // Changed to match your actual file name
                  title={song.title}
                  artistName={song.artistName}
                  songSrc={song.songSrc}
                  playlistId={id}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
