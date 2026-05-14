export default function Footer() {
  const links = {
    Plans: ['All Plans', 'Family Plans', 'Business Plans', 'International'],
    Devices: ['Smartphones', 'Filters', 'eSIM Devices', 'Accessories'],
    Company: ['Our Mission', 'Coverage Map', 'Press', 'Careers'],
    Support: ['Help Center', 'Activation Guide', 'Contact Us', 'Sign In'],
  };

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-primary-navy">
                Simply <span className="text-brand-teal">Kosher</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-xs font-light leading-relaxed">
              Premium digital wireless for an intentional lifestyle. Zero noise, crystal clear connection.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 hover:bg-brand-teal hover:text-white transition-all cursor-pointer">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">{title}</h4>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 hover:text-brand-teal transition-colors font-light">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-50 gap-6">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Simply Kosher Wireless. All rights reserved.
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
