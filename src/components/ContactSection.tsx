'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <section id="contact" className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-500">
  <div className="mx-auto max-w-7xl px-2 xs:px-3 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-xs xs:text-sm sm:text-base font-semibold leading-7 text-primary dark:text-primary-light">문의하기</h2>
          <p className="mt-2 text-xl xs:text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">프로젝트 상담 신청</p>
          <p className="mt-4 sm:mt-6 text-sm xs:text-base leading-7 sm:leading-8 text-gray-600 dark:text-gray-300">전문 컨설턴트가 고객님의 요구사항에 맞는 최적의 솔루션을 제안해드립니다.</p>
        </motion.div>

  <div className="mx-auto mt-10 sm:mt-14 md:mt-16 grid max-w-6xl grid-cols-1 gap-8 xs:gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-8">연락처 정보</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 xs:h-6 xs:w-6 text-primary dark:text-primary-light" />
                </div>
                <div className="ml-2 xs:ml-3">
                  <p className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white">전화번호</p>
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-300">010-2380-4691</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5 xs:h-6 xs:w-6 text-primary dark:text-primary-light" />
                </div>
                <div className="ml-2 xs:ml-3">
                  <p className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white">이메일</p>
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-300">mxten777@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 xs:h-6 xs:w-6 text-primary dark:text-primary-light" />
                </div>
                <div className="ml-2 xs:ml-3">
                  <p className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white">주소</p>
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-300">
                    서울특별시 강남구 역삼로 138<br />
                    동광빌딩 5층
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-primary/10 dark:bg-primary-dark/20 rounded-lg p-4 xs:p-6">
              <h4 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-4">상담 프로세스</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 bg-primary text-white rounded-full flex items-center justify-center text-[11px] xs:text-xs font-bold">1</span>
                  <span className="ml-2 xs:ml-3 text-xs xs:text-sm text-gray-700 dark:text-gray-300">문의 접수</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">요구사항 분석</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 bg-primary text-white rounded-full flex items-center justify-center text-[11px] xs:text-xs font-bold">2</span>
                  <span className="ml-2 xs:ml-3 text-xs xs:text-sm text-gray-700 dark:text-gray-300">상담 일정 조율</span>
                </div>
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">프로젝트 시작</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card dark:bg-card-dark rounded-card shadow-card p-4 xs:p-6 sm:p-8 border border-gray-100 dark:border-zinc-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4 xs:gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    회사명 *
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 xs:gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    직책
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  이메일 *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light sm:text-sm px-3 py-2 border bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                />
              </div>

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

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center rounded-cta bg-cta-gradient dark:bg-gradient-to-r dark:from-cta dark:to-secondary-dark px-3 py-2 xs:px-4 xs:py-3 text-sm xs:text-base font-semibold text-white shadow-cta hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                      문의하기
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
