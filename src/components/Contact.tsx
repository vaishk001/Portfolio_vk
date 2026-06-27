import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, ArrowRight, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: { personal: p } } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactLinks = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: p.email, href: `mailto:${p.email}`, color: 'from-red-500 to-orange-500', glow: 'rgba(239,68,68,0.3)' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', value: 'Connect with me', href: p.linkedin, color: 'from-blue-500 to-cyan-500', glow: 'rgba(59,130,246,0.3)' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', value: 'See my code', href: p.github, color: 'from-gray-500 to-slate-600', glow: 'rgba(107,114,128,0.3)' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: p.location, href: null, color: 'from-green-500 to-emerald-600', glow: 'rgba(34,197,94,0.3)' },
  ];

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all duration-200 code-font text-sm";

  return (
    <section id="contact" className="section-padding bg-gray-900 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(124,58,237,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="code-font text-cyan-400 text-sm tracking-widest mb-3">// let's collaborate</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="gradient-text-static">Touch</span>
          </h2>
          <div className="section-line" />
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
            Have a project idea? Want to collaborate? Or just want to say hi?
            <span className="text-violet-400"> My inbox is always open.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Left: Links + Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactLinks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 hover:border-violet-500/30 transition-all card-hover group"
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px ${item.glow}`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-white font-semibold text-sm">{item.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-violet-400 ml-auto transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-white font-semibold text-sm">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="p-6 rounded-2xl border border-violet-500/30 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full -mr-16 -mt-16 blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <span className="font-bold text-white">Open for Opportunities</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Actively looking for internships & full-time roles. Let's build something great!
                </p>
                <a
                  href={p.resumeUrl || '#'}
                  target={p.resumeUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={!p.resumeUrl ? (e) => { e.preventDefault(); alert('Resume URL not set. Go to /vk-studio → Personal Info → Resume URL.'); } : undefined}
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
                >
                  View Resume <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-5 sm:p-8 border border-white/8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="code-font text-gray-600 text-xs ml-2">message.ts</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="code-font text-xs text-gray-500">// your name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputCls}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="code-font text-xs text-gray-500">// your email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputCls}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="code-font text-xs text-gray-500">// subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="Project Inquiry / Collaboration / Just Saying Hi"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="code-font text-xs text-gray-500">// message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputCls} resize-none`}
                      placeholder="Tell me about your idea..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl btn-primary text-white font-bold flex items-center justify-center gap-3 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
