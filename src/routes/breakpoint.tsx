import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getContent, updateContent } from "@/contentFunctions";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

export const Route = createFileRoute("/breakpoint")({
  component: AdminPanel,
});

function AdminPanel() {
  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const mutation = useMutation({
    mutationFn: (newContent: any) => updateContent({ data: newContent }),
    onSuccess: () => {
      refetch();
      alert("Content saved successfully!");
    },
  });

  const handleSave = () => {
    if (formData) {
      mutation.mutate(formData);
    }
  };

  if (isLoading || !formData) {
    return <div className="min-h-screen flex items-center justify-center">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8f8f8] p-8 font-sans">
      <CustomCursor />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gold-gradient">Lumio Admin Panel</h1>
          <button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="flex items-center gap-2 bg-emerald text-white px-6 py-3 rounded-full hover:bg-emerald-deep transition-colors"
          >
            <Save size={18} />
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="space-y-12">
          {/* Hero Section Edit */}
          <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-white/5 shadow-soft">
            <h2 className="text-2xl font-bold mb-6 text-gold">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Headline Lines (JSON array)</label>
                <textarea
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white font-mono text-sm h-32"
                  value={JSON.stringify(formData.hero.headline, null, 2)}
                  onChange={(e) => {
                    try {
                      const newHeadline = JSON.parse(e.target.value);
                      setFormData({ ...formData, hero: { ...formData.hero, headline: newHeadline } });
                    } catch (err) {}
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Subtext</label>
                <textarea
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white"
                  value={formData.hero.subtext}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subtext: e.target.value } })}
                />
              </div>
            </div>
          </section>

          {/* About Section Edit */}
          <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-white/5 shadow-soft">
            <h2 className="text-2xl font-bold mb-6 text-gold">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Heading</label>
                <input
                  type="text"
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white"
                  value={formData.about.heading}
                  onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heading: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Heading Highlight</label>
                <input
                  type="text"
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white"
                  value={formData.about.headingHighlight}
                  onChange={(e) => setFormData({ ...formData, about: { ...formData.about, headingHighlight: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Paragraph 1</label>
                <textarea
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white h-24"
                  value={formData.about.paragraph1}
                  onChange={(e) => setFormData({ ...formData, about: { ...formData.about, paragraph1: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Stats (JSON array)</label>
                <textarea
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white font-mono text-sm h-48"
                  value={JSON.stringify(formData.about.stats, null, 2)}
                  onChange={(e) => {
                    try {
                      const newStats = JSON.parse(e.target.value);
                      setFormData({ ...formData, about: { ...formData.about, stats: newStats } });
                    } catch (err) {}
                  }}
                />
              </div>
            </div>
          </section>

          {/* Services Section Edit */}
          <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-white/5 shadow-soft">
            <h2 className="text-2xl font-bold mb-6 text-gold">Services Section</h2>
            <div className="space-y-4">
               <div>
                <label className="block text-sm text-muted-foreground mb-2">Heading</label>
                <input
                  type="text"
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white"
                  value={formData.services.heading}
                  onChange={(e) => setFormData({ ...formData, services: { ...formData.services, heading: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Heading Highlight</label>
                <input
                  type="text"
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white"
                  value={formData.services.headingHighlight}
                  onChange={(e) => setFormData({ ...formData, services: { ...formData.services, headingHighlight: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Services Items (JSON array)</label>
                <textarea
                  className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white font-mono text-sm h-64"
                  value={JSON.stringify(formData.services.items, null, 2)}
                  onChange={(e) => {
                    try {
                      const newItems = JSON.parse(e.target.value);
                      setFormData({ ...formData, services: { ...formData.services, items: newItems } });
                    } catch (err) {}
                  }}
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
