import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import { SidebarContext } from "../Context/SibebarContext";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import { FiMusic, FiSearch } from "react-icons/fi";

const Songs = () => {
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { fetchSong } = useContext(FetchContext);
  const { __URL__ } = useContext(SongContext);

  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (showMenu) setShowMenu(false);
    fetchSongs();
  }, [fetchSong]);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${__URL__}/api/v1/songs`);
      setSongs(data["songs"] || []);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
    setLoading(false);
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#213C51] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#6594B1] rounded-lg flex items-center justify-center">
                <FiMusic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Explore Music</h1>
                <p className="text-gray-400">
                  Discover amazing tracks from artists worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
              placeholder="Search songs, artists..."
            />
          </div>
        </div>

        {/* Songs Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredSongs.length} of {songs.length} songs
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-[#6594B1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="text-center py-20">
            <FiMusic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No songs found
            </h3>
            <p className="text-gray-400">
              Try a different search term or upload your own music
            </p>
          </div>
        ) : (
          /* Songs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map((song, index) => (
              <div
                key={song._id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#6594B1] transition-all hover:transform hover:-translate-y-1"
              >
                <SongCard
                  title={song.title}
                  artistName={song.artist}
                  songSrc={song.song}
                  userId={song.uploadedBy}
                  songId={song._id}
                  file={song.file}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;
