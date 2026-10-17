import { Composition, Folder, Still } from "remotion";
import { advertenties, formaten } from "../inhoud.ts";
import { postId, posts } from "../posts.ts";
import { Schermvideo, fps, videoDuur } from "./Schermvideo";
import { Omslag, Profielbeeld, Raster, Stappen, sjablonen } from "./sjablonen";

// Eén compositie per advertentie en formaat. De id wordt de bestandsnaam in uit/.
export function Root() {
  return (
    <>
      {advertenties.map((ad) => (
        <Folder key={ad.id} name={ad.id}>
          {ad.sjabloon === "schermvideo" && (
            <Composition
              id={`${ad.id}-verhaal`}
              component={Schermvideo}
              durationInFrames={videoDuur(ad)}
              fps={fps}
              width={formaten.verhaal.breedte}
              height={formaten.verhaal.hoogte}
              defaultProps={{ ad, veiligeZone: false }}
            />
          )}
          {ad.sjabloon === "stappen" &&
            ad.kaarten!.map((_, i) => (
              <Still
                key={i}
                id={`${ad.id}-kaart-${i + 1}`}
                component={Stappen}
                width={formaten.vierkant.breedte}
                height={formaten.vierkant.hoogte}
                defaultProps={{ ad, kaart: i, veiligeZone: false }}
              />
            ))}
          {sjablonen[ad.sjabloon] &&
            ad.formaten.map((formaat) => (
              <Still
                key={formaat}
                id={`${ad.id}-${formaat}`}
                component={sjablonen[ad.sjabloon]!}
                width={formaten[formaat].breedte}
                height={formaten[formaat].hoogte}
                defaultProps={{ ad, formaat, veiligeZone: false }}
              />
            ))}
        </Folder>
      ))}
      <Folder name="berichten">
        {posts.map((p) => (
          <Still
            key={p.id}
            id={postId(p)}
            component={sjablonen[p.sjabloon]!}
            width={formaten.staand.breedte}
            height={formaten.staand.hoogte}
            defaultProps={{ ad: p, formaat: "staand" as const, veiligeZone: false }}
          />
        ))}
        <Still id="berichten-raster" component={Raster} width={1080} height={1437} />
      </Folder>
      <Folder name="profiel">
        <Still id="profielbeeld" component={Profielbeeld} width={1080} height={1080} />
        <Still id="omslag-facebook" component={Omslag} width={1640} height={624} />
      </Folder>
    </>
  );
}
