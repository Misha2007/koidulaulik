import { useEffect, useState } from "react";
import Activity from "./Activity";
import { useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const { VITE_API_URL } = import.meta.env;

function NewsPaper() {
  let params = useParams();
  let filePath = params["id"];
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}articles/${filePath}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          const errorMessage = await response.text();
          setError({
            title: "Problems with backend",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }

        console.log(data);
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
        return;
      }
    };
    fetchData();
  }, [filePath]);

  const layouts = {
    // Classic vertical column newspaper
    1: {
      page: "flex flex-col gap-6",
      title1:
        "text-4xl p-5 font-semibold text-center text-black font-[kenia] border-b-2 border-t-2 border-darkbrown",
      sectionTitle1: "text-2xl font-bold mb-2 text-darkbrown font-[kenia]",
      paragraph1:
        "text-lg text-justify text-black font-[Kelly_Slab] leading-relaxed",
    },

    // Two-column newspaper style
    2: {
      page: "flex gap-6",
      title1:
        "text-4xl p-5 font-semibold text-center text-black font-[kenia] border-b-2 border-t-2 border-darkbrown",
      sectionTitle1: "text-xl font-semibold mb-1 text-darkbrown font-[kenia]",
      paragraph1:
        "text-base text-justify text-black font-[Kelly_Slab] leading-relaxed",
    },

    // Featured article style, fixed to container
    3: {
      page: "flex flex-col gap-4",
      title1:
        "text-3xl p-4 font-bold text-center text-gray-900 font-[playfair] border-b-2 border-darkbrown",
      sectionTitle1:
        "text-xl font-semibold mb-2 text-gray-800 font-[playfair] uppercase tracking-wide",
      paragraph1:
        "text-base text-justify text-gray-900 font-[Georgia] leading-relaxed",
    },
  };
  const randomLayout1 = Math.floor(Math.random() * 3) + 1;
  const randomLayout2 = Math.floor(Math.random() * 3) + 1;

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden max-w-5xl mx-auto">
      <div className="w-1/2 p-4 h-[70lvh] overflow-y-auto bg-newspaper rounded-sm border-5 border-black">
        <div className="p-4 rounded-lg mb-4">
          <h2 className="logo-small text-center">NewsPaper</h2>
        </div>
        <h1 className={layouts[randomLayout1].title1}>
          Pealkiri idk how is it in English
        </h1>
        <div className={layouts[randomLayout1].page}>
          <div className="p-4">
            <h2 className={layouts[randomLayout1].sectionTitle1}>NewsPaper</h2>
            <p className={layouts[randomLayout1].paragraph1}>
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
            <h2 className={layouts[randomLayout1].sectionTitle1}>NewsPaper</h2>
            <p className={layouts[randomLayout1].paragraph1}>
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
      <div className="w-1/2 p-4 h-[70lvh] overflow-y-auto bg-newspaper rounded-sm border-5 border-black">
        <div className="p-4 rounded-lg mb-4">
          <h2 className="logo-small text-center">NewsPaper</h2>
        </div>
        <h1 className={layouts[randomLayout2].title1}>
          Pealkiri idk how is it in English
        </h1>
        <div className={layouts[randomLayout2].page}>
          <div className="p-4">
            <h2 className={layouts[randomLayout2].sectionTitle1}>NewsPaper</h2>
            <p className={layouts[randomLayout2].paragraph1}>
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
            <h2 className={layouts[randomLayout2].sectionTitle1}>NewsPaper</h2>
            <p className={layouts[randomLayout2].paragraph1}>
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
