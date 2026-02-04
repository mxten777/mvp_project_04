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
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 로고 및 연락처 */}
          <div className="space-y-4">
            <Image
              src="/images/baikal_logo_white.png"
              alt="바이칼시스템즈 로고"
              width={120}
              height={36}
              className="object-contain drop-shadow-lg"
            />
            <p className="text-xs text-gray-300">AI와 RPA 기술로 미래를 코딩하는 디지털 혁신 파트너</p>
            <div className="text-xs text-gray-300 space-y-1">
              <p>📞 010-2380-4691</p>
              <p>✉️ mxten777@gmail.com</p>
              <p>📍 서울특별시 강남구 역삼로 138</p>
            </div>
          </div>
          
          {/* 서비스 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">서비스</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 회사 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">회사</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* 카피라이트 */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] text-gray-400">&copy; 2003 (주) 바이칼시스템즈. All rights reserved.</p>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-gray-400">Powered by</span>
              <span className="text-[10px] font-semibold text-blue-400">VIBE CODING</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
