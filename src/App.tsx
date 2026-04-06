import { useState, useEffect } from "react";
import { Copy, RefreshCw, Check, MessageSquare, Briefcase, Target, Store, Hospital, Utensils, Scissors, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Tone = "friendly" | "professional" | "persuasive";

const REPLIES: Record<Tone, string[]> = {
  friendly: [
    "يا أهلاً بيك! منورنا والله. بخصوص سؤالك، الأوردر بتاعك في الطريق وهيوصلك خلال يومين بالكتير. لو احتجت أي حاجة تانية إحنا موجودين!",
    "تسلم يا غالي على ذوقك! طلبك وصل وجاري تجهيزه بأحسن شكل. أول ما يطلع هنبعتلك رسالة فوراً. يومك زي الفل!",
    "أهلاً أهلاً! عيونا ليك، طلبك متسجل عندنا وهيوصلك في أسرع وقت. شكراً إنك اخترتنا!",
    "يا مساء الفل! يسعدنا جداً تواصلك معانا. بخصوص استفسارك، كل التفاصيل هتلاقيها جاهزة عندك في أقرب وقت. نورتنا!"
  ],
  professional: [
    "تحية طيبة وبعد، نشكركم على تواصلكم معنا. بخصوص استفساركم عن موعد وصول الطلب، نفيدكم علماً بأنه سيتم التسليم خلال 48 ساعة عمل. شكراً لثقتكم.",
    "عميلنا العزيز، نعتز باختياركم لخدماتنا. تم استلام رسالتكم وجاري العمل على تنفيذ طلبكم بأعلى معايير الجودة. سنوافيكم بالتحديثات قريباً.",
    "أهلاً بك. نود إبلاغكم بأن طلبكم قيد المعالجة حالياً. سيقوم مندوب الشحن بالتواصل معكم فور وصوله لمنطقتكم. مع خالص التحيات.",
    "نشكركم على اهتمامكم بخدماتنا. بخصوص طلبكم، نود التأكيد على أنه تم تسجيل كافة البيانات المطلوبة وسيتم التواصل معكم في أقرب وقت ممكن."
  ],
  persuasive: [
    "فرصة ما تتعوضش! المنتج اللي سألت عليه عليه طلب كبير دلوقتي وكمان فيه خصم 10% لو طلبت النهاردة. تحب أحجزلك قطعة قبل ما الكمية تخلص؟",
    "أهلاً بيك! الرد على سؤالك هو إننا بنقدم أحسن جودة في السوق وبأقل سعر، وده بشهادة كل عملائنا. جرب بنفسك ومش هتندم!",
    "يا فندم إحنا بنهتم جداً برضاك، وعشان كدة وفرنالك ضمان سنة كاملة على المنتج ده. اطلب دلوقتي واستفيد بالعرض المحدود!",
    "أهلاً بيك! المنتج ده هو الحل الأمثل لكل اللي بتدور عليه، وكمان عليه شحن مجاني لفترة محدودة جداً. متفوتش الفرصة!"
  ]
};

export default function App() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!message.trim()) return;
    
    setIsGenerating(true);
    setResult("");
    
    // Simulate generation delay
    setTimeout(() => {
      const toneReplies = REPLIES[tone];
      const randomReply = toneReplies[Math.floor(Math.random() * toneReplies.length)];
      setResult(randomReply);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMessage("");
    setResult("");
    setTone("friendly");
  };

  return (
    <div className="min-h-screen text-gray-800 font-tajawal" dir="rtl">
      {/* Header */}
      <header className="gradient-bg text-white py-12 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <span className="text-4xl">🤖</span>
          <h1 className="text-4xl font-bold">ردّك الذكي</h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg opacity-90"
        >
          رد على عملاءك بذكاء في ثانية
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 -mt-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 md:p-10 card-shadow"
        >
          {/* Step 1: Message Input */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-3 text-navy-dark">
              ① اكتب رسالة العميل
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="مثال: عايز أعرف امتى هيوصل الأوردر؟"
              className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors resize-none text-lg bg-gray-50"
              rows={5}
            />
          </div>

          {/* Step 2: Tone Selection */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-3 text-navy-dark">
              ② اختار نبرة الرد
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTone("friendly")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-medium ${
                  tone === "friendly" 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" 
                    : "border-gray-100 text-gray-600 hover:border-indigo-200"
                }`}
              >
                <span>ودي 😊</span>
              </button>
              <button
                onClick={() => setTone("professional")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-medium ${
                  tone === "professional" 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" 
                    : "border-gray-100 text-gray-600 hover:border-indigo-200"
                }`}
              >
                <span>محترف 💼</span>
              </button>
              <button
                onClick={() => setTone("persuasive")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-medium ${
                  tone === "persuasive" 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" 
                    : "border-gray-100 text-gray-600 hover:border-indigo-200"
                }`}
              >
                <span>مقنع 🎯</span>
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !message.trim()}
            className={`w-full py-4 rounded-xl text-white text-xl font-bold btn-gradient transition-all flex items-center justify-center gap-3 shadow-xl ${
              (isGenerating || !message.trim()) ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isGenerating ? (
              <span className="loading-dots">جاري التوليد</span>
            ) : (
              <>
                <span>✨ ولّد الرد دلوقتي</span>
              </>
            )}
          </button>

          {/* Output Area */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-10 pt-10 border-t-2 border-gray-50"
              >
                <label className="block text-lg font-bold mb-3 text-navy-dark">
                  ③ الرد الجاهز:
                </label>
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 text-lg leading-relaxed mb-6 text-indigo-900">
                  {result}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    <span>{copied ? "تم النسخ!" : "📋 نسخ الرد"}</span>
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    <RefreshCw size={20} className={isGenerating ? "animate-spin" : ""} />
                    <span>🔄 ولّد رد تاني</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* How it works */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-10">إزاي بيشتغل؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "اكتب الرسالة", icon: <MessageSquare className="text-indigo-400" /> },
              { step: "2", title: "اختار النبرة", icon: <Target className="text-indigo-400" /> },
              { step: "3", title: "انسخ الرد", icon: <Copy className="text-indigo-400" /> }
            ].map((item, i) => (
              <div key={i} className="bg-navy-light/30 p-6 rounded-2xl border border-white/10 text-white">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {item.step}
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {item.icon}
                  <h3 className="font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-10">مناسب لـ:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { title: "متاجر إلكترونية", icon: <Store /> },
              { title: "عيادات", icon: <Hospital /> },
              { title: "مطاعم", icon: <Utensils /> },
              { title: "صالونات", icon: <Scissors /> },
              { title: "مقدمي خدمات", icon: <Briefcase /> }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-white/80 hover:bg-white/10 transition-colors">
                <div className="flex justify-center mb-3 text-indigo-400">
                  {item.icon}
                </div>
                <p className="text-sm font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-white/50 border-t border-white/5">
        <div className="flex items-center justify-center gap-2">
          <span>صُنع بـ</span>
          <Heart size={16} className="text-red-500 fill-red-500" />
          <span>في مصر</span>
        </div>
      </footer>
    </div>
  );
}
