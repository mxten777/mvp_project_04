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

const serviceTypes = [
  '바이브코딩 솔루션',
  'RPA 업무 자동화',
  '공공데이터 API',
  '헬스케어 솔루션',
  '데이터 분석',
  '보안 솔루션',
];

const sources = ['검색엔진', '지인 추천', 'SNS', '온라인 광고', '기타'];

const contactInfo = [
  {
    icon: PhoneIcon,
    label: '전화번호',
    value: '010-2380-4691',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: EnvelopeIcon,
    label: '이메일',
    value: 'jngdy@naver.com',
    subValue: 'jngdy@baikalsys.kr',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: MapPinIcon,
    label: '주소',
    value: '서울특별시 강남구 역삼로 138',
    subValue: '동광빌딩 5층',
    gradient: 'from-purple-500 to-pink-500',
  },
];

const processSteps = [
  { step: 1, title: '문의 접수', desc: '24시간 내 확인' },
  { step: 2, title: '요구사항 분석', desc: '전문가 배정' },
  { step: 3, title: '상담 일정 조율', desc: '맞춤 솔루션 제안' },
  { step: 4, title: '프로젝트 시작', desc: '체계적 진행' },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { addToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '', company: '', phone: '', email: '', position: '',
    serviceType: [], message: '', source: [], responseMethod: '이메일',
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
      addToast({ type: 'success', title: '상담 신청 완료!', message: '24시간 내에 전문 컨설턴트가 연락드리겠습니다.', duration: 7000 });
      setFormData({ name: '', company: '', phone: '', email: '', position: '', serviceType: [], message: '', source: [], responseMethod: '이메일' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      addToast({ type: 'error', title: '전송 실패', message: '잠시 후 다시 시도해주세요.', duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-500 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100/40 dark:from-indigo-950/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-purple-100/40 dark:from-purple-950/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-6 inline-flex">CONTACT US</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text-primary">{t('contact.title')}</span>
          </h2>
          <p className="font-ui text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            전문 컨설턴트가 고객님의 요구사항에 맞는 <span className="font-semibold text-indigo-600 dark:text-indigo-400">최적의 솔루션</span>을 제안해드립니다.
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
            {/* Contact cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  className="card-premium p-5 flex items-start gap-4 group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{info.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{info.value}</p>
                    {info.subValue && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">{info.subValue}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="card-premium p-8">
              <div className="relative z-10">
                <span className="section-label mb-4 inline-flex text-[10px]">PROCESS</span>
                <h4 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-6 tracking-tight mt-4">
                  상담 프로세스
                </h4>
                <div className="space-y-5">
                  {processSteps.map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{item.desc}</p>
                      </div>
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
            <div className="card-premium p-8 sm:p-10">
              <div className="relative z-10">
                <div className="mb-8">
                  <span className="section-label mb-3 inline-flex text-[10px]" style={{ color: 'var(--premium-purple)', background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.15)' }}>
                    SEND MESSAGE
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mt-4 tracking-tight">
                    상담 신청서
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이름 *</label>
                      <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="input-premium" placeholder="홍길동" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">회사명 *</label>
                      <input type="text" name="company" id="company" required value={formData.company} onChange={handleInputChange} className="input-premium" placeholder="(주)바이칼시스템즈" />
                    </div>
                  </div>

                  {/* Phone & Position */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">연락처 *</label>
                      <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleInputChange} className="input-premium" placeholder="010-1234-5678" />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">직책</label>
                      <input type="text" name="position" id="position" value={formData.position} onChange={handleInputChange} className="input-premium" placeholder="대표이사" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이메일 *</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="input-premium" placeholder="example@company.com" />
                  </div>

                  {/* Service Types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">관심 서비스</label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceTypes.map((service) => (
                        <label key={service} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700">
                          <input
                            type="checkbox"
                            checked={formData.serviceType.includes(service)}
                            onChange={() => handleCheckboxChange('serviceType', service)}
                            className="w-4 h-4 rounded border-gray-300 dark:border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">문의 내용 *</label>
                    <textarea
                      name="message" id="message" rows={4} required
                      value={formData.message} onChange={handleInputChange}
                      className="input-premium resize-none"
                      placeholder="프로젝트에 대한 구체적인 요구사항을 알려주세요."
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">알게 된 경로</label>
                    <div className="flex flex-wrap gap-2">
                      {sources.map((source) => (
                        <label key={source} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-zinc-800">
                          <input
                            type="checkbox"
                            checked={formData.source.includes(source)}
                            onChange={() => handleCheckboxChange('source', source)}
                            className="w-4 h-4 rounded border-gray-300 dark:border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Response Method */}
                  <div>
                    <label htmlFor="responseMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">답변 희망 수단</label>
                    <select name="responseMethod" id="responseMethod" value={formData.responseMethod} onChange={handleInputChange} className="input-premium">
                      <option value="이메일">이메일</option>
                      <option value="전화">전화</option>
                      <option value="문자">문자</option>
                    </select>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">문의가 정상적으로 접수되었습니다.</p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-700 dark:text-red-300">문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.</p>
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
                        처리 중...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <PaperAirplaneIcon className="w-5 h-5" />
                        상담 신청하기
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
