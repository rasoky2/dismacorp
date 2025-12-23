import {
  Facebook,
  Instagram,
  Linkedin,
  HardHat,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary opacity-50" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-8 flex flex-col text-left">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="p-2 bg-secondary rounded-lg shadow-lg">
                <HardHat size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                DISMA<span className="text-secondary">CORP</span>
              </span>
            </Link>
            <p className="text-gray-300 font-medium leading-relaxed italic pr-4">
              Líderes en ingeniería civil y soluciones estructurales de alto
              nivel. Construyendo con precisión y compromiso desde nuestra
              fundación.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all border border-white/10 group"
                >
                  <Icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="text-left">
            <h4 className="text-accent font-black uppercase tracking-widest text-xs mb-8">
              Navegación
            </h4>
            <ul className="space-y-4">
              {[
                "Inicio",
                "Servicios",
                "Proyectos",
                "Productos",
                "Contacto",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-secondary font-bold text-sm transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-accent font-black uppercase tracking-widest text-xs mb-8">
              Contacto
            </h4>
            <ul className="space-y-6">
              {[
                {
                  icon: <MapPin size={18} />,
                  label: "Oficina Central",
                  text: "Av. Los Constructores 123, Lima - Perú",
                },
                {
                  icon: <Phone size={18} />,
                  label: "Línea de Atención",
                  text: "+51 965 282 183",
                },
                {
                  icon: <Mail size={18} />,
                  label: "Email Corporativo",
                  text: "contacto@dismacorp.com",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group">
                  <div className="text-secondary mt-1">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      {item.label}
                    </span>
                    {item.label === "Línea de Atención" ? (
                      <Link 
                        href="https://wa.me/51965282183" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-200 font-medium text-sm hover:text-secondary transition-colors"
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <span className="text-gray-200 font-medium text-sm">
                        {item.text}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">
            © {currentYear} Disma Corp - Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Términos de Servicio
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Política de Calidad
            </Link>
            <Link href="/admin/login" className="hover:text-accent transition-colors text-accent/80">
              Solo Empleados
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
