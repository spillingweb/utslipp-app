type RadioBtn = {
  label: string;
  id: string;
  value: string;
};

export const FILTER_RADIO_BUTTONS: RadioBtn[] = [
  { label: "Vis bare tilsynsobjekter", id: "fltDefault", value: "!O" },
  {
    label: "Vis både tilsynsobjekter og bygninger knytta til kommunalt avløp",
    id: "fltAll",
    value: "ALL",
  },
  {
    label: "Vis tilsynsobjekter der hvor fristen har gått ut",
    id: "fltFristUte",
    value: "F",
  },
];

export type SelectOption = {
  value: string;
  text?: string;
};

export const FILTER_SELECT_OPTIONS: SelectOption[] = [
  { value: "null", text: "Velg felt" },
  { value: "bygning", text: "Bygningstype" },
  { value: "prosjekt" },
  { value: "status" },
  { value: "hjemmel" },
  { value: "saksbeh", text: "Saksbehandler" },
  { value: "frist" },
  { value: "sone" },
];

export const AND_OR_NOT_BUTTONS: RadioBtn[] = [
  { label: "OG", id: "radioAND", value: "AND" },
  { label: "ELLER", id: "radioOR", value: "OR" },
  { label: "OG IKKE", id: "radioNOT", value: "AND NOT" },
];
