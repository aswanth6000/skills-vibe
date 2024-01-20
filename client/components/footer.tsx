"use client";
import { faLinkedin, faXTwitter, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  return (
    <>
      <div className="min-w-full h-56 border-y-2 ">
        <div> dsds</div>
      </div>
      <div className="min-w-full h-24 border-y-2 flex justify-between p-5  text-gray-400 items-center">
        <div className="text-md font-semibold">Slils Vibe © All rights reserved</div>
        <div className="flex">
        <div className="text-md font-semibold mr-4">
          <FontAwesomeIcon icon={faLinkedin} />
        </div>
        <div className="text-md font-semibold mr-4">
          <FontAwesomeIcon icon={faInstagram} />
        </div>
        <div className="text-md font-semibold mr-4">
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        </div>

      </div>
    </>
  );
}
