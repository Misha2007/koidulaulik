import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

const { VITE_API_URL } = import.meta.env;

function Activity(props) {
  const [isImageText, setIsImageText] = useState(false);

  const full_img_url =
    props.activity.img_url &&
    "https://kultuuriaken.tartu.ee/" + props.activity.img_url;

  useEffect(() => {
    const textImageChecker = async () => {
      console.log(full_img_url);
      if (full_img_url) {
        const worker = await createWorker("eng");
        const proxyUrl = `${VITE_API_URL}proxy-image?url=${encodeURIComponent(full_img_url)}`;
        const ret = await worker.recognize(proxyUrl);
        setIsImageText(ret.data.text.length > 40);
        await worker.terminate();
      }
    };
    textImageChecker();
  }, []);

  return (
    <>
      {isImageText ? (
        <img src={full_img_url} alt="placeholder" className="mb-6" />
      ) : (
        <div className="shadow-md p-6 bg-activity w-80 relative mb-6">
          {props.isPinned && (
            <div className="w-15 h-15 absolute -top-3 left-30">
              <img className="w-full h-full" src="/pin.svg" alt="Pinned" />
            </div>
          )}
          <h2
            className={`${props.isPinned ? "mt-7" : ""} text-2xl font-semibold mb-2 text-center text-black font-[condiment] font-regular`}
          >
            {props.activity.name}
          </h2>
          <img
            src={full_img_url}
            alt={props.activity.name}
            className={"mb-4 mt-2"}
          />
          <p className="text-black break-words font-[condiment]">
            {props.activity.description}
          </p>
          {props.activity.price && (
            <p className="text-black break-words font-[condiment]">
              Fee: {props.activity.price}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Activity;
