'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedElement from './AnimatedElement';
import FloatingElement from './FloatingElement';
import { useToast } from './ToastProvider';
import { useLanguage } from '@/lib/i18n';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
// Firebase는 현재 비활성화됨

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

const sources = [
  '검색엔진',
  '지인 추천',
  'SNS',
  '온라인 광고',
  '기타',
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { addToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    position: '',
    serviceType: [],
    message: '',
    source: [],
    responseMethod: '이메일',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: 'serviceType' | 'source', value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 데모 모드: 콘솔에 출력
      console.log('문의 정보 (데모 모드):', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
      
      setSubmitStatus('success');
      
      // Success Toast
      addToast({
        type: 'success',
        title: '상담 신청 완료!',
        message: '24시간 내에 전문 컨설턴트가 연락드리겠습니다.',
        duration: 7000
      });

      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        position: '',
        serviceType: [],
        message: '',
        source: [],
        responseMethod: '이메일',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Error Toast
      addToast({
        type: 'error',
        title: '전송 실패',
        message: '잠시 후 다시 시도해주세요.',
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-500 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <FloatingElement className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl" />
        <FloatingElement className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl" delay={1.5} />
        <FloatingElement className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-2xl" delay={0.8} />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fadeInUp" duration={1.2} delay={0.2}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Premium Header */}
            <div className="mb-4 sm:mb-6">
              <span className="font-display font-medium text-sm sm:text-base tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">
                CONTACT US
              </span>
            </div>
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {t('contact.title')}
              </span>
            </h2>
            <p className="font-ui text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal max-w-3xl mx-auto">
              전문 컨설턴트가 고객님의 요구사항에 맞는 <span className="font-semibold text-indigo-600 dark:text-indigo-400">최적의 솔루션</span>을 제안해드립니다.
            </p>
          </motion.div>
        </AnimatedElement>

        <div className="mx-auto mt-16 sm:mt-20 md:mt-24 grid max-w-7xl grid-cols-1 gap-12 xs:gap-16 lg:grid-cols-2">
          {/* Premium Contact Info */}
          <AnimatedElement animation="slideIn" duration={1} delay={0.4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="mb-6">
                <span className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] text-purple-600 dark:text-purple-400 uppercase">
                  GET IN TOUCH
                </span>
              </div>
              <h3 className="font-heading text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 tracking-tight">
                연락처 정보
              </h3>
              
              <div className="space-y-8">
                <motion.div 
                  className="group flex items-start p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-zinc-700/50 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <PhoneIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-ui font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1 tracking-normal">전화번호</p>
                    <p className="font-ui text-xs sm:text-sm text-gray-600 dark:text-gray-300">010-2380-4691</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group flex items-start p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-zinc-700/50 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <EnvelopeIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-ui font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1 tracking-normal">이메일</p>
                    <p className="font-ui text-xs sm:text-sm text-gray-600 dark:text-gray-300">mxten777@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group flex items-start p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-zinc-700/50 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <MapPinIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-ui font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1 tracking-normal">주소</p>
                    <p className="font-ui text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      서울특별시 강남구 역삼로 138<br />
                      동광빌딩 5층
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 backdrop-blur-xl rounded-3xl p-8 border border-indigo-200/50 dark:border-indigo-700/50 shadow-xl">
                <div className="mb-6">
                  <span className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
                    PROCESS
                  </span>
                </div>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">상담 프로세스</h4>
                <div className="space-y-6">
                  {[
                    { step: 1, title: "문의 접수", color: "from-indigo-500 to-purple-500" },
                    { step: 2, title: "요구사항 분석", color: "from-purple-500 to-pink-500" },
                    { step: 3, title: "상담 일정 조율", color: "from-pink-500 to-red-500" },
                    { step: 4, title: "프로젝트 시작", color: "from-red-500 to-orange-500" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.step}
                      className="flex items-center group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${item.color} text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {item.step}
                      </div>
                      <span className="ml-4 font-ui text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium tracking-wide group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{item.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedElement>

          {/* Premium Contact Form */}
          <AnimatedElement animation="scaleIn" duration={1} delay={0.6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 xs:p-10 sm:p-12 border border-gray-200/50 dark:border-zinc-700/50"
            >
              {/* Premium Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-3xl"></div>
              
              <div className="relative">
                <div className="mb-8">
                  <span className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] text-purple-600 dark:text-purple-400 uppercase">
                    SEND MESSAGE
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight">
                    상담 신청서
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Premium Basic Info */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block font-ui font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2 tracking-wide">
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border-2 border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-3 font-ui text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                        placeholder="홍길동"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label htmlFor="company" className="block font-ui font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2 tracking-wide">
                        회사명 *
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border-2 border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-3 font-ui text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                        placeholder="(주)바이칼시스템즈"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="phone" className="block font-ui font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2 tracking-wide">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border-2 border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-3 font-ui text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                        placeholder="010-1234-5678"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label htmlFor="position" className="block font-ui font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2 tracking-wide">
                        직책
                      </label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border-2 border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-3 font-ui text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                        placeholder="대표이사"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block font-ui font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2 tracking-wide">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border-2 border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-3 font-ui text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                      placeholder="example@company.com"
                    />
                  </motion.div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  관심 서비스 (중복 선택 가능)
                </label>
                <div className="grid grid-cols-2 gap-2 xs:gap-3">
                  {serviceTypes.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.serviceType.includes(service)}
                        onChange={() => handleCheckboxChange('serviceType', service)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-primary dark:checked:border-primary rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  문의 내용 *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  placeholder="프로젝트에 대한 구체적인 요구사항을 알려주세요."
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  알게 된 경로 (중복 선택 가능)
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 xs:gap-3">
                  {sources.map((source) => (
                    <label key={source} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.source.includes(source)}
                        onChange={() => handleCheckboxChange('source', source)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-primary dark:checked:border-primary rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Response Method */}
              <div>
                <label htmlFor="responseMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  답변 희망 수단
                </label>
                <select
                  name="responseMethod"
                  id="responseMethod"
                  value={formData.responseMethod}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                >
                  <option value="이메일">이메일</option>
                  <option value="전화">전화</option>
                  <option value="문자">문자</option>
                </select>
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4">
                  <div className="text-sm text-green-700 dark:text-green-300">
                    문의가 정상적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                  <div className="text-sm text-red-700 dark:text-red-300">
                    문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.
                  </div>
                </div>
              )}

                  {/* Premium Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-4 font-ui font-bold text-white shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-base sm:text-lg tracking-wide"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          처리 중...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <PaperAirplaneIcon className="h-5 w-5 mr-3" />
                          상담 신청하기
                        </div>
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
