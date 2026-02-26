/**
 * ─── EVENTECH Navigation Configuration ───
 * Centralizes all nav links for Header, Footer, and mobile menu.
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
      { label: "Ver todos", href: "/servicios/" },
    ],
  },
  {
    label: "Eventos",
    href: "/eventos/",
    children: [
      { label: "Bodas", href: "/eventos/bodas/" },
      { label: "XV Años", href: "/eventos/xv-anos/" },
      { label: "Corporativos", href: "/eventos/corporativos/" },
      { label: "Sociales", href: "/eventos/sociales/" },
    ],
  },
  { label: "Paquetes", href: "/paquetes/" },
  { label: "Blog", href: "/blog/" },
  { label: "Cotizar", href: "/cotizar/" },
];

export const footerNav: Record<string, NavItem[]> = {
  servicios: [
    { label: "Mobiliario", href: "/servicios/mobiliario/" },
    { label: "Audiovisual", href: "/servicios/audiovisual/" },
    { label: "Carpas", href: "/servicios/carpas/" },
    { label: "Iluminación", href: "/servicios/iluminacion/" },
    { label: "Pistas de Baile", href: "/servicios/pistas-baile/" },
  ],
  eventos: [
    { label: "Bodas", href: "/eventos/bodas/" },
    { label: "XV Años", href: "/eventos/xv-anos/" },
    { label: "Corporativos", href: "/eventos/corporativos/" },
    { label: "Graduaciones", href: "/eventos/graduaciones/" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros/" },
    { label: "Blog", href: "/blog/" },
    { label: "Galería", href: "/galeria/" },
    { label: "Contacto", href: "/contacto/" },
    { label: "FAQ", href: "/faq/" },
  ],
  zonas: [
    { label: "CDMX", href: "/zonas/cdmx/" },
    { label: "Polanco", href: "/zonas/cdmx/polanco/" },
    { label: "Coyoacán", href: "/zonas/cdmx/coyoacan/" },
    { label: "Santa Fe", href: "/zonas/cdmx/santa-fe/" },
    { label: "Estado de México", href: "/zonas/estado-de-mexico/" },
  ],
  legal: [
    { label: "Aviso de Privacidad", href: "/aviso-de-privacidad/" },
    { label: "Términos y Condiciones", href: "/terminos/" },
  ],
};
