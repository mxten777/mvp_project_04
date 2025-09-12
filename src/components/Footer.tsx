// ...중복 import 제거...
import Link from 'next/link';
import Image from 'next/image';

const navigation = {
  services: [
    { name: '바이브코딩 솔루션', href: '#services' },
    { name: 'RPA 업무 자동화', href: '#services' },
    { name: '공공데이터 API', href: '#services' },
    { name: '헬스케어 솔루션', href: '#services' },
  ],
  company: [
    { name: '회사 소개', href: '#about' },
    { name: '서비스', href: '#services' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '문의하기', href: '#contact' },
  ],
  legal: [
    { name: '개인정보처리방침', href: '#' },
    { name: '이용약관', href: '#' },
    { name: '쿠키정책', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-2 xs:px-3 sm:px-6 py-10 sm:py-16 lg:px-8 lg:py-24 xl:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-5 sm:space-y-8">
            <div>
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white">바이칼시스템즈</span>
              <p className="mt-1 xs:mt-2 text-xs xs:text-sm leading-5 xs:leading-6 text-gray-300">VIBE CODING</p>
            </div>
            <p className="text-xs xs:text-sm leading-5 xs:leading-6 text-gray-300">AI와 RPA 기술로 미래를 코딩하는<br />디지털 혁신 파트너</p>
            <div className="text-xs xs:text-sm text-gray-300">
              <p className="font-semibold text-white mb-1 xs:mb-2">연락처</p>
              <p>📞 010-2380-4691</p>
              <p>✉️ mxten777@gmail.com</p>
              <p>📍 서울특별시 강남구 역삼로 138</p>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 grid grid-cols-1 xs:grid-cols-2 gap-6 xs:gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">서비스</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 xs:mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">회사</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 xs:mt-0 md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">법적 고지</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 xs:mt-10">
                <h3 className="text-sm font-semibold leading-6 text-white">사업자 정보</h3>
                <div className="mt-4 xs:mt-6 text-xs xs:text-sm text-gray-300 space-y-1">
                  <p>상호: (주) 바이칼시스템즈</p>
                  <p>대표자: 정동열</p>
                  <p>사업자등록번호: 215-86-47300</p>
                  <p>통신판매업신고: [신고번호]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 sm:mt-16 border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-3 xs:gap-4 sm:flex-row">
            <div className="flex items-center justify-center" style={{ width: '100px', height: '24px' }}>
              <div
                className="rounded-full overflow-hidden shadow-lg border-2 border-blue-400 bg-gray-900 flex items-center justify-center"
                style={{ width: 48, height: 48 }}
              >
                <Image
                  src="/images/baikal_logo_white.png"
                  alt="바이칼시스템즈 로고"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-[10px] xs:text-xs leading-5 text-gray-400">&copy; 2003 (주) 바이칼시스템즈. All rights reserved.</p>
            <div className="flex items-center space-x-2 xs:space-x-4">
              <span className="text-[10px] xs:text-xs text-gray-400">Powered by</span>
              <span className="text-[10px] xs:text-xs font-semibold text-blue-400">VIBE CODING</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
