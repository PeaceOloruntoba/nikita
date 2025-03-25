import React from "react";

export default function Support() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center px-6">
      <span className="w-full text-xl font-semibold pb-3 pl-3">Support</span>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Ihr Name</label>
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent/70 px-2 py-1 border outline-none border-black/70 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Ihre E-Mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="bg-transparent/70 px-2 py-1 border outline-none border-black/70 rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="">Ihre E-Mail</label>
          <textarea
            name="message"
            placeholder="Beschreiben Sie Ihr Anliegen"
            id=""
            rows={6}
            className="bg-transparent/70 px-2 py-1 border outline-none border-black/70 rounded-lg"
          ></textarea>
        </div>
        <div className="flex gap-2 items-start">
          <input type="checkbox" name="agree" id="" />
          <span>
            Ich stimme zu, dass meine angegebenen Data gemas de{" "}
            <b>Datenschutzerklarung</b> verarbeitet werden. Ich kann meine
            Einwilligung jederzeit mit Wirkung fur die Zukunft widerrufen.
          </span>
        </div>
        <button className="bg-primary text-white rounded-lg font-semibold py-2">Senden</button>
      </div>
    </div>
  );
}
