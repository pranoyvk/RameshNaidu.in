import { useRef } from "react";
import { pdfDocuments } from "@/data/pdfs";

export function LibraryHero() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const books = pdfDocuments.slice(0, 3);

  const populateHero = () => {
    const document = frameRef.current?.contentDocument;
    if (!document) return;

    document.documentElement.lang = "te";
    document.title = "పత్తిపాటి రమేష్ నాయుడు రచనలు";
    document.querySelector(".brand")!.textContent = "పత్తిపాటి రచనలు";
    document.querySelector(".hero-word")!.textContent = "రచనలు";
    document.querySelector(".gallery")?.setAttribute("aria-label", "పత్తిపాటి శతకరత్నావళి");

    const bookKeys = ["codex", "claude", "cursor"];
    books.forEach((book, index) => {
      const card = document.querySelector<HTMLElement>(`[data-book="${bookKeys[index]}"]`);
      if (!card) return;

      card.setAttribute("aria-label", `${book.title} వివరాలు`);
      card.querySelector(".cover-copy")?.remove();

      // The HTML showcase paints every front cover from this CSS variable.
      // Override its embedded demo artwork with the record's cover image.
      card.style.setProperty("--cover", `url("${book.coverImage}")`);
      card.querySelectorAll<HTMLVideoElement>(".cover-motion").forEach((video) => {
        video.pause();
        video.remove();
      });

      const cover = card.querySelector<HTMLElement>(".front-cover");
      if (cover) {
        cover.style.backgroundSize = "cover";
        cover.style.backgroundPosition = "center";
      }

      card.addEventListener("click", () => {
        window.setTimeout(() => {
          document.querySelector("#detailTitle")!.textContent = book.title;
          document.querySelector("#detailDescription")!.textContent = book.description;
          document.querySelector("#gettingStartedLabel")!.textContent = `${book.pages} pages · ${book.language}`;
          document.querySelector("#detailSteps")!.innerHTML = [
            `<li><strong>Category</strong><span>${book.category}</span></li>`,
            `<li><strong>Published</strong><span>${book.publishedYear}</span></li>`,
            `<li><strong>Language</strong><span>${book.language}</span></li>`,
          ].join("");
          document.querySelector("#firstPromptLabel")!.textContent = "Read online";
          const prompt = document.querySelector("#detailPrompt")!;
          prompt.innerHTML = "";
          const link = document.createElement("a");
          link.href = book.pdfUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "Open PDF";
          prompt.append(link);
          document.querySelector("#reviewLabel")!.textContent = "About this book";
          document.querySelector("#detailReview")!.textContent = book.description;
        }, 0);
      });
    });
  };

  return (
    <iframe
      ref={frameRef}
      title="పత్తిపాటి రమేష్ నాయుడు రచనలు"
      src="/landing-pages/bestsellers-book-showcase.html"
      onLoad={populateHero}
      className="block w-full h-[min(93vh,960px)] min-h-[620px] border-0 bg-[#29251d]"
    />
  );
}
