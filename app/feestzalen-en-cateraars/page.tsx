import { VakPagina, vakMetadata } from "../_secties/VakPagina";
import { feest } from "@/lib/vakken";

export const metadata = vakMetadata(feest);

export default function Feest() {
  return <VakPagina vak={feest} />;
}
