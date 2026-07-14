import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContent, updateContent } from "@/contentFunctions";
import {
  LayoutDashboard,
  Plus,
  RotateCcw,
  Save,
  Search,
  Trash2,
  X,
  Briefcase,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/lumio-studio-manage")({
  component: AdminDashboard,
});

type AdminTab = "overview" | "services" | "fields" | "works";

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
      setFormData(content);
    }
  }, [content, formData]);

  // Restore native cursor while in the admin dashboard
  useEffect(() => {
    document.body.classList.add("show-cursor");
    return () => {
      document.body.classList.remove("show-cursor");
    };
  }, []);

  // -- State for Search/Filter --
  const [q, setQ] = useState("");
  
  // -- Selection State for Forms --
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

  // Helper to update deeply nested lists
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
    // Auto-select the newly added item (index 0)
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

  // Safe arrays
  const servicesList = formData.services?.items || [];
  const fieldsList = formData.work?.items || [];
  const worksList = formData.projects?.items || [];

  // Filtered Arrays
  const filteredServices = servicesList.filter((s: any) => 
    !q || s.title.toLowerCase().includes(q.toLowerCase()) || s.desc.toLowerCase().includes(q.toLowerCase())
  );
  const filteredFields = fieldsList.filter((f: any) => 
    !q || f.title.toLowerCase().includes(q.toLowerCase()) || f.category.toLowerCase().includes(q.toLowerCase())
  );
  const filteredWorks = worksList.filter((w: any) => 
    !q || w.title.toLowerCase().includes(q.toLowerCase()) || w.category.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 pb-12 pt-28 bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              Admin Only
            </div>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
              Control <span className="text-gold-gradient">Center</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your dynamic portfolio and services.
            </p>
          </div>
          <button
            onClick={saveGlobal}
            disabled={mutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-[#050505] transition-all hover:bg-gold-light disabled:opacity-50"
          >
            <Save size={16} />
            {mutation.isPending ? "Saving..." : "Save All Changes"}
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
            { id: "services", label: "Services", icon: Briefcase },
            { id: "fields", label: "Fields We Work In", icon: Layers },
            { id: "works", label: "Our Works", icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as AdminTab);
                setQ("");
              }}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-gold to-gold-light text-black shadow-gold"
                  : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold mb-5">Quick Actions</h2>
              <div className="grid gap-3">
                <button onClick={() => setActiveTab("works")} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-gold group">
                  <div className="text-lg font-semibold group-hover:text-gold transition-colors">Add New Portfolio Project</div>
                  <div className="mt-1 text-xs text-muted-foreground">Publish a new case study to TSRM.in or your works.</div>
                </button>
                <button onClick={() => setActiveTab("services")} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-gold group">
                  <div className="text-lg font-semibold group-hover:text-gold transition-colors">Edit Services List</div>
                  <div className="mt-1 text-xs text-muted-foreground">Update the full-stack studio capabilities.</div>
                </button>
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold">Admin Activity</h2>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 border-l-4 border-l-emerald">
                  This dashboard directly edits your local `content.json` file.
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 border-l-4 border-l-gold">
                  After saving changes here, commit and push your code to GitHub. Vercel will automatically deploy the updates.
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  For new images, place them in the `/public` folder of your project, and reference them like `/my-image.jpg`.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left Column - List */}
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Services</h2>
                <button
                  onClick={() => addItem("services", { title: "New Service", desc: "Description..." })}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold transition-colors"
                >
                  <Plus size={15} />
                  New
                </button>
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-lg bg-black/40 border border-white/10 px-3 py-2">
                <Search size={14} className="text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search services..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-white"
                />
              </div>

              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredServices.map((service: any, i: number) => {
                  const originalIndex = servicesList.indexOf(service);
                  return (
                    <div
                      key={originalIndex}
                      className={`rounded-lg border p-3 transition-all ${
                        selectedService === originalIndex
                          ? "border-gold bg-gold/10"
                          : "border-white/10 bg-white/[0.03] hover:border-gold/30"
                      }`}
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

            {/* Right Column - Editor */}
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
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                    />
                  </AdminField>
                  <AdminField label="Description">
                    <textarea
                      value={servicesList[selectedService]?.desc || ""}
                      onChange={(e) => updateItem("services", selectedService, "desc", e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </AdminField>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => {
                        removeItem("services", selectedService);
                        setSelectedService(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Service
                    </button>
                    <button onClick={() => setSelectedService(null)} className="text-sm font-semibold text-muted-foreground hover:text-white">
                      Deselect
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
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold transition-colors"
                >
                  <Plus size={15} />
                  New
                </button>
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-lg bg-black/40 border border-white/10 px-3 py-2">
                <Search size={14} className="text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search fields..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-white"
                />
              </div>

              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredFields.map((field: any, i: number) => {
                  const originalIndex = fieldsList.indexOf(field);
                  return (
                    <div
                      key={originalIndex}
                      className={`rounded-lg border p-3 transition-all flex items-center gap-3 ${
                        selectedField === originalIndex
                          ? "border-gold bg-gold/10"
                          : "border-white/10 bg-white/[0.03] hover:border-gold/30"
                      }`}
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
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                    />
                  </AdminField>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminField label="Display Category">
                      <input
                        value={fieldsList[selectedField]?.category || ""}
                        onChange={(e) => updateItem("work", selectedField, "category", e.target.value)}
                        placeholder="e.g. E-commerce"
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                      />
                    </AdminField>
                    <AdminField label="Filter Tag">
                      <select
                        value={fieldsList[selectedField]?.cat || "web"}
                        onChange={(e) => updateItem("work", selectedField, "cat", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-[#0c0c0c] p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                      >
                        <option value="web">Web</option>
                        <option value="app">App</option>
                        <option value="brand">Brand</option>
                      </select>
                    </AdminField>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminField label="Image Path">
                      <input
                        value={fieldsList[selectedField]?.img || ""}
                        onChange={(e) => updateItem("work", selectedField, "img", e.target.value)}
                        placeholder="/work-1.jpg"
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                      />
                    </AdminField>
                    <AdminField label="Year">
                      <input
                        value={fieldsList[selectedField]?.year || ""}
                        onChange={(e) => updateItem("work", selectedField, "year", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                      />
                    </AdminField>
                  </div>
                  <AdminField label="Description">
                    <textarea
                      value={fieldsList[selectedField]?.desc || ""}
                      onChange={(e) => updateItem("work", selectedField, "desc", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </AdminField>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => {
                        removeItem("work", selectedField);
                        setSelectedField(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Field
                    </button>
                    <button onClick={() => setSelectedField(null)} className="text-sm font-semibold text-muted-foreground hover:text-white">
                      Deselect
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
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold hover:bg-gold/10 hover:text-gold transition-colors"
                >
                  <Plus size={15} />
                  New
                </button>
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-lg bg-black/40 border border-white/10 px-3 py-2">
                <Search size={14} className="text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search works..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-white"
                />
              </div>

              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredWorks.map((work: any, i: number) => {
                  const originalIndex = worksList.indexOf(work);
                  return (
                    <div
                      key={originalIndex}
                      className={`rounded-lg border p-3 transition-all flex items-center gap-3 ${
                        selectedWork === originalIndex
                          ? "border-gold bg-gold/10"
                          : "border-white/10 bg-white/[0.03] hover:border-gold/30"
                      }`}
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
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                      />
                    </AdminField>
                    <AdminField label="Category">
                      <input
                        value={worksList[selectedWork]?.category || ""}
                        onChange={(e) => updateItem("projects", selectedWork, "category", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                      />
                    </AdminField>
                  </div>
                  <AdminField label="Image Path (e.g. /tsrm-banner.png)">
                    <input
                      value={worksList[selectedWork]?.img || ""}
                      onChange={(e) => updateItem("projects", selectedWork, "img", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                    />
                  </AdminField>
                  <AdminField label="External Link (Optional)">
                    <input
                      value={worksList[selectedWork]?.link || ""}
                      onChange={(e) => updateItem("projects", selectedWork, "link", e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
                    />
                  </AdminField>
                  <AdminField label="Description">
                    <textarea
                      value={worksList[selectedWork]?.desc || ""}
                      onChange={(e) => updateItem("projects", selectedWork, "desc", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </AdminField>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => {
                        removeItem("projects", selectedWork);
                        setSelectedWork(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Project
                    </button>
                    <button onClick={() => setSelectedWork(null)} className="text-sm font-semibold text-muted-foreground hover:text-white">
                      Deselect
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
