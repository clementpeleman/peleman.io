"use server";

import { redirect } from "next/navigation";
import { bewaarInTwenty, kanalen, mailBevestiging, mailIntern } from "@/lib/aanvraag-server";
import { contact } from "@/lib/gegevens";
import { leesAanvraag, lijktOpBot, type FormStatus } from "@/lib/formulier";

export async function vraagVoorbeeldAan(_vorige: FormStatus, gegevens: FormData): Promise<FormStatus> {
  if (lijktOpBot(gegevens)) redirect("/aanvraag/bedankt");

  const { aanvraag, status } = leesAanvraag(gegevens);
  if (!aanvraag) return status;

  // De aanvraag is bewaard zodra ze in Twenty staat of in je mailbox is aangekomen.
  const pogingen = await Promise.allSettled([
    ...(kanalen.twenty ? [bewaarInTwenty(aanvraag)] : []),
    ...(kanalen.mail ? [mailIntern(aanvraag)] : []),
  ]);
  for (const p of pogingen) if (p.status === "rejected") console.error("Aanvraag niet bewaard:", p.reason);
  let bewaard = pogingen.some((p) => p.status === "fulfilled");

  if (!kanalen.twenty && !kanalen.mail && process.env.NODE_ENV !== "production") {
    console.info("Aanvraag ontvangen; Twenty en SMTP zijn niet ingesteld:", aanvraag);
    bewaard = true;
  }

  if (!bewaard) {
    return {
      waarden: status.waarden,
      melding: `Je aanvraag kon niet verstuurd worden. Probeer het straks opnieuw, of bel ${contact.telefoonLeesbaar} of mail ${contact.email}.`,
    };
  }

  if (kanalen.mail) {
    await mailBevestiging(aanvraag).catch((fout) => console.error("Bevestigingsmail:", fout));
  }

  redirect("/aanvraag/bedankt");
}
