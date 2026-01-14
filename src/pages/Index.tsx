import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/PageTransition";
import { LibraryHero } from "@/components/home/LibraryHero";
import { FeaturedDocuments } from "@/components/home/FeaturedDocuments";
import { AuthorPreview } from "@/components/home/AuthorPreview";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <LibraryHero />
        <FeaturedDocuments />
        <AuthorPreview />
      </PageTransition>
    </Layout>
  );
};

export default Index;
