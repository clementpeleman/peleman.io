import { VakPagina, vakMetadata } from "../_secties/VakPagina";
import { tuinaanleg } from "@/lib/vakken";

export const metadata = vakMetadata(tuinaanleg);

export default function Tuinaanleg() {
  return <VakPagina vak={tuinaanleg} />;
}
