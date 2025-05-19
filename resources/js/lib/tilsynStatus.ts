type TilsynStatusType = {
  id: "O" | "T" | "PB" | "I" | "B" | "GV" | "GVT" | "OK" | "V" | "P" | "FT" | "VT" | "TL" | "F";
  color: string;
  text: string;
  small?: boolean;
  stroke?: string;
};

export const TILSYN_STATUS: TilsynStatusType[] = [
  { id: 'O', color: "#000", text: "Tilknytta kommunalt avløp", small: true },
  { id: 'T', color: "#0074d9", text: "Tilsyn påbegynt" },
  { id: 'PB', color: "#00ffff", text: "Pliktbrev sendt" },
  { id: 'I', color: "#9400D3", text: "Infobrev sendt" },
  { id: 'B', color: "#ffde21", text: "Behov for befaring" },
  { id: 'OK', color: "#008000", text: "OK, men ikke ferdig håndtert" },
  { id: 'GV', color: "#ff2c2c", text: "Send varsel - utbedring" },
  { id: 'GVT', color: "#000", text: "Send varsel - tilknytning" },
  { id: 'V', color: "#8B4513", text: "Forhåndsvarsel sendt" },
  { id: 'P', color: "#ffa500", text: "Pålegg sendt" },
  { id: 'FT', color: "#ffb3ff", text: "Forhåndsvarsel om tvangsmulkt sendt" },
  { id: 'VT', color: "#ff00ff", text: "Vedtak om tvangsmulkt sendt" },
  { id: 'TL', color: "#2C02FF", text: "Tvangsmulkt løper" },
  { id: 'F', color: "#fffafa", stroke: "#f7f7f7",  text: "Ferdig håndtert og sak avslutta" },
];
