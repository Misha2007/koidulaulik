import { useState } from "react";

function Activity(props) {
  return (
    <div className={`shadow-md p-6 bg-activity w-80 relative`}>
      {props.isPinned && (
        <div className="w-15 h-15 absolute -top-3 left-30">
          <img className="w-full h-full" src="/pin.svg" alt="" />
        </div>
      )}
      <h2
        className={`${props.isPinned ? "mt-7" : ""} text-2xl font-semibold mb-2 text-center text-black font-[condiment] font-regular`}
      >
        {props.activity.name}
      </h2>
      <img src={props.activity.img} alt="" />
      <br />

      <p className="text-black text-wrap break-words font-[condiment]">
        {props.activity.description}
      </p>
      <br />
      {props.activity.price && (
        <p className="text-black text-wrap break-words font-[condiment]">
          Fee: {props.activity.price}
        </p>
      )}
    </div>
  );
}

export default Activity;
