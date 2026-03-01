import { useState } from "react";
import Activity from "./Activity";
import { useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

function NewsPaper() {
  let params = useParams();
  let filePath = params["id"];

  const [isInterested, setIsInterested] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden max-w-5xl mx-auto">
      <div className="w-1/2 p-4 h-[70lvh] overflow-y-auto bg-newspaper rounded-sm border-5 border-black">
        <div className="p-4 rounded-lg mb-4">
          <h2 className="logo-small text-center">NewsPaper</h2>
        </div>
        <h1 className="text-4xl p-5 font-semibold text-center text-black font-[kenia] font-regular border-b-2 border-t-2 border-darkbrown">
          Pealkiri idk how is it in English
        </h1>
        <div className="p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2 text-left text-blue font-[kenia] font-regular">
            You
          </h2>
          <p className="text-lg text-left text-black font-[kenia] font-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis vulputate lorem. Maecenas vestibulum mollis diam. Sed
            cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus
            accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Sed aliquam, nisi quis
            porttitor congue, elit erat euismod orci, ac placerat dolor lectus
            quis orci.
          </p>
        </div>
      </div>
      <div className="w-1/2 p-4 h-[70lvh] overflow-y-auto bg-newspaper rounded-sm border-5 border-black">
        <div className="p-4 rounded-lg mb-4">
          <h2 className="logo-small text-center">NewsPaper</h2>
        </div>
        <h1 className="text-4xl p-5 font-semibold text-center text-black font-[kenia] font-regular border-b-2 border-t-2 border-darkbrown">
          Pealkiri idk how is it in English
        </h1>
        <div className="flex">
          <div className="p-4">
            <h2 className="logo-small">NewsPaper</h2>
            <p className="text-lg text-left text-black font-['Kelly Slab'] font-regular">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              venenatis vulputate lorem. Maecenas vestibulum mollis diam. Sed
              cursus turpis vitae tortor. Donec posuere vulputate arcu.
              Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Sed
              aliquam, nisi quis porttitor congue, elit erat euismod orci, ac
              placerat dolor lectus quis orci.
            </p>
          </div>
          <div className="p-4">
            <h2 className="logo-small">NewsPaper</h2>
            <p className="text-lg text-left text-black font-['Kelly Slab'] font-regular">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              venenatis vulputate lorem. Maecenas vestibulum mollis diam. Sed
              cursus turpis vitae tortor. Donec posuere vulputate arcu.
              Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Sed
              aliquam, nisi quis porttitor congue, elit erat euismod orci, ac
              placerat dolor lectus quis orci.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPaper;
