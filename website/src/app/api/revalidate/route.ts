import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  const { isValidSignature, body } = await parseBody<SanityWebhookBody>(
    request,
    process.env.SANITY_REVALIDATE_SECRET,
  );

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  if (body?._type === "post") {
    revalidatePath("/");
    const slug = body.slug?.current;
    if (slug) {
      revalidatePath(`/${slug}`);
    }
  } else if (
    body?._type === "project" ||
    body?._type === "experience" ||
    body?._type === "projectTechnology" ||
    body?._type === "postCategory"
  ) {
    revalidatePath("/");
  } else {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
