import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import PlaylistCard from "../components/PlaylistCard";
import { SidebarContext } from "../Context/SibebarContext";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import { QueueContext } from "../Context/QueueContex";
import { FiPlus, FiMusic, FiX } from "react-icons/fi";

const CreatePlaylist = () => {
  const { fetchPlaylist } = useContext(FetchContext);
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { __URL__ } = useContext(SongContext);
  const { list } = useContext(QueueContext);

  const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    if (showMenu) setShowMenu(false);
    fetchPlaylists();
  }, [fetchPlaylist]);

  const fetchPlaylists = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setPlaylists([]);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    };

    try {
      const { data } = await axios.get(`${__URL__}/api/v1/playlist`, {
        headers,
      });
      setPlaylists(data["playlists"] || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const createPlaylist = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to create a playlist");
      return;
    }

    if (!playlistName.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    };

    try {
      const { data, status } = await axios.post(
        `${__URL__}/api/v1/playlist/create`,
        { playlistName },
        { headers }
      );

      if (status === 200) {
        alert("Playlist created successfully");
        setCreatePlaylistOpen(false);
        setPlaylistName("");
        fetchPlaylists();
      }
    } catch (error) {
      alert("Error creating playlist");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#213C51] px-4 py-8 pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#6594B1] rounded-lg flex items-center justify-center">
                <FiMusic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Your Playlists
                </h1>
                <p className="text-gray-400">
                  Create and manage your music collections
                </p>
              </div>
            </div>

            <button
              onClick={() => setCreatePlaylistOpen(true)}
              className="flex items-center space-x-2 bg-[#6594B1] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              <FiPlus />
              <span>Create</span>
            </button>
          </div>
        </div>

        {/* Playlists Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-[#6594B1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : playlists.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <FiMusic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No playlists yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first playlist to organize your favorite songs
            </p>
            <button
              onClick={() => setCreatePlaylistOpen(true)}
              className="inline-flex items-center space-x-2 bg-[#6594B1] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
            >
              <FiPlus />
              <span>Create Playlist</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#6594B1] transition-all hover:transform hover:-translate-y-1"
              >
                <PlaylistCard
                  playlistName={playlist.playlistName}
                  playlistId={playlist._id}
                  noSongs={playlist.songs?.length || 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Create Playlist Modal */}
        {createPlaylistOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#213C51] rounded-2xl p-8 max-w-md w-full border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Create New Playlist
                </h2>
                <button
                  onClick={() => setCreatePlaylistOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <FiX className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Playlist Name
                  </label>
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="block w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
                    placeholder="My Awesome Playlist"
                    autoFocus
                  />
                </div>

                {list.length > 0 && (
                  <div className="bg-[#6594B1]/10 border border-[#6594B1]/20 rounded-lg p-4">
                    <p className="text-sm text-[#6594B1]">
                      {list.length} song{list.length > 1 ? "s" : ""} will be
                      added to this playlist
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={createPlaylist}
                    className="flex-1 bg-[#6594B1] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all font-medium"
                  >
                    Create Playlist
                  </button>
                  <button
                    onClick={() => setCreatePlaylistOpen(false)}
                    className="flex-1 border border-gray-600 text-gray-400 py-3 px-4 rounded-lg hover:bg-white/5 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePlaylist;
