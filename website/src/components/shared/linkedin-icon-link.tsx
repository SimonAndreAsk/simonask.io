import { LinkedinIcon, iconLinkClass } from "@/components/shared/site-icon";
import { linkedinProfileUrl } from "@/lib/contact";

export function LinkedinIconLink() {
  return (
    <a
      href={linkedinProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={iconLinkClass}
      aria-label="Simon Ask on LinkedIn"
    >
      <LinkedinIcon />
    </a>
  );
}
