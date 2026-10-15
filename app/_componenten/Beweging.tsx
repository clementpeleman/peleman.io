"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Elementen met data-beweeg komen pas in beweging als ze in beeld scrollen.
// Wat al zichtbaar is bij het laden, blijft gewoon staan. Zonder JavaScript staat alles er meteen.
export function Beweging() {
  const pad = usePathname();

  useEffect(() => {
    const kijker = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (!item.isIntersecting) continue;
          item.target.setAttribute("data-beweeg", "in");
          kijker.unobserve(item.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const el of document.querySelectorAll<HTMLElement>('[data-beweeg=""], [data-beweeg="wacht"]')) {
      // Wat bij het laden al in beeld staat, krijgt geen beweging.
      if (el.dataset.beweeg === "" && el.getBoundingClientRect().top < window.innerHeight * 0.88) continue;
      el.setAttribute("data-beweeg", "wacht");
      kijker.observe(el);
    }

    return () => kijker.disconnect();
  }, [pad]);

  return null;
}
