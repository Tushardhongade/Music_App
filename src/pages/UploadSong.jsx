import React, { useState, useEffect, useContext } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../Context/SongContext";
import { FiUpload, FiMusic, FiUser, FiFileText, FiImage } from "react-icons/fi";

const UploadSong = () => {
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { __URL__ } = useContext(SongContext);

  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, []);

  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("access_token"),
      },
    };

    try {
      const response = await fetch(`${__URL__}/api/v1/song/upload`, {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("access_token"),
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("File uploaded successfully");
        navigate("/explore");
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#213C51] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#6594B1] rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUpload className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Upload Your Music
          </h1>
          <p className="text-gray-400">Share your music with the world</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Song Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMusic className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
                    placeholder="Enter song title"
                    required
                  />
                </div>
              </div>

              {/* Artist */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Artist Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
                    placeholder="Enter artist name"
                    required
                  />
                </div>
              </div>

              {/* Album */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Album Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
                    placeholder="Enter album name"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1] min-h-[100px]"
                    placeholder="Enter song description"
                    required
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Audio File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-[#6594B1] transition-colors bg-white/5">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        MP3, WAV, FLAC (MAX. 50MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="audio/*"
                      className="hidden"
                      required
                    />
                  </label>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-[#6594B1]">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !localStorage.getItem("access_token")}
                className="w-full flex items-center justify-center space-x-2 bg-[#6594B1] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FiUpload />
                    <span>Upload Song</span>
                  </>
                )}
              </button>

              {!localStorage.getItem("access_token") && (
                <p className="text-red-400 text-sm text-center">
                  Please log in to upload songs
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadSong;
