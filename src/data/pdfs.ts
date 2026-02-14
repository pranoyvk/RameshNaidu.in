export interface PdfDocument {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  category: string;
  publishedYear: number;
  pages: number;
  language: string;
}

export const pdfDocuments: PdfDocument[] = [
  {
    id: "document-1",
    title: "పత్తిపాటి శతకరత్నావళి - 1",
    description: "విద్యార్థులు నేర్చుకోవాల్సిన, అలవర్చుకోవాల్సిన నీతి, న్యాయం, ధర్మం, సత్యం గురించి",
    coverImage: "/shatakam1.jpeg",
    pdfUrl: "/pdfs/pdf1.pdf",
    category: "Ethics",
    publishedYear: 2016,
    pages: 66,
    language: "Telugu",
  },
  {
    id: "document-2",
    title: "పత్తిపాటి శతకరత్నావళి - 2",
    description: "విద్యార్థులు నేర్చుకోవాల్సిన, అలవర్చుకోవాల్సిన నీతి, న్యాయం, ధర్మం, సత్యం గురించి",
    coverImage: "/shatakam2.jpeg",
    pdfUrl: "/pdfs/pdf2.pdf",
    category: "Ethics",
    publishedYear: 2019,
    pages: 60,
    language: "Telugu",
  },
  {
    id: "document-3",
    title: "పత్తిపాటి శతకరత్నావళి - 3",
    description: "విద్యార్థులు నేర్చుకోవాల్సిన, అలవర్చుకోవాల్సిన నీతి, న్యాయం, ధర్మం, సత్యం గురించి",
    coverImage: "/shatakam3.jpeg",
    pdfUrl: "/pdfs/pdf3.pdf",
    category: "Ethics",
    publishedYear: 2020,
    pages: 68,
    language: "Telugu",
  },
  {
    id: "document-4",
    title: "తెలుగు భాషోద్యమ శతకం",
    description: "తెలుగు సంస్కృతి నేటి పరిస్థితి గురించి",
    coverImage: "/telugu.jpeg",
    pdfUrl: "/pdfs/pdf4.pdf",
    category: "Literacy",
    publishedYear: 2022,
    pages: 34,
    language: "Telugu",
  },
  {
    id: "document-5",
    title: "నందమూరి శతకం",
    description: "స్వర్గీయ నటసార్వభౌమ నందమూరి తారకరామారావు గురించి",
    coverImage: "/Nandhamuri.jpeg",
    pdfUrl: "/pdfs/pdf5.pdf",
    category: "NTR",
    publishedYear: 2023,
    pages: 32,
    language: "Telugu",
  },
  {
    id: "document-6",
    title: "సమాజపు సమాధి",
    description: "సామాజిక అంశాల మీద రాసిన కవితలు",
    coverImage: "/MoralValues.jpeg",
    pdfUrl: "/pdfs/pdf6.pdf",
    category: "Moral Values",
    publishedYear: 2024,
    pages: 99,
    language: "Telugu",
  },
  {
    id: "document-7",
    title: "ఎందుకంటే మేం మనుషులం",
    description: "సామాజిక అంశాల మీద రాసిన కవితలు",
    coverImage: "/MoralValues2.jpeg",
    pdfUrl: "/pdfs/pdf7.pdf",
    category: "Moral Values",
    publishedYear: 2025,
    pages: 101,
    language: "Telugu",
  },
  {
    id: "document-8",
    title: "క్రీడాకృత్య మాలిక",
    description: "ప్రత్యేక అవసరాలు గల పిల్లల వ్యాయామం కోసం అనువదించిన పుస్తకం",
    coverImage: "/sports.png",
    pdfUrl: "/pdfs/pdf8.pdf",
    category: "Sports & games",
    publishedYear: 2026,
    pages: 54,
    language: "Telugu",
  },
];

export const pdfCategories = [...new Set(pdfDocuments.map((doc) => doc.category))];
