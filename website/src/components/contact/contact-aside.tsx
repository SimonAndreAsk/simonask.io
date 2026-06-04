import Image from "next/image";

export function ContactAside() {
  return (
    <aside className="flex flex-col items-center">
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
    </aside>
  );
}
