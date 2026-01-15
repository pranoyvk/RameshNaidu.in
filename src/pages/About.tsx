import { motion } from "framer-motion";
import { BookOpen, Heart, PenTool, Users, Globe } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const milestones = [
  { year: "2015s", title: "Early Writings", description: "Began writing poetry." },
  { year: "2016s", title: "First Publications", description: "Published articles in local magazines." },
  { year: "2019s", title: "Book Writing", description: "Focused on full-length books." },
  { year: "2020s", title: "Digital Journey", description: "Embraced digital publishing." },
  { year: "2025s", title: "Legacy Project", description: "Creating this digital library." },
];

const values = [
  { icon: Heart, title: "Inculcate Ethics", description: "Every word is crafted with care." },
  { icon: PenTool, title: "Authentic Voice", description: "Honest reflections from real experiences." },
  { icon: Users, title: "For Everyone", description: "Books for readers of all backgrounds." },
  { icon: Globe, title: "Freely Shared", description: "Knowledge meant to be shared freely." },
];

const About = () => (
  <Layout>
    <PageTransition>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src="/rameshnaidu.png" alt="The Author" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">About the Author</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-6">Writer's Journey</h1>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li style={{fontSize:"20px"}}>మొదట్లో నా సాహితీ ప్రయాణము చిన్న చిన్న కవితలు రాయడంతో ప్రారంభమైంది ఆపై సందర్భోచితంగా రాసేవాణ్ణి.</li>
                <li style={{fontSize:"20px"}}>2015 తరువాత పుస్తకాల రూపంలో ముద్రించి ఉచితముగా అందజేశాను. 2019 నుండి ఆట వెలది పద్యాలు రాయడం ప్రారంభించాను. ఇప్పటికి మూడు వచన కవిత సంపుటాలు ఐదు శతకాలు,  మొత్తం 14000 పుస్తకాలు ఇప్పటికీ ముద్రించి ఉచితముగా పంపిణీ చేశాను.</li>
                <li style={{fontSize:"20px"}}>2012 లో క్రీడాకృత్య మాలిక అనువాద రచన ఆంధ్రప్రదేశ్‌లో ప్రభుత్వ పాఠశాలలో విభిన్న ప్రతిభావంతుల కొరకు రచన చేశాను.</li>
                <li style={{fontSize:"20px"}}>ఇప్పటివరకు 1700 ఆటవెలది పద్యాలు 200 సీస పద్యాలు 450 పొడుపు కథలు ప్రశ్నలు మరియు జవాబులు కూడా ఆట వెలది పద్యాలలో (అముద్రితం) రాయడం జరిగింది.</li>
                <li style={{fontSize:"20px"}}>2015లో మేక రవీంద్ర హైదరాబాద్ వారిచే <strong>సహస్ర కవి మిత్ర</strong>, అమర రాజా బ్యాటరీస్ మరియు రాజన్న ట్రస్ట్ వారిచే 2020 <strong>అభినవవేమన</strong> బిరుదం  ప్రధానం చేశారు</li>
                <li style={{fontSize:"20px"}}>2022 లో వే ఫౌండేషన్ వారిచే <strong>సాహితీ ప్రవీణ</strong>, శ్రీ గౌతమేశ్వర కళ సేవా సంస్థ తెలంగాణ వారిచే <strong>కవనతేజం</strong>. మార్పు స్వచ్ఛంద సేవా సంస్థ తిరుపతి వారిచే <strong>శతకరత్న</strong> బిరుదము 2024 లో పొందాను.</li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal><h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">Writing Philosophy</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-xl border text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><v.icon className="w-6 h-6" /></div>
                  <h3 className="font-serif font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal><h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">Writing Journey</h2></ScrollReveal>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{m.year.slice(0, 4)}</div>
                    {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-8"><h3 className="font-serif font-semibold text-xl mb-2">{m.title}</h3><p className="text-muted-foreground">{m.description}</p></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <blockquote className="text-2xl md:text-3xl font-serif italic mb-6">"Writing is about leaving a piece of your soul for others to discover."</blockquote>
              <p className="opacity-80">— The Author</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  </Layout>
);

export default About;
