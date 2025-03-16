import React from "react";
import youtube_icon from "../assets/youtube_icon.png";
import twitter_icon from "../assets/twitter_icon.png";
import instagram_icon from "../assets/instagram_icon.png";
import facebook_icon from "../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="w-full bg-black text-gray-500 py-12 px-8 min-h-[250px]">
      <div className="mx-auto text-left max-w-7xl">
        <div className="flex gap-5 mb-6">
          <img
            src={facebook_icon}
            alt="Facebook"
            className="w-8 cursor-pointer hover:opacity-70"
          />
          <img
            src={instagram_icon}
            alt="Instagram"
            className="w-8 cursor-pointer hover:opacity-70"
          />
          <img
            src={twitter_icon}
            alt="Twitter"
            className="w-8 cursor-pointer hover:opacity-70"
          />
          <img
            src={youtube_icon}
            alt="YouTube"
            className="w-8 cursor-pointer hover:opacity-70"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 text-sm md:grid-cols-4">
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">
              Audio Description
            </li>
            <li className="cursor-pointer hover:underline">
              Investor Relations
            </li>
            <li className="cursor-pointer hover:underline">Legal Notices</li>
          </ul>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">Help Center</li>
            <li className="cursor-pointer hover:underline">Jobs</li>
            <li className="cursor-pointer hover:underline">
              Cookie Preferences
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">Gift Cards</li>
            <li className="cursor-pointer hover:underline">Terms of Use</li>
            <li className="cursor-pointer hover:underline">
              Corporate Information
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">Media Center</li>
            <li className="cursor-pointer hover:underline">Privacy</li>
            <li className="cursor-pointer hover:underline">Contact Us</li>
          </ul>
        </div>

        <button className="px-4 py-2 mb-6 text-sm text-gray-500 border border-gray-500 hover:text-white hover:border-white">
          Service Code
        </button>

        <p className="text-sm">© 1997-2025 Netflix, Inc.</p>
        <p className="text-sm">Design by LaVine</p>
      </div>
    </div>
  );
};

export default Footer;
