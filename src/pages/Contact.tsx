import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    toast({ title: "Message sent!", description: "Thank you for reaching out." });
  };

  return (
    <Layout>
      <PageTransition>
        <section className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <ScrollReveal direction="left">
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Get in Touch</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-6">Contact Us</h1>
                <p className="text-lg text-muted-foreground mb-8">Have questions about the books? We'd love to hear from you.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Mail className="w-5 h-5" /></div>
                    <div><h3 className="font-semibold mb-1">Email</h3><a href="mailto:ppramesh009@gmail.com" className="text-muted-foreground hover:text-primary">ppramesh009@gmail.com</a></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><BookOpen className="w-5 h-5" /></div>
                    <div><h3 className="font-semibold mb-1">About the Books</h3><p className="text-muted-foreground">All e-books are free to download and share.</p></div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-sm">
                  {isSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-serif font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">We'll get back to you soon.</p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" placeholder="Your name" required /></div>
                        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="your@email.com" required /></div>
                      </div>
                      <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" placeholder="What's this about?" required /></div>
                      <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" placeholder="Your message..." rows={5} required /></div>
                      <Button type="submit" size="lg" className="w-full group" disabled={isLoading}>
                        {isLoading ? "Sending..." : <><span>Send Message</span><Send className="w-4 h-4 ml-2" /></>}
                      </Button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Contact;
