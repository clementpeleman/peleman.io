import { VakPagina, vakMetadata } from "../_secties/VakPagina";
import { interieurarchitecten } from "@/lib/vakken";

export const metadata = vakMetadata(interieurarchitecten);

export default function Interieurarchitecten() {
  return <VakPagina vak={interieurarchitecten} />;
}
