import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContent, updateContent } from "@/contentFunctions";
import {
  LayoutDashboard,
  Plus,
  Save,
  Search,
  Trash2,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Type,
  Info,
  Star
} from "lucide-react";
import { toast } from "sonner";
import ImageCropper from "@/components/admin/ImageCropper";

export const Route = createFileRoute("/lumio-studio-manage")({
  component: AdminDashboard,
});

type AdminTab = "overview" | "hero" | "about" | "services" | "fields" | "works" | "showcase";

function MetricCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-lg p-5 flex items-center gap-4 transition-all hover:border-gold/30">
      <div className="rounded-xl bg-gold/10 p-3 text-gold">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-semibold">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [formData, setFormData] = useState<any>(null);

  const { data: content, isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  useEffect(() => {
    if (content && !formData) {
      setFormData(JSON.parse(JSON.stringify(content))); // Deep copy
    }
  }, [content, formData]);

  useEffect(() => {
    document.body.classList.add("show-cursor");
    return () => {
      document.body.classList.remove("show-cursor");
    };
  }, []);

  const [q, setQ] = useState("");
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);

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

  const saveGlobal = () => {
    mutation.mutate(formData);
  };

  if (isLoading || !formData) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-gold">Loading Control Center...</div>;
  }

  // --- Handlers ---
  const updateSectionField = (section: string, key: string, value: any) => {
    const newData = { ...formData };
    newData[section][key] = value;
    setFormData(newData);
  };

  const updateItem = (section: string, index: number, key: string, value: string) => {
    const newData = { ...formData };
    newData[section].items[index][key] = value;
    setFormData(newData);
  };

  const addItem = (section: string, defaultItem: any) => {
    const newData = { ...formData };
    if (!newData[section].items) newData[section].items = [];
    newData[section].items.unshift(defaultItem);
    setFormData(newData);
    if (section === "services") setSelectedService(0);
    if (section === "work") setSelectedField(0);
    if (section === "projects") setSelectedWork(0);
  };

  const removeItem = (section: string, index: number) => {
    const newData = { ...formData };
    newData[section].items.splice(index, 1);
    setFormData(newData);
    if (section === "services" && selectedService === index) setSelectedService(null);
    if (section === "work" && selectedField === index) setSelectedField(null);
    if (section === "projects" && selectedWork === index) setSelectedWork(null);
  };

  // --- Derived State ---
  const servicesList = formData.services?.items || [];
  const fieldsList = formData.work?.items || [];
  const worksList = formData.projects?.items || [];

  const filteredServices = servicesList.filter((s: any) => !q || s.title.toLowerCase().includes(q.toLowerCase()) || s.desc.toLowerCase().includes(q.toLowerCase()));
  const filteredFields = fieldsList.filter((f: any) => !q || f.title.toLowerCase().includes(q.toLowerCase()) || f.category.toLowerCase().includes(q.toLowerCase()));
  const filteredWorks = worksList.filter((w: any) => !q || w.title.toLowerCase().includes(q.toLowerCase()) || w.category.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen px-4 pb-12 pt-28 bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Admin Only</div>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
              Control <span className="text-gold-gradient">Center</span>
            </h1>
          </div>
          <button
            onClick={saveGlobal}
            disabled={mutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-[#050505] transition-all hover:bg-gold-light disabled:opacity-50"
          >
            <Save size={16} /> {mutation.isPending ? "Saving..." : "Save All Changes"}
          </button>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-3">
          <MetricCard icon={Briefcase} label="Services" value={servicesList.length.toString()} />
          <MetricCard icon={Layers} label="Fields" value={fieldsList.length.toString()} />
          <MetricCard icon={ImageIcon} label="Projects" value={worksList.length.toString()} />
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-black/30 p-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "hero", label: "Hero", icon: Type },
            { id: "about", label: "About", icon: Info },
            { id: "services", label: "Services", icon: Briefcase },
            { id: "fields", label: "Fields", icon: Layers },
            { id: "works", label: "Portfolio", icon: ImageIcon },
            { id: "showcase", label: "Showcase", icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as AdminTab); setQ(""); }}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id ? "bg-gradient-to-r from-gold to-gold-light text-black shadow-gold" : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold mb-5">Quick Actions</h2>
              <div className="grid gap-3">
                <button onClick={() => setActiveTab("works")} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-gold group">
                  <div className="text-lg font-semibold group-hover:text-gold transition-colors">Manage Portfolio Projects</div>
                  <div className="mt-1 text-xs text-muted-foreground">Upload images and edit case studies.</div>
                </button>
                <button onClick={() => setActiveTab("showcase")} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-gold group">
                  <div className="text-lg font-semibold group-hover:text-gold transition-colors">Edit Highlight Showcase</div>
                  <div className="mt-1 text-xs text-muted-foreground">Change the featured project banner.</div>
                </button>
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold">Admin Activity</h2>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 border-l-4 border-l-emerald">This dashboard directly edits your local `content.json` file.</div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 border-l-4 border-l-gold">After saving changes here, push your code to GitHub to deploy updates.</div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 border-l-4 border-l-blue-400">You can now upload and crop images directly for your projects!</div>
              </div>
            </div>
          </div>
        )}

        {/* HERO */}
        {activeTab === "hero" && (
          <div className="glass rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6 text-gold-gradient">Edit Hero Section</h2>
            <div className="space-y-5">
              <AdminField label="Headline (Lines)">
                {formData.hero.headline.map((line: string, i: number) => (
                  <input
                    key={i}
                    value={line}
                    onChange={(e) => {
                      const newHeadline = [...formData.hero.headline];
                      newHeadline[i] = e.target.value;
                      updateSectionField("hero", "headline", newHeadline);
                    }}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold mb-2"
                  />
                ))}
              </AdminField>
              <AdminField label="Subtext">
                <textarea
                  value={formData.hero.subtext}
                  onChange={(e) => updateSectionField("hero", "subtext", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                />
              </AdminField>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div className="glass rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6 text-gold-gradient">Edit About Section</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Heading Prefix">
                  <input
                    value={formData.about.heading}
                    onChange={(e) => updateSectionField("about", "heading", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
                <AdminField label="Heading Highlight">
                  <input
                    value={formData.about.headingHighlight}
                    onChange={(e) => updateSectionField("about", "headingHighlight", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
              </div>
              <AdminField label="Paragraph 1">
                <textarea
                  value={formData.about.paragraph1}
                  onChange={(e) => updateSectionField("about", "paragraph1", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                />
              </AdminField>
              <AdminField label="Paragraph 2">
                <textarea
                  value={formData.about.paragraph2}
                  onChange={(e) => updateSectionField("about", "paragraph2", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                />
              </AdminField>
              
              <div className="pt-4 border-t border-white/10">
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gold mb-3">Stats Grid</label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.about.stats.map((stat: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...formData.about.stats];
                          newStats[i].value = e.target.value;
                          updateSectionField("about", "stats", newStats);
                        }}
                        className="w-24 rounded-lg border border-white/10 bg-black/40 p-2 text-sm text-white font-bold"
                        placeholder="Value"
                      />
                      <input
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...formData.about.stats];
                          newStats[i].label = e.target.value;
                          updateSectionField("about", "stats", newStats);
                        }}
                        className="flex-1 rounded-lg border border-white/10 bg-black/40 p-2 text-sm text-white"
                        placeholder="Label"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHOWCASE (PreviousProject) */}
        {activeTab === "showcase" && (
          <div className="glass rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6 text-gold-gradient">Edit Featured Showcase</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Section Heading Prefix">
                  <input
                    value={formData.previousProject?.heading || ""}
                    onChange={(e) => updateSectionField("previousProject", "heading", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
                <AdminField label="Heading Highlight">
                  <input
                    value={formData.previousProject?.headingHighlight || ""}
                    onChange={(e) => updateSectionField("previousProject", "headingHighlight", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Project Title">
                  <input
                    value={formData.previousProject?.title || ""}
                    onChange={(e) => updateSectionField("previousProject", "title", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
                <AdminField label="Subtitle / Category">
                  <input
                    value={formData.previousProject?.subtitle || ""}
                    onChange={(e) => updateSectionField("previousProject", "subtitle", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
              </div>

              <AdminField label="Project Image">
                <ImageCropper 
                  aspectRatio={16 / 9} 
                  currentImageUrl={formData.previousProject?.img}
                  onUploadComplete={(url) => updateSectionField("previousProject", "img", url)} 
                />
              </AdminField>

              <AdminField label="Description">
                <textarea
                  value={formData.previousProject?.desc || ""}
                  onChange={(e) => updateSectionField("previousProject", "desc", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                />
              </AdminField>
              
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Live Link">
                  <input
                    value={formData.previousProject?.link || ""}
                    onChange={(e) => updateSectionField("previousProject", "link", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
                <AdminField label="Year">
                  <input
                    value={formData.previousProject?.year || ""}
                    onChange={(e) => updateSectionField("previousProject", "year", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                  />
                </AdminField>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Services</h2>
                <button
                  onClick={() => addItem("services", { title: "New Service", desc: "Description..." })}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold"
                >
                  <Plus size={15} /> New
                </button>
              </div>
              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredServices.map((service: any, i: number) => {
                  const originalIndex = servicesList.indexOf(service);
                  return (
                    <div
                      key={originalIndex}
                      className={`rounded-lg border p-3 transition-all ${selectedService === originalIndex ? "border-gold bg-gold/10" : "border-white/10 bg-white/[0.03] hover:border-gold/30"}`}
                    >
                      <button onClick={() => setSelectedService(originalIndex)} className="w-full text-left">
                        <div className="font-semibold text-white">{service.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground truncate">{service.desc}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold text-gold-gradient">
                {selectedService !== null ? "Edit Service" : "Select a Service"}
              </h2>
              {selectedService !== null ? (
                <div className="mt-6 space-y-5">
                  <AdminField label="Service Title">
                    <input
                      value={servicesList[selectedService]?.title || ""}
                      onChange={(e) => updateItem("services", selectedService, "title", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                    />
                  </AdminField>
                  <AdminField label="Description">
                    <textarea
                      value={servicesList[selectedService]?.desc || ""}
                      onChange={(e) => updateItem("services", selectedService, "desc", e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                    />
                  </AdminField>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => { removeItem("services", selectedService); setSelectedService(null); }}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} /> Delete Service
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-center text-muted-foreground">Select a service from the left to edit its details.</div>
              )}
            </div>
          </div>
        )}

        {/* FIELDS TAB */}
        {activeTab === "fields" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Fields We Work In</h2>
                <button
                  onClick={() => addItem("work", { title: "New Field", category: "Category", cat: "web", img: "/work-1.jpg", desc: "Desc", year: "2026" })}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold"
                >
                  <Plus size={15} /> New
                </button>
              </div>
              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredFields.map((field: any, i: number) => {
                  const originalIndex = fieldsList.indexOf(field);
                  return (
                    <div
                      key={originalIndex}
                      className={`rounded-lg border p-3 transition-all flex items-center gap-3 ${selectedField === originalIndex ? "border-gold bg-gold/10" : "border-white/10 bg-white/[0.03] hover:border-gold/30"}`}
                    >
                      <img src={field.img} className="w-12 h-12 rounded object-cover border border-white/10" alt="" />
                      <button onClick={() => setSelectedField(originalIndex)} className="flex-1 text-left">
                        <div className="font-semibold text-white">{field.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{field.category}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold text-gold-gradient">
                {selectedField !== null ? "Edit Field" : "Select a Field"}
              </h2>
              {selectedField !== null ? (
                <div className="mt-6 space-y-5">
                  <AdminField label="Title">
                    <input
                      value={fieldsList[selectedField]?.title || ""}
                      onChange={(e) => updateItem("work", selectedField, "title", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                    />
                  </AdminField>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminField label="Display Category">
                      <input
                        value={fieldsList[selectedField]?.category || ""}
                        onChange={(e) => updateItem("work", selectedField, "category", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                      />
                    </AdminField>
                    <AdminField label="Filter Tag">
                      <select
                        value={fieldsList[selectedField]?.cat || "web"}
                        onChange={(e) => updateItem("work", selectedField, "cat", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-[#0c0c0c] p-3 text-sm text-white focus:border-gold"
                      >
                        <option value="web">Web</option>
                        <option value="app">App</option>
                        <option value="brand">Brand</option>
                      </select>
                    </AdminField>
                  </div>
                  <AdminField label="Image">
                    <ImageCropper 
                      aspectRatio={4/5} 
                      currentImageUrl={fieldsList[selectedField]?.img}
                      onUploadComplete={(url) => updateItem("work", selectedField, "img", url)} 
                    />
                  </AdminField>
                  <AdminField label="Description">
                    <textarea
                      value={fieldsList[selectedField]?.desc || ""}
                      onChange={(e) => updateItem("work", selectedField, "desc", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                    />
                  </AdminField>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => { removeItem("work", selectedField); setSelectedField(null); }}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} /> Delete Field
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-center text-muted-foreground">Select a field from the left to edit its details.</div>
              )}
            </div>
          </div>
        )}

        {/* WORKS TAB */}
        {activeTab === "works" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Our Works</h2>
                <button
                  onClick={() => addItem("projects", { title: "New Project", category: "Category", img: "/work-1.jpg", link: "https://" })}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold"
                >
                  <Plus size={15} /> New
                </button>
              </div>
              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredWorks.map((work: any, i: number) => {
                  const originalIndex = worksList.indexOf(work);
                  return (
                    <div
                      key={originalIndex}
                      className={`rounded-lg border p-3 transition-all flex items-center gap-3 ${selectedWork === originalIndex ? "border-gold bg-gold/10" : "border-white/10 bg-white/[0.03] hover:border-gold/30"}`}
                    >
                      <img src={work.img} className="w-12 h-12 rounded object-cover border border-white/10" alt="" />
                      <button onClick={() => setSelectedWork(originalIndex)} className="flex-1 text-left">
                        <div className="font-semibold text-white">{work.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{work.category}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold text-gold-gradient">
                {selectedWork !== null ? "Edit Project" : "Select a Project"}
              </h2>
              {selectedWork !== null ? (
                <div className="mt-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <AdminField label="Project Title">
                      <input
                        value={worksList[selectedWork]?.title || ""}
                        onChange={(e) => updateItem("projects", selectedWork, "title", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                      />
                    </AdminField>
                    <AdminField label="Category">
                      <input
                        value={worksList[selectedWork]?.category || ""}
                        onChange={(e) => updateItem("projects", selectedWork, "category", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                      />
                    </AdminField>
                  </div>
                  <AdminField label="Project Image">
                    <ImageCropper 
                      aspectRatio={16/9} 
                      currentImageUrl={worksList[selectedWork]?.img}
                      onUploadComplete={(url) => updateItem("projects", selectedWork, "img", url)} 
                    />
                  </AdminField>
                  <AdminField label="External Link (Optional)">
                    <input
                      value={worksList[selectedWork]?.link || ""}
                      onChange={(e) => updateItem("projects", selectedWork, "link", e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                    />
                  </AdminField>
                  <AdminField label="Description">
                    <textarea
                      value={worksList[selectedWork]?.desc || ""}
                      onChange={(e) => updateItem("projects", selectedWork, "desc", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold"
                    />
                  </AdminField>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => { removeItem("projects", selectedWork); setSelectedWork(null); }}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} /> Delete Project
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-center text-muted-foreground">Select a project from the left to edit its details.</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
