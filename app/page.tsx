'use client'

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser' 

const EMAILJS_SERVICE_ID  = 'service_r30d4ua'
const EMAILJS_TEMPLATE_ID = 'template_5pn8b7d'
const EMAILJS_PUBLIC_KEY  = 's9bzBaRtEktfBRtF6'

const IMAGES = {
  pvc:          '/images/pvc.jpg',
  polypropylene:'/images/polypropylene.jpg',
  eva:          '/images/eva.jpg',
  polyethylene: '/images/polyethylene.jpg',
  polycarbonate:'/images/polycarbonate.jpg',
  carbonBlack:  '/images/carbon-black.jpg',
  pet:          '/images/pet.jpg',
  nylon6:       '/images/nylon6.jpg',
  abs:          '/images/abs.jpg',
  pom:          '/images/pom.jpg',
  pbt:          '/images/pbt.jpg',
}

const products = [
  { img: IMAGES.pvc,           name: 'PVC',          desc: 'Available in rigid and flexible forms. Used for pipes, doors, windows, plumbing, and as an alternative to rubber.' },
  { img: IMAGES.polypropylene, name: 'Polypropylene', desc: 'Easy-to-recycle thermoplastic. Resistant to chemical solvents, acids, and bacteria. Multiple grades available.' },
  { img: IMAGES.eva,           name: 'EVA',           desc: 'Used in shoe soles, foams, hotmelt adhesives, anti-corrosive coatings, and flame retardants.' },
  { img: IMAGES.polyethylene,  name: 'Polyethylene',  desc: 'Available as HDPE, LDPE, LLDPE, MDPE, MLLDPE. Used for plastic bottles, packaging film, and pipes.' },
  { img: IMAGES.polycarbonate, name: 'Polycarbonate', desc: 'High mechanical strength and sturdiness. Impact-resistant over wide temperature ranges. Transparent.' },
  { img: IMAGES.carbonBlack,   name: 'Carbon Black',  desc: 'Used in tyres, plastics, rubber goods, textiles. High surface-area-to-volume ratio.' },
  { img: IMAGES.pet,           name: 'PET',           desc: 'Commonly used for water, soft drink, and beverage bottles. High mechanical resistance.' },
  { img: IMAGES.nylon6,        name: 'Nylon 6',       desc: 'Impact resistant with high elasticity and good resilience. Tough in hot automotive fluids.' },
  { img: IMAGES.abs,           name: 'ABS',           desc: 'Good thermal stability and impact resistance. Ideal for panels, instruments, and connectors.' },
  { img: IMAGES.pom,           name: 'POM',           desc: 'Engineering thermoplastic for precision parts. High elasticity, strength and toughness.' },
  { img: IMAGES.pbt,           name: 'PBT',           desc: 'High molecular weight polymer. Used in auto parts, electronics, and electrical components.' },
]

const mistakes = [
  { n:'1', head:'No Buying Plan for Disaster Events', prob:'Events like COVID-19 and negative crude oil prices can cause 20–40% losses on your inventory, taking 4–6 months to recover.', sol:'We share a recommended buying strategy for crisis periods, helping you recover quickly and protect your margins.' },
  { n:'2', head:'Receiving Non-Negotiable Documents After Shipment', prob:'Late document arrival leads to customs penalties, detention, and demurrage charges of $5,195–$24,190 per week for 2–10 containers.', sol:'Our robust monitoring systems help customers avoid customs penalties 98% of the time.' },
  { n:'3', head:'Buying Without Certificate of Analysis', prob:'Buying offgrade materials without a manufacturer CoA can cause a 118% cash loss and delay production revenue by $57,700–$1.75M.', sol:'Every product comes with a FREE Manufacturer Certificate of Analysis — guaranteed quality, every time.' },
  { n:'4', head:'Wrong Payment Terms', prob:'Buying on DA/DP terms can result in 20–30% financial loss and revenue delays of $57,690–$1.27M.', sol:'We recommend LC payment terms to avoid financial exposure and protect your cash flow.' },
  { n:'5', head:'Missing the Opportunity to Buy at Best Cost', prob:'Delayed procurement of niche materials can cost you $61,000–$2.05M in lost or delayed revenue.', sol:'We help you build a one-year procurement plan — saving up to 17% on buying costs.' },
]

