/**
 * ─── EVENTECH Navigation Configuration ───
 * Centralizes all nav links for Header, Footer, and mobile menu.
 * Only includes links to pages that actually exist.
 */

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Servicios",
    href: "/servicios/",
    children: [
      { label: "Mobiliario", href: "/servicios/mobiliario/" },
      { label: "Audiovisual", href: "/servicios/audiovisual/" },
      { label: "Carpas", href: "/servicios/carpas/" },
      { label: "Iluminación", href: "/servicios/iluminacion/" },
      { label: "Pistas de Baile", href: "/servicios/pistas-baile/" },
      { label: "Inflables", href: "/servicios/inflables/" },
      { label: "Catering", href: "/servicios/catering/" },
      { label: "Accesorios", href: "/servicios/accesorios/" },
      { label: "Ver todos", href: "/servicios/" },
    ],
  },
  {
    label: "Directorio",
    href: "/directorio/",
    children: [
      { label: "CDMX", href: "/directorio/cdmx/" },
      { label: "Estado de México", href: "/directorio/estado-mexico/" },
      { label: "Ver todos", href: "/directorio/" },
    ],
  },
  { label: "Bodas", href: "/eventos/bodas/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Blog", href: "/blog/" },
];

export const footerNav: Record<string, NavItem[]> = {
  servicios: [
    { label: "Mobiliario", href: "/servicios/mobiliario/" },
    { label: "Audiovisual", href: "/servicios/audiovisual/" },
    { label: "Carpas", href: "/servicios/carpas/" },
    { label: "Iluminación", href: "/servicios/iluminacion/" },
    { label: "Pistas de Baile", href: "/servicios/pistas-baile/" },
    { label: "Inflables", href: "/servicios/inflables/" },
    { label: "Catering", href: "/servicios/catering/" },
    { label: "Accesorios", href: "/servicios/accesorios/" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros/" },
    { label: "Bodas", href: "/eventos/bodas/" },
    { label: "Directorio Salones", href: "/directorio/" },
    { label: "Cobertura CDMX", href: "/zonas/cdmx/" },
    { label: "Blog", href: "/blog/" },
  ],
};
