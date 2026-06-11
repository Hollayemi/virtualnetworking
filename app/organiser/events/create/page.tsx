"use client";
import { useState, useRef, useCallback } from "react";
import { 
  Users, Plus, Zap, MapPin, Save, Globe, Wifi, Clock, CheckCircle, 
  AlertCircle, Upload, X, ChevronRight, Sparkles, BookOpen, ArrowLeft,
   Hash, AlignLeft, List, CheckSquare, Link
} from "lucide-react";
import { Badge } from "@/app/components/organiser";

interface BannerImage {
  name: string;
  type: string;
  size: number;
  extension: string;
  base64: string;
  preview: string;
}

interface BannerUploaderProps {
  images: BannerImage[];
  setImages: (images: BannerImage[]) => void;
}

interface Tier {
  id: number;
  label: string;
  price: number;
  capacity: number;
  description: string;
  color: string;
}

interface CustomField {
  id: number;
  fieldKey: string;
  label: string;
  type: string;
  isRequired: boolean;
  options: string[];
  placeholder: string;
}

interface FormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  locationType: "physical" | "virtual" | "hybrid";
  locationCity: string;
  locationVenue: string;
  locationAddress: string;
  virtualLink: string;
}

interface CreateEventViewProps {
  setIsCreating: (isCreating: boolean) => void;
}

interface FieldTypeOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

// ─── Constants ─────────────────────────────────────────────────────────────────────

const FIELD_TYPES: FieldTypeOption[] = [
  { value: "text", label: "Short text", icon: Hash },
  { value: "textarea", label: "Long text", icon: AlignLeft },
  { value: "select", label: "Dropdown", icon: List },
  { value: "checkbox", label: "Checkbox", icon: CheckSquare },
  { value: "url", label: "URL", icon: Link },
  { value: "number", label: "Number", icon: Hash },
];

// ─── Helper Functions ──────────────────────────────────────────────────────────────

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

// ─── Components ───────────────────────────────────────────────────────────────────

function BannerUploader({ images, setImages }: BannerUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const remaining = 3 - images.length;
    const toProcess = Array.from(files).slice(0, remaining);
    
    const parsed = await Promise.all(
      toProcess.map(async (file): Promise<BannerImage> => ({
        name: file.name,
        type: file.type,
        size: file.size,
        extension: file.name.split(".").pop()?.toLowerCase() || "",
        base64: await fileToBase64(file),
        preview: URL.createObjectURL(file),
      }))
    );
    
    setImages([...images, ...parsed]);
  }, [images.length, setImages]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
        Event banners <span className="text-[#94a3b8] font-normal normal-case">(up to 3 images)</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative group rounded-xl overflow-hidden border border-[#e8edf3] aspect-video bg-[#f8fafc]">
            <img src={img.preview} alt="" className="w-full h-full object-cover" />
            {i === 0 && (
              <span className="absolute top-2 left-2 bg-[#0D1B2A]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Primary
              </span>
            )}
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {images.length < 3 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            // onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            className="aspect-video rounded-xl border-2 border-dashed border-[#cbd5e1] hover:border-[#38AADD] bg-[#f8fafc] hover:bg-[#eef8fe] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Upload size={16} className="text-[#94a3b8]" />
            <span className="text-[11px] text-[#94a3b8] font-medium">Add image</span>
          </button>
        )}
      </div>
      <input 
        ref={inputRef} 
        type="file" 
        multiple 
        accept="image/jpeg,image/png,image/webp" 
        className="hidden"
        onChange={e => { 
          handleFiles(e.target.files); 
          e.target.value = ""; 
        }} 
      />
      <p className="text-[11px] text-[#94a3b8]">JPG, PNG or WebP · First image shown as primary banner · Drag & drop supported</p>
    </div>
  );
}

