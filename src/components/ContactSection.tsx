'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useToast } from './ToastProvider';
import { useLanguage } from '@/lib/i18n';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  position: string;
  serviceType: string[];
  message: string;
  source: string[];
  responseMethod: string;
}

export default function ContactSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { addToast } = useToast();

  const serviceTypes = [
    t('contact.serviceTypes.s1'), t('contact.serviceTypes.s2'), t('contact.serviceTypes.s3'),
    t('contact.serviceTypes.s4'), t('contact.serviceTypes.s5'), t('contact.serviceTypes.s6'),
  ];

  const sources = [
    t('contact.sources.s1'), t('contact.sources.s2'), t('contact.sources.s3'),
    t('contact.sources.s4'), t('contact.sources.s5'),
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: t('contact.info.phone'),
      value: '010-2380-4691',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: EnvelopeIcon,
      label: t('contact.info.email'),
      value: 'jngdy@naver.com',
      subValue: 'jngdy@baikalsys.kr',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: MapPinIcon,
      label: t('contact.info.address'),
      value: '서울특별시 강남구 역삼로 138',
      subValue: '동광빌딩 5층',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const processSteps = [
    { step: 1, title: t('contact.process.s1'), desc: t('contact.process.s1d') },
    { step: 2, title: t('contact.process.s2'), desc: t('contact.process.s2d') },
    { step: 3, title: t('contact.process.s3'), desc: t('contact.process.s3d') },
    { step: 4, title: t('contact.process.s4'), desc: t('contact.process.s4d') },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: '', company: '', phone: '', email: '', position: '',
    serviceType: [], message: '', source: [], responseMethod: t('contact.form.responseEmail'),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: 'serviceType' | 'source', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      console.log('문의 정보 (데모 모드):', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      addToast({ type: 'success', title: t('contact.form.successTitle'), message: t('contact.form.successMsg'), duration: 7000 });
      setFormData({ name: '', company: '', phone: '', email: '', position: '', serviceType: [], message: '', source: [], responseMethod: t('contact.form.responseEmail') });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      addToast({ type: 'error', title: t('contact.form.errorTitle'), message: t('contact.form.errorMsg'), duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-[#0d1525] dark:to-[#0b1120] transition-colors duration-500 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/40 dark:from-indigo-950/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-100/40 dark:from-purple-950/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4 inline-flex">{t('contact.label')}</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="gradient-text-primary">{t('contact.title')}</span>
          </h2>
          <p className="font-ui text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact cards - enhanced with gradient accent */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  className="card-premium p-5 flex items-start gap-4 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Left accent line */}
                  <div className={`absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b ${info.gradient} rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{info.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{info.value}</p>
                    {info.subValue && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{info.subValue}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Steps - enhanced with numbered badges */}
            <div className="card-premium p-8 relative overflow-hidden">
              {/* Top gradient accent */}
              <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-full opacity-50" />

              <div className="relative z-10">
                <span className="section-label mb-4 inline-flex text-[10px]">PROCESS</span>
                <h4 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-6 tracking-tight mt-4">
                  {t('contact.process.title')}
                </h4>
                <div className="space-y-5">
                  {processSteps.map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-4 group p-2 -m-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                      {i < processSteps.length - 1 && (
                        <div className="hidden sm:block w-4 h-4 text-gray-300 dark:text-gray-600">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M5 10l3 3 3-3"/></svg>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="card-premium p-8 sm:p-10 relative overflow-hidden">
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/5 via-purple-500/3 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-8">
                  <span className="section-label mb-3 inline-flex text-[10px]" style={{ color: 'var(--premium-purple)', background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.15)' }}>
                    {t('contact.form.label')}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight">
                    {t('contact.form.title')}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.name')} *</label>
                      <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="input-premium" placeholder={t('contact.form.namePlaceholder')} />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.company')} *</label>
                      <input type="text" name="company" id="company" required value={formData.company} onChange={handleInputChange} className="input-premium" placeholder={t('contact.form.companyPlaceholder')} />
                    </div>
                  </div>

                  {/* Phone & Position */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.phone')} *</label>
                      <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleInputChange} className="input-premium" placeholder={t('contact.form.phonePlaceholder')} />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.position')}</label>
                      <input type="text" name="position" id="position" value={formData.position} onChange={handleInputChange} className="input-premium" placeholder={t('contact.form.positionPlaceholder')} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.email')} *</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="input-premium" placeholder={t('contact.form.emailPlaceholder')} />
                  </div>

                  {/* Service Types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('contact.form.services')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceTypes.map((service) => (
                        <label key={service} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#1a2540] border border-transparent hover:border-gray-200 dark:hover:border-[#253555]">
                          <input
                            type="checkbox"
                            checked={formData.serviceType.includes(service)}
                            onChange={() => handleCheckboxChange('serviceType', service)}
                            className="w-4 h-4 rounded border-gray-300 dark:border-[#2d4060] text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.message')} *</label>
                    <textarea
                      name="message" id="message" rows={4} required
                      value={formData.message} onChange={handleInputChange}
                      className="input-premium resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('contact.form.source')}</label>
                    <div className="flex flex-wrap gap-2">
                      {sources.map((source) => (
                        <label key={source} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-[#1a2540]">
                          <input
                            type="checkbox"
                            checked={formData.source.includes(source)}
                            onChange={() => handleCheckboxChange('source', source)}
                            className="w-4 h-4 rounded border-gray-300 dark:border-[#2d4060] text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Response Method */}
                  <div>
                    <label htmlFor="responseMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.responseMethod')}</label>
                    <select name="responseMethod" id="responseMethod" value={formData.responseMethod} onChange={handleInputChange} className="input-premium">
                      <option value={t('contact.form.responseEmail')}>{t('contact.form.responseEmail')}</option>
                      <option value={t('contact.form.responsePhone')}>{t('contact.form.responsePhone')}</option>
                      <option value={t('contact.form.responseSms')}>{t('contact.form.responseSms')}</option>
                    </select>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">{t('contact.form.successInline')}</p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-700 dark:text-red-300">{t('contact.form.errorInline')}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-premium btn-primary !py-4 !text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.form.submitting')}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <PaperAirplaneIcon className="w-5 h-5" />
                        {t('contact.form.submit')}
                      </div>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
