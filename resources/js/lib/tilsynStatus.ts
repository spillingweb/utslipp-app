type TilsynStatusType = {
  value: string;
  color: string;
  text: string;
  small?: boolean;
  stroke?: string;
};

export const TILSYN_STATUS: TilsynStatusType[] = [
  { value: 'O', color: "#000", text: "Tilknytta kommunalt avløp", small: true },
  { value: 'T', color: "#0074d9", text: "Tilsyn påbegynt" },
  { value: 'PB', color: "#00ffff", text: "Pliktbrev sendt" },
  { value: 'I', color: "#9400D3", text: "Infobrev sendt" },
  { value: 'B', color: "#ffde21", text: "Behov for befaring" },
  { value: 'OK', color: "#008000", text: "OK, men ikke ferdig håndtert" },
  { value: 'GV', color: "#ff2c2c", text: "Send varsel - utbedring" },
  { value: 'GVT', color: "#000", text: "Send varsel - tilknytning" },
  { value: 'V', color: "#8B4513", text: "Forhåndsvarsel sendt" },
  { value: 'P', color: "#ffa500", text: "Pålegg sendt" },
  { value: 'FT', color: "#ffb3ff", text: "Forhåndsvarsel om tvangsmulkt sendt" },
  { value: 'VT', color: "#ff00ff", text: "Vedtak om tvangsmulkt sendt" },
  { value: 'TL', color: "#2C02FF", text: "Tvangsmulkt løper" },
  { value: 'F', color: "#fffafa", stroke: "#f7f7f7",  text: "Ferdig håndtert og sak avslutta" },
];