function CreateEventView({ setIsCreating }: CreateEventViewProps) {
  const [step, setStep] = useState<number>(0);
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [form, setForm] = useState<FormData>({
    name: "", 
    description: "", 
    startDate: "", 
    endDate: "",
    locationType: "physical", 
    locationCity: "", 
    locationVenue: "", 
    locationAddress: "", 
    virtualLink: "",
  });
  const [tiers, setTiers] = useState<Tier[]>([
    { id: Date.now(), label: "Regular", price: 0, capacity: 200, description: "", color: "#38AADD" },
  ]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const addTier = () => {
    setTiers(prev => [...prev, { 
      id: Date.now(), 
      label: "", 
      price: 0, 
      capacity: 100, 
      description: "", 
      color: "#94a3b8" 
    }]);
  };

  const removeTier = (id: number) => {
    setTiers(prev => prev.filter(t => t.id !== id));
  };

  const setTierField = <K extends keyof Tier>(id: number, key: K, value: Tier[K]) => {
    setTiers(prev => prev.map(t => t.id === id ? { ...t, [key]: value } : t));
  };

  const addField = () => {
    setCustomFields(prev => [...prev, { 
      id: Date.now(), 
      fieldKey: "", 
      label: "", 
      type: "text", 
      isRequired: false, 
      options: [], 
      placeholder: "" 
    }]);
  };

  const removeField = (id: number) => {
    setCustomFields(prev => prev.filter(f => f.id !== id));
  };

  const setCFField = <K extends keyof CustomField>(id: number, key: K, value: CustomField[K]) => {
    setCustomFields(prev => prev.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const STEPS = ["Basics", "Ticket tiers", "Custom fields", "Review & publish"];

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-[#e8edf3] text-[13.5px] text-[#0D1B2A] placeholder-[#94a3b8] outline-none focus:border-[#38AADD] bg-white transition-colors";
  const labelCls = "block text-[11.5px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5";

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8edf3] px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => setIsCreating(false)} 
          className="flex items-center gap-1.5 text-[#64748b] hover:text-[#0D1B2A] text-[13px] cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-1 flex-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <button
                onClick={() => i <= step && setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer border-none ${
                  i === step 
                    ? "bg-[#0D1B2A] text-white" 
                    : i < step 
                    ? "bg-[#8DC64C]/15 text-[#5c8c2c]" 
                    : "text-[#94a3b8]"
                }`}
              >
                {i < step 
                  ? <CheckCircle size={12} /> 
                  : <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">{i + 1}</span>
                }
                {s}
              </button>
              {i < STEPS.length - 1 && <ChevronRight size={13} className="text-[#cbd5e1]" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[820px] mx-auto px-6 py-8">
        {/* STEP 0: BASICS */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-[#0D1B2A] mb-0.5">Event basics</h2>
              <p className="text-[13.5px] text-[#64748b]">Give your event a name, describe it, set the date and location.</p>
            </div>

            <div className="bg-white border border-[#e8edf3] rounded-2xl p-6">
              <BannerUploader images={banners} setImages={setBanners} />
            </div>

            <div className="bg-white border border-[#e8edf3] rounded-2xl p-6 space-y-5">
              <div>
                <label className={labelCls}>Event name *</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={e => setField("name", e.target.value)} 
                  placeholder="e.g. TechSummit Europe 2025" 
                  className={inputCls} 
                />
              </div>
              <div>
                <label className={labelCls}>Description *</label>
                <textarea 
                  value={form.description} 
                  onChange={e => setField("description", e.target.value)} 
                  placeholder="What will attendees experience? Who should come?" 
                  rows={4} 
                  className={`${inputCls} resize-none`} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Start date *</label>
                  <input 
                    type="datetime-local" 
                    value={form.startDate} 
                    onChange={e => setField("startDate", e.target.value)} 
                    className={inputCls} 
                  />
                </div>
                <div>
                  <label className={labelCls}>End date *</label>
                  <input 
                    type="datetime-local" 
                    value={form.endDate} 
                    onChange={e => setField("endDate", e.target.value)} 
                    className={inputCls} 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e8edf3] rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-[#0D1B2A] text-[14px]">Location</h3>
              <div>
                <label className={labelCls}>Event type *</label>
                <div className="flex gap-2">
                  {[
                    { value: "physical" as const, label: "In person", icon: MapPin },
                    { value: "virtual" as const, label: "Virtual", icon: Globe },
                    { value: "hybrid" as const, label: "Hybrid", icon: Wifi },
                  ].map(opt => {
                    const Icon = opt.icon;
                    const sel = form.locationType === opt.value;
                    return (
                      <button 
                        key={opt.value} 
                        type="button" 
                        onClick={() => setField("locationType", opt.value)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all cursor-pointer flex-1 justify-center ${
                          sel 
                            ? "border-[#38AADD] bg-[#eef8fe] text-[#0D1B2A]" 
                            : "border-[#e8edf3] text-[#64748b] hover:border-[#94a3b8]"
                        }`}
                      >
                        <Icon size={14} className={sel ? "text-[#38AADD]" : ""} /> {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {form.locationType !== "virtual" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>City</label>
                    <input 
                      type="text" 
                      value={form.locationCity} 
                      onChange={e => setField("locationCity", e.target.value)} 
                      placeholder="e.g. London" 
                      className={inputCls} 
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Venue name</label>
                    <input 
                      type="text" 
                      value={form.locationVenue} 
                      onChange={e => setField("locationVenue", e.target.value)} 
                      placeholder="e.g. ExCeL London" 
                      className={inputCls} 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Full address</label>
                    <input 
                      type="text" 
                      value={form.locationAddress} 
                      onChange={e => setField("locationAddress", e.target.value)} 
                      placeholder="Street address" 
                      className={inputCls} 
                    />
                  </div>
                </div>
              )}
              {form.locationType !== "physical" && (
                <div>
                  <label className={labelCls}>Virtual link</label>
                  <input 
                    type="url" 
                    value={form.virtualLink} 
                    onChange={e => setField("virtualLink", e.target.value)} 
                    placeholder="https://zoom.us/j/…" 
                    className={inputCls} 
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: TIERS */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-[#0D1B2A] mb-0.5">Ticket tiers</h2>
              <p className="text-[13.5px] text-[#64748b]">Define who can attend and at what price. At least one tier is required. A free Regular tier is standard.</p>
            </div>

            <div className="space-y-4">
              {tiers.map((tier, idx) => (
                <div key={tier.id} className="bg-white border border-[#e8edf3] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: tier.color }} />
                      <span className="font-semibold text-[#0D1B2A] text-[14px]">{tier.label || `Tier ${idx + 1}`}</span>
                      {tier.price === 0 && <Badge variant="green">Free</Badge>}
                    </div>
                    {tiers.length > 1 && (
                      <button 
                        onClick={() => removeTier(tier.id)} 
                        className="text-[#94a3b8] hover:text-red-500 cursor-pointer bg-transparent border-none transition-colors"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Tier name *</label>
                      <input 
                        type="text" 
                        value={tier.label} 
                        onChange={e => setTierField(tier.id, "label", e.target.value)} 
                        placeholder="e.g. Regular, VIP, Sponsor" 
                        className={inputCls} 
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Price (£)</label>
                      <input 
                        type="number" 
                        min={0} 
                        value={tier.price} 
                        onChange={e => setTierField(tier.id, "price", Number(e.target.value))} 
                        placeholder="0 = free" 
                        className={inputCls} 
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Capacity <span className="text-[#94a3b8] normal-case font-normal">(0 = unlimited)</span></label>
                      <input 
                        type="number" 
                        min={0} 
                        value={tier.capacity} 
                        onChange={e => setTierField(tier.id, "capacity", Number(e.target.value))} 
                        placeholder="0" 
                        className={inputCls} 
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Color</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color" 
                          value={tier.color} 
                          onChange={e => setTierField(tier.id, "color", e.target.value)} 
                          className="w-10 h-10 rounded-lg cursor-pointer border border-[#e8edf3]" 
                        />
                        <input 
                          type="text" 
                          value={tier.color} 
                          onChange={e => setTierField(tier.id, "color", e.target.value)} 
                          className={`${inputCls} flex-1`} 
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className={labelCls}>Description</label>
                      <input 
                        type="text" 
                        value={tier.description} 
                        onChange={e => setTierField(tier.id, "description", e.target.value)} 
                        placeholder="What's included in this tier?" 
                        className={inputCls} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tiers.length < 5 && (
              <button 
                onClick={addTier} 
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#cbd5e1] hover:border-[#38AADD] text-[#64748b] hover:text-[#38AADD] rounded-2xl text-[13px] font-medium transition-all cursor-pointer bg-transparent"
              >
                <Plus size={15} /> Add another tier
              </button>
            )}

            <div className="bg-[#eef8fe] border border-[#38AADD]/30 rounded-xl p-4 flex items-start gap-3">
              <Zap size={14} className="text-[#38AADD] mt-0.5 flex-shrink-0" />
              <p className="text-[12.5px] text-[#0369a1] leading-relaxed">
                <strong>Tip:</strong> Adding a VIP tier automatically enables the VIP access gate. Attendees on lower tiers will need to spend credits to connect with VIP ticket holders.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOM FIELDS */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-[#0D1B2A] mb-0.5">Registration questions</h2>
              <p className="text-[13.5px] text-[#64748b]">Collect extra information from attendees when they register. These are optional unless you mark them required.</p>
            </div>

            {customFields.length === 0 && (
              <div className="bg-white border-2 border-dashed border-[#e8edf3] rounded-2xl p-10 text-center">
                <BookOpen size={28} className="text-[#cbd5e1] mx-auto mb-3" />
                <p className="text-[14px] font-medium text-[#64748b] mb-1">No custom fields yet</p>
                <p className="text-[12.5px] text-[#94a3b8] mb-4">Add questions like "Job title", "What are you hoping to get from this event?", etc.</p>
              </div>
            )}

            <div className="space-y-4">
              {customFields.map((cf, idx) => (
                <div key={cf.id} className="bg-white border border-[#e8edf3] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-[#0D1B2A] text-[14px]">Field {idx + 1}</span>
                    <button 
                      onClick={() => removeField(cf.id)} 
                      className="text-[#94a3b8] hover:text-red-500 cursor-pointer bg-transparent border-none"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Field type *</label>
                      <select 
                        value={cf.type} 
                        onChange={e => setCFField(cf.id, "type", e.target.value)} 
                        className={`${inputCls} cursor-pointer`}
                      >
                        {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Field key * <span className="text-[#94a3b8] normal-case font-normal">(unique ID)</span></label>
                      <input 
                        type="text" 
                        value={cf.fieldKey} 
                        onChange={e => setCFField(cf.id, "fieldKey", e.target.value.replace(/\s/g, "_").toLowerCase())} 
                        placeholder="e.g. job_title" 
                        className={inputCls} 
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Label *</label>
                      <input 
                        type="text" 
                        value={cf.label} 
                        onChange={e => setCFField(cf.id, "label", e.target.value)} 
                        placeholder="Shown to attendees" 
                        className={inputCls} 
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Placeholder</label>
                      <input 
                        type="text" 
                        value={cf.placeholder} 
                        onChange={e => setCFField(cf.id, "placeholder", e.target.value)} 
                        placeholder="Helper text" 
                        className={inputCls} 
                      />
                    </div>
                    {cf.type === "select" && (
                      <div className="col-span-2">
                        <label className={labelCls}>Options <span className="text-[#94a3b8] normal-case font-normal">(comma-separated)</span></label>
                        <input 
                          type="text" 
                          value={cf.options.join(", ")} 
                          onChange={e => setCFField(cf.id, "options", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} 
                          placeholder="Option 1, Option 2, Option 3" 
                          className={inputCls} 
                        />
                      </div>
                    )}
                    <div className="col-span-2">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <div
                          onClick={() => setCFField(cf.id, "isRequired", !cf.isRequired)}
                          className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                            cf.isRequired ? "bg-[#E8472F]" : "bg-[#e8edf3]"
                          }`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                            cf.isRequired ? "left-5" : "left-0.5"
                          }`} />
                        </div>
                        <span className="text-[13px] text-[#0D1B2A] font-medium">Required field</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addField} 
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#cbd5e1] hover:border-[#38AADD] text-[#64748b] hover:text-[#38AADD] rounded-2xl text-[13px] font-medium transition-all cursor-pointer bg-transparent"
            >
              <Plus size={15} /> Add a question
            </button>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-[#0D1B2A] mb-0.5">Review & publish</h2>
              <p className="text-[13.5px] text-[#64748b]">Everything looks good? Publish your event and start sharing the networking access link.</p>
            </div>

            <div className="bg-white border border-[#e8edf3] rounded-2xl overflow-hidden">
              <div className="h-32 bg-[#0D1B2A] flex items-center justify-center relative">
                {banners[0] ? (
                  <img src={banners[0].preview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">🚀</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 flex gap-1.5">
                  {tiers.map(t => (
                    <span key={t.id} className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: `${t.color}cc` }}>
                      {t.label} {t.price === 0 ? "Free" : `£${t.price}`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-[#0D1B2A] text-[18px] mb-1">{form.name || "Event name"}</h3>
                <p className="text-[13px] text-[#64748b] mb-3 line-clamp-2">{form.description || "No description yet."}</p>
                <div className="flex gap-4 text-[12px] text-[#94a3b8]">
                  <span className="flex items-center gap-1"><MapPin size={11} />{form.locationCity || "Location TBD"}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{form.startDate ? new Date(form.startDate).toLocaleDateString("en-GB") : "Date TBD"}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{tiers.reduce((sum, t) => sum + (t.capacity || 0), 0)} capacity</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e8edf3] rounded-2xl p-5">
              <h3 className="font-semibold text-[#0D1B2A] text-[14px] mb-4">Pre-publish checklist</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Event name added", ok: !!form.name },
                  { label: "Description added", ok: !!form.description },
                  { label: "Date & time set", ok: !!form.startDate && !!form.endDate },
                  { label: "Location configured", ok: form.locationType === "virtual" ? !!form.virtualLink : !!form.locationCity },
                  { label: "At least one ticket tier", ok: tiers.length > 0 && tiers.every(t => !!t.label) },
                  { label: "Banner image uploaded", ok: banners.length > 0 },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    {item.ok
                      ? <CheckCircle size={15} className="text-[#8DC64C]" />
                      : <AlertCircle size={15} className="text-[#f59e0b]" />}
                    <span className={`text-[13px] ${item.ok ? "text-[#0D1B2A]" : "text-[#94a3b8]"}`}>{item.label}</span>
                    {!item.ok && <span className="text-[11px] text-amber-500 font-medium">Missing</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8edf3]">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : setIsCreating(false)}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#e8edf3] rounded-xl text-[13px] font-medium text-[#64748b] hover:border-[#94a3b8] transition-colors cursor-pointer bg-white"
          >
            <ArrowLeft size={14} /> {step === 0 ? "Cancel" : "Back"}
          </button>
          <div className="flex gap-3">
            {step < 3 && (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0D1B2A] hover:bg-[#1e293b] text-white text-[13px] font-semibold rounded-xl border-none cursor-pointer transition-colors"
              >
                Continue <ChevronRight size={14} />
              </button>
            )}
            {step === 3 && (
              <>
                <button className="flex items-center gap-2 px-5 py-2.5 border border-[#e8edf3] rounded-xl text-[13px] font-medium text-[#64748b] hover:border-[#94a3b8] cursor-pointer bg-white transition-colors">
                  <Save size={14} /> Save as draft
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#E8472F] hover:bg-[#c73a24] text-white text-[13px] font-semibold rounded-xl border-none cursor-pointer transition-colors">
                  <Sparkles size={14} /> Publish event
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default CreateEventView;