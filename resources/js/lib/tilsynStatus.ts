type TilsynStatusType = {
  color: string;
  text: string;
  small?: boolean;
  stroke?: string;
};

export const TILSYN_STATUS: TilsynStatusType[] = [
  { color: "#000", text: "Tilknytta kommunalt avløp", small: true },
  { color: "#0074d9", text: "Tilsyn påbegynt" },
  { color: "#00ffff", text: "Pliktbrev sendt" },
  { color: "#9400D3", text: "Infobrev sendt" },
  { color: "#ffde21", text: "Behov for befaring" },
  { color: "#008000", text: "OK, men ikke ferdig håndtert" },
  { color: "#ff2c2c", text: "Send varsel - utbedring" },
  { color: "#000", text: "Send varsel - tilknytning" },
  { color: "#8B4513", text: "Forhåndsvarsel sendt" },
  { color: "#ffa500", text: "Pålegg sendt" },
  { color: "#ffb3ff", text: "Forhåndsvarsel om tvangsmulkt sendt" },
  { color: "#ff00ff", text: "Vedtak om tvangsmulkt sendt" },
  { color: "#2C02FF", text: "Tvangsmulkt løper" },
  { color: "#fffafa", stroke: "#f7f7f7",  text: "Ferdig håndtert og sak avslutta" },
];
