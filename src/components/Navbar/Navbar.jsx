import React, { useState, useEffect } from "react";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { HiMenu, HiX, HiArrowLeft } from "react-icons/hi";

const Navbar = ({ onSearchNote, userInfo, handleCloseSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // ✅ Mobile & Tablet check
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearchNote(searchQuery);
      if (isMobile) {
        setIsSearching(true); // ✅ Hide Logo, Show Back Button
        setIsMenuOpen(false);
      }
    }
  };

  const handleBack = () => {
    setSearchQuery("");
    handleCloseSearch(); // ✅ Show all notes
    setIsSearching(false); // ✅ Show Logo again
  };

  const hideNavItems = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-white flex items-center justify-between  px-6 py-4 shadow-md w-full relative">
      {/* Left - Logo or Back Button on Mobile */}
      {isMobile && isSearching ? (
        <button onClick={handleBack} className="text-2xl text-black">
          <HiArrowLeft /> {/* ✅ Replaces "EverWrite" when searching */}
        </button>
      ) : (
        <h2 className="text-xl font-semibold text-black">EverWrite</h2> // Default Logo
      )}

      {/* Desktop Menu (Always Visible) */}
      {!hideNavItems && !isMobile && (
        <div className="hidden lg:flex items-center space-x-6">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={handleBack}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}

      {/* Mobile & Tablet Menu Button */}
      {!hideNavItems && isMobile && (
        <button className="lg:hidden text-2xl text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      )}

      {/* Mobile & Tablet Dropdown Menu */}
      {isMenuOpen && !hideNavItems && isMobile && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-4 lg:hidden z-50">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={handleBack}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
