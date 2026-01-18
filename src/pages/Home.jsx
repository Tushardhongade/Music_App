import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const [currentTheme, setCurrentTheme] = useState("default");

  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, []);

  const theme = {
    primary: "#6594B1",
    secondary: "#213C51",
    accent: "#F9C846",
    light: "#F0F7FF",
    dark: "#0D1B2A",
  };

  const token = localStorage.getItem("access_token") || null;
  const features = [
    { title: "HD Audio", icon: "🎵", desc: "Crystal clear sound quality" },
    { title: "No Ads", icon: "🚫", desc: "Uninterrupted listening" },
    { title: "Offline Mode", icon: "📱", desc: "Listen anywhere" },
    { title: "24/7 Access", icon: "🌙", desc: "Always available" },
  ];

  return (
    <div className="min-h-screen bg-[#213C51]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#6594B1] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F9C846] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#213C51] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#6594B1] rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative w-32 h-32 bg-[#6594B1] rounded-full flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-20 h-20 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Stream Your <span className="text-[#6594B1]">Favorite</span>{" "}
                Music
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Discover, upload, and enjoy millions of songs with crystal clear
                audio quality
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#6594B1] transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                {token ? (
                  <Link
                    to="/upload"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#6594B1] rounded-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-xl"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Upload Music
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#6594B1] rounded-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-xl"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Get Started
                  </Link>
                )}

                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#6594B1] bg-transparent border-2 border-[#6594B1] rounded-lg hover:bg-[#6594B1] hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Explore Music
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6594B1] mb-2">
                    10K+
                  </div>
                  <div className="text-gray-400">Songs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6594B1] mb-2">
                    1M+
                  </div>
                  <div className="text-gray-400">Streams</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6594B1] mb-2">
                    5K+
                  </div>
                  <div className="text-gray-400">Artists</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
