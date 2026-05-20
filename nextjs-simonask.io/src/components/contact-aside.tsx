import Image from "next/image";

import { ContactQuickLinks } from "@/components/contact-quick-links";

export function ContactAside() {
  return (
    <aside className="flex w-full max-w-xs flex-col items-center gap-4 sm:w-48 sm:max-w-none sm:shrink-0 sm:items-stretch">
      <figure className="overflow-hidden rounded-lg">
        <Image
          src="/simon-portrait.png"
          alt="Portrait of Simon Ask"
          width={80}
          height={80}
          className="h-20 w-20 rounded-lg"
          sizes="5rem"
        />
      </figure>

      <ContactQuickLinks />
    </aside>
  );
}
