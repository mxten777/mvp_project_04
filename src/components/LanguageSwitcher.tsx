'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';

/**
 * LanguageSwitcher — Compact dropdown language selector
 *
 * Desktop: minimal text button showing language code (EN / KO / JA)
 * Mobile: full-width list of language options
 * Design: lowest visual emphasis in header hierarchy
 */

const LANGUAGES = [
  { code: 'ko' as const, label: '한국어', short: 'KO' },
  { code: 'ja' as const, label: '日本語', short: 'JA' },
  { code: 'en' as const, label: 'English', short: 'EN' },
] as const;

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === currentLanguage) ?? LANGUAGES[2];

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* ── Mobile: inline list ── */
  if (mobile) {
    return (
      <div className="flex items-center gap-2" role="radiogroup" aria-label="Language selector">
        {LANGUAGES.map(({ code, label }) => {
          const isActive = currentLanguage === code;
          return (
            <button
              key={code}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`Switch language to ${label}`}
              disabled={isLoading}
              onClick={() => { if (!isActive) setLanguage(code); }}
              className={`
                flex-1 py-2 rounded-lg text-sm font-medium text-center transition-colors duration-200
                ${isActive
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-transparent'}
                ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  /* ── Desktop: compact dropdown ── */
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${current.label}. Click to change language`}
        className={`
          text-[13px] font-medium tracking-wide
          text-white/40 hover:text-white/70
          transition-colors duration-200
          px-2 py-1.5 rounded
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400
          ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
        `}
      >
        {current.short}
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute top-full right-0 mt-2 min-w-[140px] py-1 rounded-lg bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 z-50"
        >
          {LANGUAGES.map(({ code, label }) => {
            const isActive = currentLanguage === code;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  if (!isActive) setLanguage(code);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2 text-sm transition-colors duration-150
                  ${isActive
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'}
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
