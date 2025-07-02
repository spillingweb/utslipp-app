import { AddressData } from "@/types";

export async function fetchAddressData(searchParams: {
  gardsnummer: string;
  bruksnummer: string;
  festenummer: string;
  adressenavn: string;
  nummer: string;
}): Promise<AddressData> {
  const url = new URL(
    "https://ws.geonorge.no/adresser/v1/sok?kommunenavn=Ringerike&treffPerSide=20&side=0&asciiKompatibel=true"
  );

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== "") {
      url.searchParams.append(key, value);
    }
  }  

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(
      `Kunne ikke hente adresse-data fra Kartverket. \nStatusmelding: ${response.statusText}`
    );
  }
  return await response.json();
}

export async function fetchPositionData(lat: number, lon: number): Promise<AddressData> {
  const url = new URL(
    `https://ws.geonorge.no/adresser/v1/punktsok?lat=${lat}&lon=${lon}&radius=10&koordsys=4258&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true`
  );

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(
      `Kunne ikke hente adresse-data fra Kartverket.
      Statusmelding: ${response.statusText}`
    );
  }
  return await response.json();
}
