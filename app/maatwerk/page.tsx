import { VakPagina, vakMetadata } from "../_secties/VakPagina";
import { maatwerk } from "@/lib/vakken";

export const metadata = vakMetadata(maatwerk);

export default function Maatwerk() {
  return <VakPagina vak={maatwerk} />;
}
