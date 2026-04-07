'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'service_r30d4ua'
const EMAILJS_TEMPLATE_ID = 'template_5pn8b7d'
const EMAILJS_PUBLIC_KEY  = 's9bzBaRtEktfBRtF6'
const IMAGES = {
  pvc:          'https://uniglobustrading.com/wp-content/uploads/2021/11/PVC-powder.jpg',
  polypropylene:'https://uniglobustrading.com/wp-content/uploads/2021/11/polypropylene.jpg',
  eva:          'https://uniglobustrading.com/wp-content/uploads/2021/11/EVA.jpg',
  polyethylene: 'https://uniglobustrading.com/wp-content/uploads/2021/11/polyethylene.jpg',
  polycarbonate:'https://uniglobustrading.com/wp-content/uploads/2021/11/polycarbonate.jpg',
  carbonBlack:  'https://uniglobustrading.com/wp-content/uploads/2021/11/carbon-black.jpg',
  pet:          'https://uniglobustrading.com/wp-content/uploads/2021/11/PET.jpg',
  nylon6:       'https://uniglobustrading.com/wp-content/uploads/2021/11/nylon6.jpg',
  abs:          'https://uniglobustrading.com/wp-content/uploads/2021/11/ABS.jpg',
  pom:          'https://uniglobustrading.com/wp-content/uploads/2021/11/POM.jpg',
  pbt:          'https://uniglobustrading.com/wp-content/uploads/2021/11/pbt-1.jpg',
  apar:         'https://uniglobustrading.com/wp-content/uploads/2021/03/apar.jpg',
  superbond:    'https://uniglobustrading.com/wp-content/uploads/2021/12/super-bond-adhesives.jpg',
  kalpana:      'https://uniglobustrading.com/wp-content/uploads/2021/03/kalpana.jpg',
  scj:          'https://uniglobustrading.com/wp-content/uploads/2021/03/scj.jpg',
  ravago:       'https://uniglobustrading.com/wp-content/uploads/2021/03/Ravago-india.jpg',
  avon:         'https://uniglobustrading.com/wp-content/uploads/2021/12/avon.jpg',
  aquent:       'https://uniglobustrading.com/wp-content/uploads/2021/12/aquent.jpg',
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

const clients = [
  { img: IMAGES.apar,      name: 'APAR Industries' },
  { img: IMAGES.superbond, name: 'Super Bond Adhesives' },
  { img: IMAGES.kalpana,   name: 'Kalpana Industries' },
  { img: IMAGES.scj,       name: 'SCJ Plastics' },
  { img: IMAGES.ravago,    name: 'Ravago India' },
  { img: IMAGES.avon,      name: 'Avon Group' },
  { img: IMAGES.aquent,    name: 'Aquent' },
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

  // Init EmailJS
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  // Counter animation
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

  // Combine first + last name into from_name automatically
  const formData = new FormData(formRef.current)
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string

  // Add from_name hidden input dynamically
  let hiddenInput = formRef.current.querySelector<HTMLInputElement>('input[name="from_name"]')
  if (!hiddenInput) {
    hiddenInput = document.createElement('input')
    hiddenInput.type = 'hidden'
    hiddenInput.name = 'from_name'
    formRef.current.appendChild(hiddenInput)
  }
  hiddenInput.value = `${firstName} ${lastName}`

  try {
    const result = await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current
    )
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
      {/* ── TOPBAR ── */}
      <div style={{background:s.black,color:'#94a3b8',fontSize:'0.8rem',padding:'9px 0',borderBottom:'1px solid rgba(14,165,233,0.2)'}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'6px'}}>
          <div style={{display:'flex',gap:'20px',alignItems:'center',flexWrap:'wrap' as const}}>
            <span>📞 <a href="tel:+971533178176" style={{color:s.sky,textDecoration:'none'}}>+971 533 178 176</a></span>
            <span style={{color:'#374151'}}>|</span>
            <span>✉ <a href="mailto:krones.international@gmail.com" style={{color:s.sky,textDecoration:'none'}}>krones.international@gmail.com</a></span>
          </div>
          <span>FOB51032 Compass Building, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE</span>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{background:s.white,position:'sticky',top:0,zIndex:999,borderBottom:`1px solid ${s.border}`,boxShadow:'0 1px 20px rgba(0,0,0,0.07)'}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'76px',gap:'32px'}}>
          <a href="#" style={{display:'flex',alignItems:'center',gap:'13px',textDecoration:'none'}}>
            <div style={{width:'46px',height:'46px',background:`linear-gradient(135deg,${s.sky} 0%,${s.skyDeep} 100%)`,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond,serif',color:s.white,fontSize:'1.5rem',fontWeight:700,boxShadow:'0 4px 14px rgba(14,165,233,0.35)'}}>KI</div>
            <div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.15rem',fontWeight:700,color:s.black}}>Krones International</div>
              <div style={{fontSize:'0.68rem',color:s.skyDeep,fontWeight:500,letterSpacing:'1.2px',textTransform:'uppercase' as const}}>Trusted Source for Raw Materials</div>
            </div>
          </a>
          <ul style={{display:'flex',listStyle:'none',gap:'2px',alignItems:'center'}}>
            {[['#','Home'],['#about','About Us'],['#products','Products'],['#','Industries']].map(([href,label])=>(
              <li key={label}><a href={href} style={{padding:'8px 15px',borderRadius:'6px',fontSize:'0.87rem',fontWeight:500,color:s.mid,textDecoration:'none'}}>{label}</a></li>
            ))}
            <li><a href="#contact" style={{background:s.sky,color:s.white,padding:'10px 22px',borderRadius:'8px',fontWeight:600,fontSize:'0.86rem',textDecoration:'none',boxShadow:'0 4px 14px rgba(14,165,233,0.3)'}}>Contact Us</a></li>
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{minHeight:'90vh',display:'flex',alignItems:'center',background:s.black,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(14,165,233,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.06) 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>
        <div style={{position:'absolute',top:'-200px',right:'-200px',width:'700px',height:'700px',borderRadius:'50%',background:'radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 70%)'}}/>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'100px 28px',display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'80px',alignItems:'center',position:'relative',zIndex:2,width:'100%'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(14,165,233,0.12)',border:'1px solid rgba(14,165,233,0.25)',color:s.sky,fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,fontWeight:600,padding:'7px 16px',borderRadius:'30px',marginBottom:'24px'}}>
              <span style={{width:'6px',height:'6px',background:s.sky,borderRadius:'50%',display:'inline-block'}}/>
              UAE Free Zone Registered Company
            </div>
            <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.4rem,4.5vw,3.8rem)',fontWeight:700,color:s.white,lineHeight:1.12,marginBottom:'22px'}}>
              Your Global Access To<br/><span style={{color:s.sky}}>Plastic Raw Material</span><br/>Products &amp; Market
            </h1>
            <p style={{color:'#94a3b8',fontSize:'1rem',lineHeight:1.75,marginBottom:'38px',maxWidth:'500px'}}>
              Krones International is a trusted source for raw materials — connecting buyers and suppliers across 9 countries with quality, reliability, and speed from Ras Al Khaimah, UAE.
            </p>
            <div style={{display:'flex',gap:'14px',flexWrap:'wrap' as const}}>
              <a href="#products" style={{background:s.sky,color:s.white,padding:'14px 30px',borderRadius:'8px',fontWeight:600,fontSize:'0.93rem',textDecoration:'none',boxShadow:'0 6px 20px rgba(14,165,233,0.35)'}}>Explore Products</a>
              <a href="#contact" style={{border:'1.5px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.85)',padding:'13px 28px',borderRadius:'8px',fontWeight:500,fontSize:'0.93rem',textDecoration:'none'}}>Connect With Us</a>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column' as const,gap:'14px'}}>
            <div style={{fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:'#4b5563',fontWeight:600}}>Our Product Range</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              {['Polyethylene','Polypropylene','PVC','EVA','Polycarbonate','PET','Carbon Black','Nylon 6','ABS','POM & PBT'].map(p=>(
                <div key={p} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',padding:'13px 15px',display:'flex',alignItems:'center',gap:'10px',color:'#cbd5e1',fontSize:'0.86rem',fontWeight:500}}>
                  <span style={{width:'7px',height:'7px',background:s.sky,borderRadius:'50%',flexShrink:0}}/>
                  {p}
                </div>
              ))}
            </div>
            <div style={{background:'rgba(14,165,233,0.08)',border:'1px solid rgba(14,165,233,0.2)',borderRadius:'10px',padding:'14px 18px',display:'flex',alignItems:'center',gap:'12px',color:'#7dd3fc',fontSize:'0.84rem'}}>
              <span style={{fontSize:'1.6rem'}}>📋</span>
              Certificate of Analysis provided for every product — authenticating quality at every step.
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{background:`linear-gradient(90deg,${s.skyDeep} 0%,${s.sky} 100%)`}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px',display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {[['9','Years Experience'],['200','Customers Served'],['9','Countries'],['50','Trusted Suppliers']].map(([n,l],i)=>(
            <div key={l} style={{padding:'30px 24px',textAlign:'center' as const,borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none'}}>
              <div data-target={n} style={{fontFamily:'Cormorant Garamond,serif',fontSize:'2.6rem',fontWeight:700,color:s.white,lineHeight:1}}>0</div>
              <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.75)',textTransform:'uppercase' as const,letterSpacing:'1px',marginTop:'4px',fontWeight:500}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:'88px 0',background:s.skyPale}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>
          <div style={{background:s.black,borderRadius:'16px',padding:'40px',position:'relative',overflow:'hidden'}}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.6rem',color:s.white,marginBottom:'12px',fontWeight:700}}>Global Reach From the UAE</div>
            <div style={{color:s.muted,fontSize:'0.9rem',lineHeight:1.7,marginBottom:'24px'}}>Krones International operates from our free zone office in Ras Al Khaimah — delivering plastic raw materials across 9 countries with precision and reliability.</div>
            <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px'}}>
              {['🇦🇪 UAE','🇮🇳 India','🇨🇳 China','🇺🇸 USA','🇧🇩 Bangladesh','🇰🇷 Korea','🇯🇵 Japan','🇵🇰 Pakistan','🇬🇲 Gambia'].map(c=>(
                <span key={c} style={{background:'rgba(14,165,233,0.1)',border:'1px solid rgba(14,165,233,0.2)',color:'#7dd3fc',fontSize:'0.78rem',padding:'5px 12px',borderRadius:'20px'}}>{c}</span>
              ))}
            </div>
            <div style={{marginTop:'24px',paddingTop:'20px',borderTop:'1px solid rgba(255,255,255,0.07)',color:'#4b5563',fontSize:'0.83rem',lineHeight:1.8}}>
              <strong style={{color:'#94a3b8',display:'block',marginBottom:'4px'}}>Registered Office</strong>
              FOB51032 Compass Building, Al Shohada Road,<br/>Al Hamra Industrial Zone-FZ,<br/>Ras Al Khaimah, United Arab Emirates
              <strong style={{color:'#94a3b8',display:'block',marginTop:'10px',marginBottom:'4px'}}>Tax Registration No.</strong>5027765
              <strong style={{color:'#94a3b8',display:'block',marginTop:'10px',marginBottom:'4px'}}>Contact</strong>
              Sujay Menon — <a href="tel:+971533178176" style={{color:s.sky}}>+971 533 178 176</a>
            </div>
          </div>
          <div>
            <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>About Krones International</div>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.9rem,3vw,2.6rem)',color:s.black,lineHeight:1.2,marginBottom:'14px',fontWeight:700}}>Trusted Source for Raw Materials</h2>
            <p style={{color:s.muted,lineHeight:1.8,fontSize:'0.96rem',marginBottom:'16px'}}>We are a leading supplier of plastic raw materials and carbon black operating from our UAE free zone base. Every product we supply comes with a Manufacturer Certificate of Analysis.</p>
            <p style={{color:s.muted,lineHeight:1.8,fontSize:'0.96rem',marginBottom:'16px'}}>We believe in offering solutions — not just promises. Our monitoring systems ensure on-time clearance 98% of the time.</p>
            <ul style={{listStyle:'none',marginTop:'24px',display:'flex',flexDirection:'column' as const,gap:'12px'}}>
              {['Quick Dispatch Process','Premium Quality Offgrades','Wide Range of Product Solutions','Certificate of Analysis with every product','Save up to 17% on procurement costs'].map(item=>(
                <li key={item} style={{display:'flex',gap:'12px',alignItems:'flex-start',fontSize:'0.92rem',color:s.mid}}>
                  <div style={{width:'22px',height:'22px',background:s.sky,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'0.7rem',flexShrink:0,marginTop:'1px'}}>✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{padding:'88px 0',background:s.white}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'48px',flexWrap:'wrap' as const,gap:'16px'}}>
            <div>
              <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Our Portfolio</div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.9rem,3vw,2.6rem)',color:s.black,fontWeight:700,marginBottom:'8px'}}>We Provide Plastic Raw Material</h2>
              <p style={{color:s.muted,fontSize:'0.97rem'}}>Premium quality materials sourced from certified manufacturers worldwide.</p>
            </div>
            <a href="#contact" style={{background:s.sky,color:s.white,padding:'14px 30px',borderRadius:'8px',fontWeight:600,fontSize:'0.93rem',textDecoration:'none',whiteSpace:'nowrap' as const}}>Request a Quote</a>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:'22px'}}>
            {products.map(p=>(
              <div key={p.name} style={{background:s.white,borderRadius:'14px',overflow:'hidden',border:`1px solid ${s.border}`}}>
                <div style={{height:'180px',position:'relative',overflow:'hidden'}}>
                  <Image src={p.img} alt={p.name} fill style={{objectFit:'cover'}} unoptimized/>
                </div>
                <div style={{padding:'22px'}}>
                  <div style={{fontWeight:700,fontSize:'1rem',color:s.black,marginBottom:'8px'}}>{p.name}</div>
                  <div style={{color:s.muted,fontSize:'0.84rem',lineHeight:1.65,marginBottom:'14px'}}>{p.desc}</div>
                  <a href="#contact" style={{fontSize:'0.83rem',fontWeight:600,color:s.skyDeep,textDecoration:'none'}}>Enquire Now →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section style={{padding:'88px 0',background:s.black}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px'}}>
          <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Buyer Awareness</div>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.9rem,3vw,2.6rem)',color:s.white,fontWeight:700,marginBottom:'14px'}}>5 Costly Mistakes Buyers Make</h2>
          <p style={{color:'#4b5563',fontSize:'0.97rem',marginBottom:'48px'}}>Avoid these pitfalls — Krones International helps you navigate every risk.</p>
          <div style={{display:'flex',flexDirection:'column' as const,gap:'16px'}}>
            {mistakes.map(m=>(
              <div key={m.n} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'28px 32px',display:'grid',gridTemplateColumns:'56px 1fr',gap:'24px',alignItems:'start'}}>
                <div style={{width:'48px',height:'48px',background:`linear-gradient(135deg,${s.sky} 0%,${s.skyDeep} 100%)`,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond,serif',fontSize:'1.3rem',fontWeight:700,color:s.white}}>{m.n}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:'0.98rem',color:'#e2e8f0',marginBottom:'7px'}}>{m.head}</div>
                  <div style={{color:'#4b5563',fontSize:'0.86rem',lineHeight:1.65,marginBottom:'10px'}}><strong style={{color:'#6b7280'}}>Problem: </strong>{m.prob}</div>
                  <div style={{background:'rgba(14,165,233,0.08)',borderLeft:`3px solid ${s.sky}`,padding:'10px 15px',borderRadius:'0 8px 8px 0',color:'#7dd3fc',fontSize:'0.84rem',lineHeight:1.6}}><strong style={{color:'#bae6fd'}}>Krones Solution: </strong>{m.sol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section style={{padding:'88px 0',background:s.skyPale}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px'}}>
          <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Our Network</div>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.9rem,3vw,2.6rem)',color:s.black,fontWeight:700,marginBottom:'14px'}}>Our Prestigious Clients</h2>
          <p style={{color:s.muted,marginBottom:'40px'}}>Trusted by manufacturers, traders, and industrial groups across the globe.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'14px'}}>
            {clients.map(c=>(
              <div key={c.name} style={{background:s.white,border:`1px solid ${s.border}`,borderRadius:'10px',height:'90px',display:'flex',alignItems:'center',justifyContent:'center',padding:'12px',overflow:'hidden',position:'relative'}}>
                <Image src={c.img} alt={c.name} fill style={{objectFit:'contain',padding:'8px'}} unoptimized/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{background:'linear-gradient(135deg,#0a0f1a 0%,#0c1a2e 100%)',padding:'80px 0',textAlign:'center' as const,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-100px',left:'50%',transform:'translateX(-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%)'}}/>
        <div style={{position:'relative',zIndex:1,padding:'0 28px'}}>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2rem,3.5vw,2.8rem)',color:s.white,marginBottom:'14px'}}>Ready to Source Smarter?</h2>
          <p style={{color:s.muted,fontSize:'0.97rem',maxWidth:'500px',margin:'0 auto 36px'}}>Connect with our experts and discover how Krones International can save you up to 17% on procurement.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'14px',flexWrap:'wrap' as const}}>
            <a href="#contact" style={{background:s.sky,color:s.white,padding:'14px 30px',borderRadius:'8px',fontWeight:600,fontSize:'0.93rem',textDecoration:'none',boxShadow:'0 6px 20px rgba(14,165,233,0.35)'}}>Connect With Our Experts</a>
            <a href="mailto:krones.international@gmail.com" style={{border:'1.5px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.85)',padding:'13px 28px',borderRadius:'8px',fontWeight:500,fontSize:'0.93rem',textDecoration:'none'}}>Send Us an Email</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:'88px 0',background:s.white}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px',display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:'64px',alignItems:'start'}}>
          <div>
            <div style={{fontSize:'0.75rem',letterSpacing:'2.5px',textTransform:'uppercase' as const,color:s.sky,fontWeight:600,marginBottom:'10px'}}>Get In Touch</div>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(1.9rem,3vw,2.6rem)',color:s.black,fontWeight:700,marginBottom:'14px'}}>Contact Krones International</h2>
            <p style={{color:s.muted,marginBottom:'36px'}}>Reach out for product enquiries, pricing, or shipping guidance. We respond within 24 hours.</p>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'20px'}}>
              {contactRows.map(r=>(
                <div key={r.title} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'10px',background:s.skyPale,border:'1px solid rgba(14,165,233,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>{r.icon}</div>
                  <div>
                    <div style={{fontSize:'0.75rem',textTransform:'uppercase' as const,letterSpacing:'1.5px',color:s.sky,fontWeight:600,marginBottom:'3px'}}>{r.title}</div>
                    <div style={{color:s.mid,fontSize:'0.9rem',lineHeight:1.6}}>{r.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div style={{background:s.skyPale,borderRadius:'16px',padding:'36px',border:'1px solid rgba(14,165,233,0.15)'}}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.5rem',color:s.black,marginBottom:'6px',fontWeight:700}}>Send an Enquiry</div>
            <div style={{color:s.muted,fontSize:'0.86rem',marginBottom:'24px'}}>Fill in the form and Sujay will get back to you shortly.</div>
            <form ref={formRef} onSubmit={sendEmail}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'6px'}}>
                  <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>First Name</label>
                  <input name="first_name" type="text" placeholder="John" required style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none'}}/>
                </div>
                <div style={{display:'flex',flexDirection:'column' as const,gap:'6px'}}>
                  <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>Last Name</label>
                  <input name="last_name" type="text" placeholder="Smith" required style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none'}}/>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'6px',marginBottom:'14px'}}>
                <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>Full Name (for email)</label>
                <input name="from_name" type="text" placeholder="John Smith" required style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none'}}/>
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'6px',marginBottom:'14px'}}>
                <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>Email Address</label>
                <input name="from_email" type="email" placeholder="john@company.com" required style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none'}}/>
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'6px',marginBottom:'14px'}}>
                <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>Company</label>
                <input name="company" type="text" placeholder="Your company name" style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none'}}/>
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'6px',marginBottom:'14px'}}>
                <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>Product of Interest</label>
                <select name="product" style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none',background:s.white}}>
                  <option>Select a product...</option>
                  {['Polyethylene','Polypropylene','PVC','EVA','Polycarbonate','PET','POM','Carbon Black','Nylon 6','ABS','PBT','Other'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'6px',marginBottom:'20px'}}>
                <label style={{fontSize:'0.8rem',fontWeight:600,color:s.mid}}>Message</label>
                <textarea name="message" rows={4} placeholder="Describe your requirements and quantities..." style={{padding:'11px 14px',borderRadius:'8px',border:`1px solid ${s.border}`,fontFamily:'Outfit,sans-serif',fontSize:'0.88rem',outline:'none',resize:'none'}}/>
              </div>
              <button type="submit" disabled={status==='sending'} style={{width:'100%',background:status==='success'?'#16a34a':status==='error'?'#dc2626':s.sky,color:s.white,border:'none',padding:'13px',borderRadius:'8px',fontFamily:'Outfit,sans-serif',fontSize:'0.93rem',fontWeight:600,cursor:'pointer',boxShadow:'0 4px 14px rgba(14,165,233,0.3)',transition:'background 0.2s'}}>
                {status==='idle'    && 'Send Enquiry →'}
                {status==='sending' && 'Sending...'}
                {status==='success' && '✓ Enquiry Sent! Sujay will respond within 24hrs'}
                {status==='error'   && '❌ Failed — please email us directly'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:s.black,color:'#4b5563',padding:'64px 0 0'}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',padding:'0 28px',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1.5fr',gap:'48px'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'13px'}}>
              <div style={{width:'46px',height:'46px',background:`linear-gradient(135deg,${s.sky},${s.skyDeep})`,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond,serif',color:s.white,fontSize:'1.5rem',fontWeight:700}}>KI</div>
              <div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.15rem',fontWeight:700,color:s.white}}>Krones International</div>
                <div style={{fontSize:'0.68rem',color:s.skyDeep,fontWeight:500,letterSpacing:'1.2px',textTransform:'uppercase' as const}}>Raw Materials Trading FZ LLC</div>
              </div>
            </div>
            <p style={{fontSize:'0.86rem',lineHeight:1.8,marginTop:'14px',color:s.mid}}>A trusted global source for plastic raw materials and carbon black, operating from Ras Al Khaimah Free Zone, UAE.</p>
            <span style={{display:'inline-block',marginTop:'14px',background:'rgba(14,165,233,0.1)',border:'1px solid rgba(14,165,233,0.2)',color:s.sky,fontSize:'0.75rem',letterSpacing:'1px',padding:'5px 12px',borderRadius:'20px'}}>"Trusted Source for Raw Materials"</span>
            <div style={{marginTop:'10px'}}><span style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',color:s.mid,fontSize:'0.76rem',padding:'4px 12px',borderRadius:'20px',display:'inline-block'}}>Tax Reg. No: 5027765</span></div>
          </div>
          <div>
            <div style={{fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'18px'}}>Quick Links</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'9px'}}>
              {['Home','About Us','Industries','Contact Us','Disclaimer','Privacy Policy'].map(l=>(
                <li key={l}><a href="#" style={{color:s.mid,fontSize:'0.86rem',textDecoration:'none'}}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'18px'}}>Our Products</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'9px'}}>
              {['Polyethylene','Polypropylene','PVC','EVA','Polycarbonate','PET & POM','Carbon Black','Nylon 6 · ABS · PBT'].map(l=>(
                <li key={l}><a href="#" style={{color:s.mid,fontSize:'0.86rem',textDecoration:'none'}}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'18px'}}>Contact Us</div>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'13px',marginBottom:'24px'}}>
              {[{icon:'📍',val:'FOB51032 Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE'},{icon:'📞',val:'+971 533 178 176'},{icon:'✉️',val:'krones.international@gmail.com'},{icon:'👤',val:'Sujay Menon'}].map(r=>(
                <div key={r.icon} style={{display:'flex',gap:'10px',fontSize:'0.84rem',color:s.mid,lineHeight:1.5}}>
                  <span style={{color:s.sky,flexShrink:0}}>{r.icon}</span><span>{r.val}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase' as const,color:s.muted,fontWeight:600,marginBottom:'10px'}}>Newsletter</div>
            <div style={{display:'flex',gap:'8px'}}>
              <input type="email" placeholder="your@email.com" style={{flex:1,padding:'10px 13px',borderRadius:'7px',border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.05)',color:s.white,fontFamily:'Outfit,sans-serif',fontSize:'0.84rem',outline:'none'}}/>
              <button style={{background:s.sky,color:s.white,border:'none',padding:'10px 16px',borderRadius:'7px',fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:'0.82rem',cursor:'pointer',whiteSpace:'nowrap' as const}}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',marginTop:'56px',padding:'22px 28px',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'0.8rem',color:'#1f2937',flexWrap:'wrap' as const,gap:'10px',maxWidth:'1240px',margin:'56px auto 0'}}>
          <span>© 2024 Krones International Raw Materials Trading FZ LLC. All Rights Reserved.</span>
          <span><a href="#" style={{color:s.sky,textDecoration:'none'}}>Privacy Policy</a> · <a href="#" style={{color:s.sky,textDecoration:'none'}}>Disclaimer</a></span>
        </div>
      </footer>
    </>
  )
}