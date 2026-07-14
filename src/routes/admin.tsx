import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContent, updateContent } from "@/contentFunctions";
import { Plus, Trash, Save, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>(null);

  const { data: content, isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  useEffect(() => {
    if (content && !formData) {
      setFormData(content);
    }
  }, [content]);

  const mutation = useMutation({
    mutationFn: (newContent: any) => updateContent({ data: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Content saved successfully! Push to Git to update live site.");
    },
    onError: () => {
      toast.error("Failed to save content.");
    },
  });

  const handleSave = () => {
    mutation.mutate(formData);
  };

  if (isLoading || !formData) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-gold">Loading Dashboard...</div>;
  }

  // Helper to update deeply nested lists
  const updateItem = (section: string, index: number, key: string, value: string) => {
    const newData = { ...formData };
    newData[section].items[index][key] = value;
    setFormData(newData);
  };

  const addItem = (section: string, defaultItem: any) => {
    const newData = { ...formData };
    if (!newData[section].items) newData[section].items = [];
    newData[section].items.push(defaultItem);
    setFormData(newData);
  };

  const removeItem = (section: string, index: number) => {
    const newData = { ...formData };
    newData[section].items.splice(index, 1);
    setFormData(newData);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-12 pb-32">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="bg-gold/20 p-3 rounded-xl border border-gold/30 text-gold">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Content Manager</h1>
              <p className="text-muted-foreground mt-1">Add, remove, or edit your dynamic sections.</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="flex items-center gap-2 bg-gold text-[#050505] px-6 py-3 rounded-full font-bold hover:bg-gold-light transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </header>

        <div className="space-y-16">
          {/* SERVICES SECTION */}
          <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gold-gradient">Services (A full-stack studio)</h2>
              <button onClick={() => addItem("services", { title: "New Service", desc: "Description..." })} className="flex items-center gap-2 text-sm text-gold hover:text-gold-light">
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>
            <div className="grid gap-4">
              {formData.services?.items?.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-[#141414] p-4 rounded-xl border border-white/5">
                  <div className="flex-1 space-y-3">
                    <input value={item.title} onChange={(e) => updateItem("services", i, "title", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white font-semibold focus:outline-none focus:border-gold" placeholder="Title" />
                    <textarea value={item.desc} onChange={(e) => updateItem("services", i, "desc", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-sm text-muted-foreground focus:outline-none focus:border-gold resize-none" placeholder="Description" rows={2} />
                  </div>
                  <button onClick={() => removeItem("services", i)} className="text-red-500/70 hover:text-red-500 p-2"><Trash className="h-5 w-5" /></button>
                </div>
              ))}
            </div>
          </section>

          {/* FIELDS WE WORK IN SECTION */}
          <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gold-gradient">Fields We Work In</h2>
              <button onClick={() => addItem("work", { title: "New Field", category: "Category", cat: "web", img: "/src/assets/work-1.jpg", desc: "Desc", year: "2026" })} className="flex items-center gap-2 text-sm text-gold hover:text-gold-light">
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>
            <div className="grid gap-4">
              {formData.work?.items?.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-[#141414] p-4 rounded-xl border border-white/5">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input value={item.title} onChange={(e) => updateItem("work", i, "title", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white font-semibold focus:outline-none focus:border-gold" placeholder="Title" />
                    <input value={item.category} onChange={(e) => updateItem("work", i, "category", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-sm text-white focus:outline-none focus:border-gold" placeholder="Category (e.g. Web App)" />
                    <input value={item.img} onChange={(e) => updateItem("work", i, "img", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-sm text-white focus:outline-none focus:border-gold col-span-2" placeholder="Image Path (e.g. /src/assets/work-1.jpg)" />
                  </div>
                  <button onClick={() => removeItem("work", i)} className="text-red-500/70 hover:text-red-500 p-2"><Trash className="h-5 w-5" /></button>
                </div>
              ))}
            </div>
          </section>

          {/* OUR WORKS SECTION */}
          <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gold-gradient">Our Works (Portfolio)</h2>
              <button onClick={() => addItem("projects", { title: "New Project", category: "Category", img: "/src/assets/work-1.jpg", link: "https://" })} className="flex items-center gap-2 text-sm text-gold hover:text-gold-light">
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>
            <div className="grid gap-4">
              {formData.projects?.items?.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-[#141414] p-4 rounded-xl border border-white/5">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input value={item.title} onChange={(e) => updateItem("projects", i, "title", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white font-semibold focus:outline-none focus:border-gold" placeholder="Project Title" />
                    <input value={item.category} onChange={(e) => updateItem("projects", i, "category", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-sm text-white focus:outline-none focus:border-gold" placeholder="Category (e.g. Web Platform)" />
                    <input value={item.img} onChange={(e) => updateItem("projects", i, "img", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-sm text-white focus:outline-none focus:border-gold" placeholder="Image Path (e.g. /src/assets/work-1.jpg)" />
                    <input value={item.link} onChange={(e) => updateItem("projects", i, "link", e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-sm text-blue-400 focus:outline-none focus:border-gold" placeholder="Link (https://...)" />
                  </div>
                  <button onClick={() => removeItem("projects", i)} className="text-red-500/70 hover:text-red-500 p-2"><Trash className="h-5 w-5" /></button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