const contactRows = [
  { icon:'📍', title:'Address', val:'FOB51032 Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE' },
  { icon:'📞', title:'Phone',   val:'+971 533 178 176' },
  { icon:'✉️', title:'Email',   val:'krones.international@gmail.com' },
  { icon:'👤', title:'Contact Person', val:'Sujay Menon' },
  { icon:'🏛️', title:'Tax Registration', val:'5027765' },
]

const s = {
  sky:'#0ea5e9', skyDeep:'#0369a1', skyPale:'#f0f9ff',
  black:'#0a0f1a', dark:'#111827', mid:'#374151',
  muted:'#6b7280', border:'#e2e8f0', white:'#ffffff',
}

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('[data-target]')
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0')
      const hasPlus = target >= 50
      let count = 0
      const step = Math.ceil(target / 60)
      const timer = setInterval(() => {
        count = Math.min(count + step, target)
        el.textContent = count + (hasPlus ? '+' : '')
        if (count >= target) clearInterval(timer)
      }, 25)
    })
  }, [])

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      const result = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current)
      console.log('EmailJS success:', result.status, result.text)
      setStatus('success')
      formRef.current.reset()
    } catch (err: any) {
      console.error('EmailJS error:', err?.status, err?.text)
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        .nav-links-desktop { display: flex; }
        .hamburger { display: none !important; }
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu.open { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 60px 20px !important; }
          .hero-right { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .mistakes-row { grid-template-columns: 40px 1fr !important; gap: 16px !important; padding: 20px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-bottom-inner { flex-direction: column !important; text-align: center !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .cta-actions { flex-direction: column !important; align-items: center !important; }
          .hero-actions { flex-direction: column !important; }
          .hero-actions a { text-align: center !important; }
          .topbar-inner { flex-direction: column !important; gap: 4px !important; font-size: 0.75rem !important; text-align: center !important; }
          .logo-name { font-size: 0.95rem !important; }
          .logo-tag { font-size: 0.6rem !important; }
          .section-header { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* TOPBAR */}
      <div style={{background:s.black,color:'#94a3b8',fontSize:'0.8rem',padding:'9px 0',borderBottom:'1px solid rgba(14,165,233,0.2)'}}>
        <div className="topbar-inner" style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'6px'}}>
          <div style={{display:'flex',gap:'16px',alignItems:'center',flexWrap:'wrap' as const}}>
            <span>📞 <a href="tel:+971533178176" style={{color:s.sky,textDecoration:'none'}}>+971 533 178 176</a></span>
            <span style={{color:'#374151'}}>|</span>
            <span>✉ <a href="mailto:krones.international@gmail.com" style={{color:s.sky,textDecoration:'none'}}>krones.international@gmail.com</a></span>
          </div>
          <span style={{fontSize:'0.75rem'}}>FOB51032, Al Hamra Industrial Zone-FZ, RAK, UAE</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{background:s.white,position:'sticky',top:0,zIndex:999,borderBottom:`1px solid ${s.border}`,boxShadow:'0 1px 20px rgba(0,0,0,0.07)'}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'70px'}}>
          <a href="#" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',flexShrink:0}}>
            <div style={{width:'42px',height:'42px',background:`linear-gradient(135deg,${s.sky},${s.skyDeep})`,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond,serif',color:s.white,fontSize:'1.3rem',fontWeight:700,flexShrink:0}}>KI</div>
            <div>
              <div className="logo-name" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.05rem',fontWeight:700,color:s.black,whiteSpace:'nowrap' as const}}>Krones International</div>
              <div className="logo-tag" style={{fontSize:'0.65rem',color:s.skyDeep,fontWeight:500,letterSpacing:'1px',textTransform:'uppercase' as const,whiteSpace:'nowrap' as const}}>Trusted Source for Raw Materials</div>
            </div>
          </a>
          <ul className="nav-links-desktop" style={{listStyle:'none',gap:'2px',alignItems:'center'}}>
            {[['#','Home'],['#about','About Us'],['#products','Products'],['#','Industries']].map(([href,label])=>(
              <li key={label}><a href={href} style={{padding:'8px 14px',borderRadius:'6px',fontSize:'0.87rem',fontWeight:500,color:s.mid,textDecoration:'none'}}>{label}</a></li>
            ))}
            <li><a href="#contact" style={{background:s.sky,color:s.white,padding:'10px 20px',borderRadius:'8px',fontWeight:600,fontSize:'0.86rem',textDecoration:'none'}}>Contact Us</a></li>
          </ul>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',flexDirection:'column' as const,gap:'5px'}}>
            <span style={{width:'24px',height:'2px',background:s.dark,display:'block'}}/>
            <span style={{width:'24px',height:'2px',background:s.dark,display:'block'}}/>
            <span style={{width:'24px',height:'2px',background:s.dark,display:'block'}}/>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen?'open':''}`} style={{flexDirection:'column' as const,background:s.white,borderTop:`1px solid ${s.border}`,padding:'16px 20px',gap:'8px'}}>
          {[['#','Home'],['#about','About Us'],['#products','Products'],['#','Industries'],['#contact','Contact Us']].map(([href,label])=>(
            <a key={label} href={href} onClick={()=>setMenuOpen(false)} style={{padding:'12px 16px',borderRadius:'8px',fontSize:'0.95rem',fontWeight:500,color:s.mid,textDecoration:'none',borderBottom:`1px solid ${s.border}`}}>{label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'90vh',display:'flex',alignItems:'center',background:s.black,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(14,165,233,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.06) 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>
        <div style={{position:'absolute',top:'-200px',right:'-200px',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 70%)'}}/>
        <div className="hero-grid" style={{maxWidth:'1240px',margin:'0 auto',padding:'80px 20px',display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'60px',alignItems:'center',position:'relative',zIndex:2,width:'100%'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(14,165,233,0.12)',border:'1px solid rgba(14,165,233,0.25)',color:s.sky,fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,fontWeight:600,padding:'7px 16px',borderRadius:'30px',marginBottom:'20px'}}>
              <span style={{width:'6px',height:'6px',background:s.sky,borderRadius:'50%',display:'inline-block'}}/>
              UAE Free Zone Registered Company
            </div>
            <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2rem,5vw,3.8rem)',fontWeight:700,color:s.white,lineHeight:1.12,marginBottom:'20px'}}>
              Your Global Access To<br/><span style={{color:s.sky}}>Plastic Raw Material</span><br/>Products &amp; Market
            </h1>
            <p style={{color:'#94a3b8',fontSize:'clamp(0.9rem,2vw,1rem)',lineHeight:1.75,marginBottom:'32px',maxWidth:'500px'}}>
              Krones International is a trusted source for raw materials — connecting buyers and suppliers across 9 countries with quality, reliability, and speed from Ras Al Khaimah, UAE.
            </p>
            <div className="hero-actions" style={{display:'flex',gap:'14px',flexWrap:'wrap' as const}}>
              <a href="#products" style={{background:s.sky,color:s.white,padding:'14px 28px',borderRadius:'8px',fontWeight:600,fontSize:'0.93rem',textDecoration:'none',boxShadow:'0 6px 20px rgba(14,165,233,0.35)'}}>Explore Products</a>
              <a href="#contact" style={{border:'1.5px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.85)',padding:'13px 28px',borderRadius:'8px',fontWeight:500,fontSize:'0.93rem',textDecoration:'none'}}>Connect With Us</a>
            </div>
          </div>
          <div className="hero-right" style={{display:'flex',flexDirection:'column' as const,gap:'14px'}}>
            <div style={{fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:'#4b5563',fontWeight:600}}>Our Product Range</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              {['Polyethylene','Polypropylene','PVC','EVA','Polycarbonate','PET','Carbon Black','Nylon 6','ABS','POM & PBT'].map(p=>(
                <div key={p} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',padding:'12px 14px',display:'flex',alignItems:'center',gap:'10px',color:'#cbd5e1',fontSize:'0.86rem',fontWeight:500}}>
                  <span style={{width:'7px',height:'7px',background:s.sky,borderRadius:'50%',flexShrink:0}}/>
                  {p}
                </div>
              ))}
            </div>
            <div style={{background:'rgba(14,165,233,0.08)',border:'1px solid rgba(14,165,233,0.2)',borderRadius:'10px',padding:'14px 18px',display:'flex',alignItems:'center',gap:'12px',color:'#7dd3fc',fontSize:'0.84rem'}}>
              <span style={{fontSize:'1.4rem'}}>📋</span>
              Certificate of Analysis provided for every product — authenticating quality at every step.
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:`linear-gradient(90deg,${s.skyDeep},${s.sky})`}}>
        <div className="stats-grid" style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px',display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {[['9','Years Experience'],['200','Customers Served'],['9','Countries'],['50','Trusted Suppliers']].map(([n,l],i)=>(
            <div key={l} style={{padding:'28px 16px',textAlign:'center' as const,borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none'}}>
              <div data-target={n} style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.8rem,4vw,2.6rem)',fontWeight:700,color:s.white,lineHeight:1}}>0</div>
              <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.75)',textTransform:'uppercase' as const,letterSpacing:'1px',marginTop:'4px',fontWeight:500}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{padding:'80px 0',background:s.skyPale}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px'}}>
          <div className="about-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px',alignItems:'start'}}>
            <div style={{background:s.black,borderRadius:'16px',padding:'36px',position:'relative',overflow:'hidden'}}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.5rem',color:s.white,marginBottom:'12px',fontWeight:700}}>Global Reach From the UAE</div>
              <div style={{color:s.muted,fontSize:'0.9rem',lineHeight:1.7,marginBottom:'20px'}}>Krones International operates from our free zone office in Ras Al Khaimah — delivering plastic raw materials across 9 countries.</div>
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px'}}>
                {['🇦🇪 UAE','🇮🇳 India','🇨🇳 China','🇺🇸 USA','🇧🇩 Bangladesh','🇰🇷 Korea','🇯🇵 Japan','🇵🇰 Pakistan','🇬🇲 Gambia'].map(c=>(
                  <span key={c} style={{background:'rgba(14,165,233,0.1)',border:'1px solid rgba(14,165,233,0.2)',color:'#7dd3fc',fontSize:'0.78rem',padding:'5px 12px',borderRadius:'20px'}}>{c}</span>
                ))}
              </div>
              <div style={{marginTop:'20px',paddingTop:'18px',borderTop:'1px solid rgba(255,255,255,0.07)',color:'#4b5563',fontSize:'0.82rem',lineHeight:1.8}}>
                <strong style={{color:'#94a3b8',display:'block',marginBottom:'4px'}}>Registered Office</strong>
                FOB51032 Compass Building, Al Shohada Road,<br/>Al Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE
                <strong style={{color:'#94a3b8',display:'block',marginTop:'10px',marginBottom:'4px'}}>Tax Registration No.</strong>5027765
                <strong style={{color:'#94a3b8',display:'block',marginTop:'10px',marginBottom:'4px'}}>Contact</strong>
                Sujay Menon — <a href="tel:+971533178176" style={{color:s.sky}}>+971 533 178 176</a>
              </div>
            </div>
            <div>
              <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>About Krones International</div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',color:s.black,lineHeight:1.2,marginBottom:'14px',fontWeight:700}}>Trusted Source for Raw Materials</h2>
              <p style={{color:s.muted,lineHeight:1.8,fontSize:'0.95rem',marginBottom:'14px'}}>We are a leading supplier of plastic raw materials and carbon black operating from our UAE free zone base. Every product we supply comes with a Manufacturer Certificate of Analysis.</p>
              <p style={{color:s.muted,lineHeight:1.8,fontSize:'0.95rem',marginBottom:'14px'}}>We believe in offering solutions — not just promises. Our monitoring systems ensure on-time clearance 98% of the time.</p>
              <ul style={{listStyle:'none',marginTop:'20px',display:'flex',flexDirection:'column' as const,gap:'11px'}}>
                {['Quick Dispatch Process','Premium Quality Offgrades','Wide Range of Product Solutions','Certificate of Analysis with every product','Save up to 17% on procurement costs'].map(item=>(
                  <li key={item} style={{display:'flex',gap:'12px',alignItems:'flex-start',fontSize:'0.92rem',color:s.mid}}>
                    <div style={{width:'22px',height:'22px',background:s.sky,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'0.7rem',flexShrink:0,marginTop:'1px'}}>✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{padding:'80px 0',background:s.white}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px'}}>
          <div className="section-header" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'40px',flexWrap:'wrap' as const,gap:'16px'}}>
            <div>
              <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Our Portfolio</div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',color:s.black,fontWeight:700,marginBottom:'8px'}}>We Provide Plastic Raw Material</h2>
              <p style={{color:s.muted,fontSize:'0.95rem'}}>Premium quality materials sourced from certified manufacturers worldwide.</p>
            </div>
            <a href="#contact" style={{background:s.sky,color:s.white,padding:'12px 24px',borderRadius:'8px',fontWeight:600,fontSize:'0.9rem',textDecoration:'none',whiteSpace:'nowrap' as const}}>Request a Quote</a>
          </div>
          <div className="products-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'20px'}}>
            {products.map(p=>(
              <div key={p.name} style={{background:s.white,borderRadius:'14px',overflow:'hidden',border:`1px solid ${s.border}`}}>
                <div style={{height:'180px',overflow:'hidden',position:'relative'}}>
                  <img src={p.img} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}} crossOrigin="anonymous"/>
                </div>
                <div style={{padding:'20px'}}>
                  <div style={{fontWeight:700,fontSize:'1rem',color:s.black,marginBottom:'8px'}}>{p.name}</div>
                  <div style={{color:s.muted,fontSize:'0.84rem',lineHeight:1.65,marginBottom:'14px'}}>{p.desc}</div>
                  <a href="#contact" style={{fontSize:'0.83rem',fontWeight:600,color:s.skyDeep,textDecoration:'none'}}>Enquire Now →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section style={{padding:'80px 0',background:s.black}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px'}}>
          <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Buyer Awareness</div>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',color:s.white,fontWeight:700,marginBottom:'12px'}}>5 Costly Mistakes Buyers Make</h2>
          <p style={{color:'#4b5563',fontSize:'0.95rem',marginBottom:'40px'}}>Avoid these pitfalls — Krones International helps you navigate every risk.</p>
          <div style={{display:'flex',flexDirection:'column' as const,gap:'14px'}}>
            {mistakes.map(m=>(
              <div className="mistakes-row" key={m.n} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'24px 28px',display:'grid',gridTemplateColumns:'52px 1fr',gap:'20px',alignItems:'start'}}>
                <div style={{width:'44px',height:'44px',background:`linear-gradient(135deg,${s.sky},${s.skyDeep})`,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond,serif',fontSize:'1.2rem',fontWeight:700,color:s.white}}>{m.n}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:'0.96rem',color:'#e2e8f0',marginBottom:'6px'}}>{m.head}</div>
                  <div style={{color:'#4b5563',fontSize:'0.85rem',lineHeight:1.65,marginBottom:'8px'}}><strong style={{color:'#6b7280'}}>Problem: </strong>{m.prob}</div>
                  <div style={{background:'rgba(14,165,233,0.08)',borderLeft:`3px solid ${s.sky}`,padding:'10px 14px',borderRadius:'0 8px 8px 0',color:'#7dd3fc',fontSize:'0.84rem',lineHeight:1.6}}><strong style={{color:'#bae6fd'}}>Krones Solution: </strong>{m.sol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{background:'linear-gradient(135deg,#0a0f1a,#0c1a2e)',padding:'72px 0',textAlign:'center' as const,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-100px',left:'50%',transform:'translateX(-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%)'}}/>
        <div style={{position:'relative',zIndex:1,padding:'0 20px'}}>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.8rem,3.5vw,2.8rem)',color:s.white,marginBottom:'14px'}}>Ready to Source Smarter?</h2>
          <p style={{color:s.muted,fontSize:'0.97rem',maxWidth:'500px',margin:'0 auto 32px'}}>Connect with our experts and discover how Krones International can save you up to 17% on procurement.</p>
          <div className="cta-actions" style={{display:'flex',justifyContent:'center',gap:'14px',flexWrap:'wrap' as const}}>
            <a href="#contact" style={{background:s.sky,color:s.white,padding:'14px 28px',borderRadius:'8px',fontWeight:600,fontSize:'0.93rem',textDecoration:'none',boxShadow:'0 6px 20px rgba(14,165,233,0.35)'}}>Connect With Our Experts</a>
            <a href="mailto:krones.international@gmail.com" style={{border:'1.5px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.85)',padding:'13px 28px',borderRadius:'8px',fontWeight:500,fontSize:'0.93rem',textDecoration:'none'}}>Send Us an Email</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:'80px 0',background:s.white}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px'}}>
          <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:'56px',alignItems:'start'}}>
            <div>
              <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Get In Touch</div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',color:s.black,fontWeight:700,marginBottom:'14px'}}>Contact Krones International</h2>
              <p style={{color:s.muted,marginBottom:'32px'}}>Reach out for product enquiries, pricing, or shipping guidance. We respond within 24 hours.</p>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'18px'}}>
                {contactRows.map(r=>(
                  <div key={r.title} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                    <div style={{width:'42px',height:'42px',borderRadius:'10px',background:s.skyPale,border:'1px solid rgba(14,165,233,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>{r.icon}</div>
                    <div>
                      <div style={{fontSize:'0.75rem',textTransform:'uppercase' as const,letterSpacing:'1.5px',color:s.sky,fontWeight:600,marginBottom:'3px'}}>{r.title}</div>
                      <div style={{color:s.mid,fontSize:'0.88rem',lineHeight:1.6}}>{r.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:s.skyPale,borderRadius:'16px',padding:'32px',border:'1px solid rgba(14,165,233,0.15)'}}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.4rem',color:s.black,marginBottom:'6px',fontWeight:700}}>Send an Enquiry</div>
              <div style={{color:s.muted,fontSize:'0.86rem',marginBottom:'22px'}}>Fill in the form and Sujay will get back to you shortly.</div>
              <form ref={formRef} onSubmit={sendEmail}>
                <div className="form-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
                  <div style={{display:'flex',flexDirection:'column' as const,gap:'5px'}}>
                    <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>First Name</label>
                    <input name="first_name" type="text" placeholder="John" required style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none'}}/>
                  </div>
                  <div style={{display:'flex',flexDirection:'column' as const,gap:'5px'}}>
                    <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>Last Name</label>
                    <input name="last_name" type="text" placeholder="Smith" required style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none'}}/>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'5px',marginBottom:'12px'}}>
                  <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>Full Name (for email)</label>
                  <input name="from_name" type="text" placeholder="John Smith" required style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none'}}/>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'5px',marginBottom:'12px'}}>
                  <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>Email Address</label>
                  <input name="from_email" type="email" placeholder="john@company.com" required style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none'}}/>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'5px',marginBottom:'12px'}}>
                  <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>Company</label>
                  <input name="company" type="text" placeholder="Your company name" style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none'}}/>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'5px',marginBottom:'12px'}}>
                  <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>Product of Interest</label>
                  <select name="product" style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none',background:s.white}}>
                    <option>Select a product...</option>
                    {['Polyethylene','Polypropylene','PVC','EVA','Polycarbonate','PET','POM','Carbon Black','Nylon 6','ABS','PBT','Other'].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'5px',marginBottom:'18px'}}>
                  <label style={{fontSize:'0.78rem',fontWeight:600,color:s.mid}}>Message</label>
                  <textarea name="message" rows={4} placeholder="Describe your requirements and quantities..." style={{padding:'10px 13px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.87rem',outline:'none',resize:'none'}}/>
                </div>
                <button type="submit" disabled={status==='sending'} style={{width:'100%',background:status==='success'?'#16a34a':status==='error'?'#dc2626':s.sky,color:s.white,border:'none',padding:'13px',borderRadius:'8px',fontFamily:'Outfit,sans-serif',fontSize:'0.93rem',fontWeight:600,cursor:'pointer',transition:'background 0.2s'}}>
                  {status==='idle' && 'Send Enquiry →'}
                  {status==='sending' && 'Sending...'}
                  {status==='success' && '✓ Enquiry Sent! Sujay will respond within 24hrs'}
                  {status==='error' && '❌ Failed — please email us directly'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:s.black,color:'#4b5563',padding:'56px 0 0'}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 20px'}}>
          <div className="footer-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1.5fr',gap:'40px'}}>
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'42px',height:'42px',background:`linear-gradient(135deg,${s.sky},${s.skyDeep})`,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond,serif',color:s.white,fontSize:'1.3rem',fontWeight:700}}>KI</div>
                <div>
                  <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.05rem',fontWeight:700,color:s.white}}>Krones International</div>
                  <div style={{fontSize:'0.65rem',color:s.skyDeep,fontWeight:500,letterSpacing:'1px',textTransform:'uppercase' as const}}>Raw Materials Trading FZ LLC</div>
                </div>
              </div>
              <p style={{fontSize:'0.85rem',lineHeight:1.8,marginTop:'14px',color:s.mid}}>A trusted global source for plastic raw materials, operating from Ras Al Khaimah Free Zone, UAE.</p>
              <span style={{display:'inline-block',marginTop:'12px',background:'rgba(14,165,233,0.1)',border:'1px solid rgba(14,165,233,0.2)',color:s.sky,fontSize:'0.73rem',padding:'5px 12px',borderRadius:'20px'}}>"Trusted Source for Raw Materials"</span>
              <div style={{marginTop:'8px'}}><span style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',color:s.mid,fontSize:'0.73rem',padding:'4px 12px',borderRadius:'20px',display:'inline-block'}}>Tax Reg. No: 5027765</span></div>
            </div>
            <div>
              <div style={{fontSize:'0.73rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'16px'}}>Quick Links</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'9px'}}>
                {['Home','About Us','Industries','Contact Us','Disclaimer','Privacy Policy'].map(l=>(
                  <li key={l}><a href="#" style={{color:s.mid,fontSize:'0.85rem',textDecoration:'none'}}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{fontSize:'0.73rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'16px'}}>Our Products</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'9px'}}>
                {['Polyethylene','Polypropylene','PVC','EVA','Polycarbonate','PET & POM','Carbon Black','Nylon 6 · ABS · PBT'].map(l=>(
                  <li key={l}><a href="#" style={{color:s.mid,fontSize:'0.85rem',textDecoration:'none'}}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{fontSize:'0.73rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'16px'}}>Contact Us</div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginBottom:'20px'}}>
                {[{icon:'📍',val:'FOB51032 Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE'},{icon:'📞',val:'+971 533 178 176'},{icon:'✉️',val:'krones.international@gmail.com'},{icon:'👤',val:'Sujay Menon'}].map(r=>(
                  <div key={r.icon} style={{display:'flex',gap:'10px',fontSize:'0.83rem',color:s.mid,lineHeight:1.5}}>
                    <span style={{color:s.sky,flexShrink:0}}>{r.icon}</span><span>{r.val}</span>
                  </div>
                ))}
              </div>
              <div style={{fontSize:'0.73rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'10px'}}>Newsletter</div>
              <div style={{display:'flex',gap:'8px'}}>
                <input type="email" placeholder="your@email.com" style={{flex:1,padding:'9px 12px',borderRadius:'7px',border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.05)',color:s.white,fontFamily:'Outfit,sans-serif',fontSize:'0.83rem',outline:'none'}}/>
                <button style={{background:s.sky,color:s.white,border:'none',padding:'9px 14px',borderRadius:'7px',fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:'0.81rem',cursor:'pointer',whiteSpace:'nowrap' as const}}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-inner" style={{borderTop:'1px solid rgba(255,255,255,0.05)',marginTop:'48px',padding:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'0.78rem',color:'#1f2937',flexWrap:'wrap' as const,gap:'10px',maxWidth:'1240px',margin:'48px auto 0'}}>
          <span>© 2024 Krones International Raw Materials Trading FZ LLC. All Rights Reserved.</span>
          <span><a href="#" style={{color:s.sky,textDecoration:'none'}}>Privacy Policy</a> · <a href="#" style={{color:s.sky,textDecoration:'none'}}>Disclaimer</a></span>
        </div>
      </footer>
    </>
  )
}