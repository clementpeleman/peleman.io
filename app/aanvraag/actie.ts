"use server";

import { redirect } from "next/navigation";

// Nog niet gekoppeld: de aanvraag wordt niet bewaard of verstuurd. Volgende stap: doorsturen naar Twenty en een bevestigingsmail.
export async function vraagVoorbeeldAan(_gegevens: FormData) {
  redirect("/aanvraag/bedankt");
}
