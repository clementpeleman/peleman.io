// Kijkt elke advertentie na op lengtes van Meta, de merkstem (docs/brand/website-abonnement/11-merkstem.md)
// en de afspraken over cases. Fouten stoppen met code 1; ‘nakijken’ is een woord dat soms mag.
import { advertenties, type Advertentie, type Beeldinhoud } from "../inhoud.ts";
import { posts } from "../posts.ts";

type Melding = { id: string; veld: string; soort: "fout" | "nakijken"; tekst: string };

// Meta toont ongeveer 125 tekens van de hoofdtekst voor ‘meer’; kop en beschrijving zoals Meta ze aanraadt.
const lengtes = { hoofdtekst: 300, kop: 40, beschrijving: 30, kaart: 40 };

const tekens: [RegExp, string][] = [
  [/!/, "uitroepteken"],
  [/[—–]/, "gedachtestreepje"],
  [/…|\.\.\./, "beletselteken"],
  [/'/, "rechte apostrof, gebruik ’"],
  [/ {2}/, "dubbele spatie"],
];

// Uit de vermijdlijst en ‘Wat we nooit zeggen’.
const verboden = [
  "goedkoop", "goedkope", "spotprijs", "premium", "luxe", "hebbeding", "huren", "huur", "leasen", "lease",
  "oplossing", "oplossingen", "synergie", "naadloos", "next level", "hoger niveau", "leads", "conversie", "cta",
  "landingspagina", "seo", "zoekmachineoptimalisatie", "kleine wijziging", "wijzigingsronde", "demo", "testsite",
  "mockup", "ai", "ai-gedreven", "team van experts", "full-service", "revolutionair", "uniek", "de beste",
  "state of the art", "gegarandeerd", "garantie", "laatste kans", "nummer één", "meer klanten",
  // ‘wij’ en ‘je’, nooit ‘ik’ of ‘u’.
  "ik", "mijn", "u", "uw", "ge",
  // Cases: namen nooit in de tekst; in beeld mogen ze zichtbaar zijn.
  "h16", "h16.be", "lvq", "lvq.wine", "le vin quotidien", "tourage",
];

// Woorden die over het vak van de klant mogen gaan, maar niet over ons aanbod.
const nakijken = ["budget", "maatwerk", "op maat"];

function woord(tekst: string, w: string) {
  return new RegExp(`(^|[^\\p{L}\\p{N}])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^\\p{L}\\p{N}])`, "iu").test(tekst);
}

function velden(a: Beeldinhoud & Partial<Advertentie> & { bijschrift?: string }): [string, string][] {
  const lijst: [string, string][] = [];
  if (a.hoofdtekst) lijst.push(["hoofdtekst", a.hoofdtekst], ["kop", a.kop!], ["beschrijving", a.beschrijving!]);
  // Een bijschrift is lopende tekst met witregels en hashtags; die tellen niet als woorden of dubbele spaties.
  if (a.bijschrift) lijst.push(["bijschrift", a.bijschrift.replace(/\n+/g, " ").replace(/#\S+/g, "").trim()]);
  const b = a.beeld;
  if (b.kop) lijst.push(["beeld.kop", b.kop.join(" ")]);
  for (const [naam, waarde] of [["beeld.tekst", b.tekst], ["beeld.pil", b.pil], ["beeld.voetnoot", b.voetnoot], ["beeld.slot", b.slot]] as const) {
    if (waarde) lijst.push([naam, waarde]);
  }
  b.lijst?.forEach((r, i) => lijst.push([`beeld.lijst.${i + 1}`, r]));
  b.zinnen?.forEach((r, i) => lijst.push([`beeld.zin.${i + 1}`, r]));
  a.kaarten?.forEach((k, i) => {
    lijst.push([`kaart.${i + 1}.kop`, k.kop], [`kaart.${i + 1}.titel`, k.titel.filter(Boolean).join(" ")]);
    if (k.tekst) lijst.push([`kaart.${i + 1}.tekst`, k.tekst]);
  });
  return lijst;
}

const meldingen: Melding[] = [];
const ids = new Set<string>();

for (const a of advertenties) {
  const m = (veld: string, soort: Melding["soort"], tekst: string) => meldingen.push({ id: a.id, veld, soort, tekst });

  if (!/^[a-z0-9-]+$/.test(a.id)) m("id", "fout", "alleen kleine letters, cijfers en koppeltekens (het is ook de utm_content)");
  if (ids.has(a.id)) m("id", "fout", "komt twee keer voor");
  ids.add(a.id);

  if (a.hoofdtekst.length > lengtes.hoofdtekst) m("hoofdtekst", "fout", `${a.hoofdtekst.length} tekens, hooguit ${lengtes.hoofdtekst}`);
  if (a.kop.length > lengtes.kop) m("kop", "fout", `${a.kop.length} tekens, hooguit ${lengtes.kop}`);
  if (a.beschrijving.length > lengtes.beschrijving) m("beschrijving", "fout", `${a.beschrijving.length} tekens, hooguit ${lengtes.beschrijving}`);
  a.kaarten?.forEach((k, i) => k.kop.length > lengtes.kaart && m(`kaart.${i + 1}.kop`, "fout", `${k.kop.length} tekens, hooguit ${lengtes.kaart}`));

  for (const [veld, tekst] of velden(a)) {
    for (const [patroon, wat] of tekens) if (patroon.test(tekst)) m(veld, "fout", wat);
    for (const w of verboden) if (woord(tekst, w)) m(veld, "fout", `‘${w}’ hoort niet in een advertentie`);
    for (const w of nakijken) if (woord(tekst, w)) m(veld, "nakijken", `‘${w}’: alleen over het werk van de klant`);
    if (/peleman\.io/i.test(tekst) && !/peleman\.io/.test(tekst)) m(veld, "fout", "peleman.io altijd met kleine letters");
    for (const zin of tekst.split(/(?<=[.?:])\s+/)) {
      const n = zin.split(/\s+/).filter(Boolean).length;
      if (n > 20) m(veld, "nakijken", `zin van ${n} woorden: ‘${zin.slice(0, 40)}’`);
    }
  }

  // Een prijs in de tekst rond het beeld staat altijd met btw-vermelding; in het beeld volstaat één regel.
  for (const [veld, tekst] of velden(a).filter(([v]) => !v.startsWith("beeld."))) {
    if (/€\s?\d/.test(tekst) && !/btw/.test(tekst) && !/btw/.test(a.hoofdtekst)) m(veld, "fout", "prijs zonder ‘excl. btw’");
  }
  const beeldTekst = velden(a).filter(([v]) => v.startsWith("beeld.")).map(([, t]) => t).join(" ");
  if (/€\s?\d/.test(beeldTekst) && !/btw/.test(beeldTekst)) m("beeld", "fout", "prijs in beeld zonder btw-vermelding");

  if (a.beeld.kop) {
    const n = a.beeld.kop.join(" ").split(/\s+/).length;
    if (n > 10) m("beeld.kop", "nakijken", `${n} woorden; titels liefst hooguit acht`);
  }
  if (["glas", "gsm", "aanvraag", "scherm", "stappen", "schermvideo"].includes(a.sjabloon)) {
    if (!a.scherm) m("scherm", "fout", "dit sjabloon toont een echt scherm; kies er een");
  }
}

for (const p of posts) {
  const m = (veld: string, soort: Melding["soort"], tekst: string) => meldingen.push({ id: `post-${p.volgorde}`, veld, soort, tekst });
  if (p.bijschrift.length > 2200) m("bijschrift", "fout", `${p.bijschrift.length} tekens, Instagram toont hooguit 2200`);
  const hashtags = p.bijschrift.match(/#\S+/g) ?? [];
  if (hashtags.length > 5) m("bijschrift", "nakijken", `${hashtags.length} hashtags; hou het bij vijf`);
  for (const [veld, tekst] of velden(p)) {
    for (const [patroon, wat] of tekens) if (patroon.test(tekst)) m(veld, "fout", wat);
    for (const w of verboden) if (woord(tekst, w)) m(veld, "fout", `‘${w}’ hoort niet in een bericht`);
    if (/€\s?\d/.test(tekst) && !/btw/.test(tekst) && veld !== "beeld.kop") m(veld, "fout", "prijs zonder ‘excl. btw’");
  }
}

const fouten = meldingen.filter((x) => x.soort === "fout");
for (const x of meldingen) console.log(`${x.soort === "fout" ? "FOUT    " : "nakijken"}  ${x.id.padEnd(18)} ${x.veld.padEnd(16)} ${x.tekst}`);
console.log(`\n${advertenties.length} advertenties en ${posts.length} berichten, ${fouten.length} fouten, ${meldingen.length - fouten.length} om na te kijken.`);
for (const a of advertenties) {
  const zichtbaar = a.hoofdtekst.length > 125 ? `${a.hoofdtekst.slice(0, 125).trimEnd()}… (meer)` : a.hoofdtekst;
  console.log(`\n${a.id}\n  voor ‘meer’: ${zichtbaar}`);
}
process.exitCode = fouten.length ? 1 : 0;
