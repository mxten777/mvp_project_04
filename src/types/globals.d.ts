declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Tailwind CSS 지원
declare module '../app/globals.css' {
  const content: Record<string, unknown>;
  export default content;
}