import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Nunito:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}

:root{
  --blue:#2563EB;--blue-dark:#1D4ED8;--blue-soft:#EFF6FF;--blue-mid:#DBEAFE;
  --orange:#F97316;--green:#16A34A;
  --ink:#0B1120;--ink-2:#2E3F5C;--ink-3:#64748B;--ink-4:#94A3B8;
  --white:#FFFFFF;--bg:#F7FAFF;
  --border:rgba(37,99,235,0.10);
  --nav-h:68px;
  --f-display:'Bricolage Grotesque',sans-serif;
  --f-body:'Nunito',sans-serif;
}

body{font-family:var(--f-body);background:var(--white);color:var(--ink);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.lp{font-family:var(--f-body);color:var(--ink);overflow-x:hidden;}

/* ── TYPOGRAPHY SCALE ── */
.t-overline{
  font-family:var(--f-body);
  font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--blue);
}
.t-display{
  font-family:var(--f-display);
  font-size:clamp(3rem,5.5vw,5rem);
  font-weight:800;line-height:1.04;letter-spacing:-.04em;
  color:var(--ink);
}
.t-h2{
  font-family:var(--f-display);
  font-size:clamp(1.9rem,3vw,2.75rem);
  font-weight:700;line-height:1.15;letter-spacing:-.03em;
  color:var(--ink);
}
.t-h3{
  font-family:var(--f-display);
  font-size:clamp(1.35rem,2vw,1.6rem);
  font-weight:700;line-height:1.25;letter-spacing:-.02em;
  color:var(--ink);
}
.t-lead{
  font-family:var(--f-body);
  font-size:1.1rem;font-weight:400;line-height:1.8;
  color:var(--ink-2);
}
.t-body{
  font-family:var(--f-body);
  font-size:.95rem;font-weight:400;line-height:1.75;
  color:var(--ink-3);
}
.t-small{
  font-family:var(--f-body);
  font-size:.82rem;font-weight:500;line-height:1.5;
  color:var(--ink-3);
}
.t-micro{
  font-family:var(--f-body);
  font-size:.72rem;font-weight:600;line-height:1.4;
  color:var(--ink-4);
}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);
  display:flex;align-items:center;justify-content:space-between;padding:0 6%;
  background:rgba(255,255,255,0.86);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);transition:box-shadow .3s;
}
.nav.up{box-shadow:0 2px 28px rgba(37,99,235,.08);}
.logo{
  font-family:var(--f-display);font-weight:800;font-size:1.5rem;
  color:var(--blue);text-decoration:none;letter-spacing:-.04em;
  display:flex;align-items:center;gap:5px;
}
.logo-pip{width:7px;height:7px;border-radius:50%;background:var(--orange);margin-bottom:2px;}
.nav-r{display:flex;align-items:center;gap:10px;}
.btn-in{
  padding:8px 22px;border-radius:9px;border:1.5px solid var(--blue);background:transparent;
  color:var(--blue);font-family:var(--f-body);font-size:.88rem;font-weight:700;
  cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;transition:all .2s;
}
.btn-in:hover{background:var(--blue-soft);}
.btn-reg{
  padding:8px 22px;border-radius:9px;border:none;background:var(--blue);color:white;
  font-family:var(--f-body);font-size:.88rem;font-weight:700;
  cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;
  box-shadow:0 4px 16px rgba(37,99,235,.32);transition:all .2s;
}
.btn-reg:hover{background:var(--blue-dark);transform:translateY(-1px);}
.hb{display:none;flex-direction:column;gap:5px;cursor:pointer;}
.hb span{display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;transition:all .3s;}
.mob{display:none;position:fixed;top:var(--nav-h);left:0;right:0;background:white;z-index:99;padding:1.5rem 6% 2rem;flex-direction:column;gap:10px;border-bottom:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,.07);}
.mob.open{display:flex;}
.mob .btn-in,.mob .btn-reg{justify-content:center;padding:12px;}

/* ── HERO ── */
.hero{
  min-height:100vh;padding:calc(var(--nav-h) + 5.5rem) 6% 5.5rem;
  display:flex;align-items:center;justify-content:space-between;gap:3rem;
  background:linear-gradient(155deg,#EFF6FF 0%,#F4F8FF 40%,#FAFBFF 100%);
  position:relative;overflow:hidden;
}
.hblob{position:absolute;border-radius:50%;pointer-events:none;animation:blob 10s ease-in-out infinite alternate;}
.hblob1{width:520px;height:520px;background:rgba(37,99,235,.07);top:-130px;right:-100px;filter:blur(60px);}
.hblob2{width:340px;height:340px;background:rgba(249,115,22,.08);bottom:-80px;left:-80px;filter:blur(50px);animation-delay:-5s;}
@keyframes blob{from{transform:translate(0,0) scale(1)}to{transform:translate(20px,25px) scale(1.09)}}

.hero-l{flex:1;max-width:580px;position:relative;z-index:1;}
.chip{
  display:inline-flex;align-items:center;gap:8px;
  background:white;border:1px solid var(--border);padding:5px 14px;border-radius:100px;
  font-family:var(--f-body);font-size:.75rem;font-weight:700;letter-spacing:.04em;color:var(--blue);
  box-shadow:0 2px 14px rgba(37,99,235,.08);margin-bottom:2rem;animation:up .6s both;
}
.pdot{width:6px;height:6px;background:#22C55E;border-radius:50%;animation:pg 1.5s infinite;}
@keyframes pg{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.6}}

.hero-title{
  font-family:var(--f-display);
  font-size:clamp(3.2rem,6vw,5.2rem);
  font-weight:800;line-height:1.02;letter-spacing:-.05em;
  color:var(--ink);margin-bottom:1.5rem;
  animation:up .7s .1s both;
}
.hero-title em{font-style:normal;color:var(--blue);}
.hero-title .wave{
  position:relative;display:inline-block;color:var(--orange);
}
.hero-title .wave::after{
  content:'';position:absolute;bottom:-5px;left:0;right:0;height:3px;
  background:var(--orange);border-radius:3px;opacity:.35;
}

.hero-lead{
  font-family:var(--f-body);font-size:1.12rem;font-weight:400;line-height:1.8;
  color:var(--ink-2);max-width:460px;margin-bottom:2.5rem;
  animation:up .7s .2s both;
}

.ctas{display:flex;gap:12px;flex-wrap:wrap;animation:up .7s .3s both;}
.btn-main{
  padding:14px 30px;border-radius:12px;background:var(--blue);color:white;
  font-family:var(--f-body);font-size:.97rem;font-weight:700;
  border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;
  box-shadow:0 6px 22px rgba(37,99,235,.36);transition:all .2s;
}
.btn-main:hover{background:var(--blue-dark);transform:translateY(-2px);box-shadow:0 10px 32px rgba(37,99,235,.42);}
.btn-ghost{
  padding:14px 26px;border-radius:12px;background:white;color:var(--ink);
  font-family:var(--f-body);font-size:.97rem;font-weight:700;
  border:1.5px solid rgba(37,99,235,.15);cursor:pointer;text-decoration:none;
  display:inline-flex;align-items:center;gap:8px;transition:all .2s;
  box-shadow:0 2px 10px rgba(0,0,0,.04);
}
.btn-ghost:hover{border-color:var(--blue);color:var(--blue);transform:translateY(-1px);}

.trust{display:flex;align-items:center;gap:10px;margin-top:2.25rem;animation:up .7s .4s both;}
.trust-txt{font-family:var(--f-body);font-size:.82rem;font-weight:500;color:var(--ink-3);}
.trust-txt strong{color:var(--ink);font-weight:700;}
.tavs{display:flex;}
.tav{width:28px;height:28px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:white;margin-left:-7px;}
.tav:first-child{margin-left:0;}

/* ── PHONE MOCKUP ── */
.hero-r{flex:0 0 auto;width:320px;position:relative;z-index:1;animation:fl .9s .2s both;}
@keyframes fl{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
.phone{width:278px;margin:0 auto;background:#0B1120;border-radius:40px;padding:10px;box-shadow:0 32px 80px rgba(11,17,32,.22),0 10px 30px rgba(11,17,32,.12);}
.pscreen{background:#F0F6FF;border-radius:31px;overflow:hidden;padding:.85rem;min-height:490px;}
.pnotch{width:76px;height:17px;background:#0B1120;border-radius:0 0 11px 11px;margin:0 auto 10px;}
.phead{background:white;border-radius:13px;padding:11px 13px;margin-bottom:9px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 10px rgba(37,99,235,.06);}
.plogo{font-family:var(--f-display);font-weight:800;font-size:.9rem;color:var(--blue);letter-spacing:-.03em;}
.pbadge{font-family:var(--f-body);font-size:.6rem;font-weight:700;letter-spacing:.05em;background:var(--blue-soft);color:var(--blue);padding:3px 9px;border-radius:20px;}
.pcard{background:white;border-radius:13px;margin-bottom:8px;overflow:hidden;box-shadow:0 2px 9px rgba(37,99,235,.06);}
.pctop{height:82px;display:flex;align-items:center;justify-content:center;font-size:2rem;position:relative;}
.pcprice{position:absolute;top:8px;right:8px;background:white;border-radius:20px;padding:2px 9px;font-family:var(--f-body);font-size:.62rem;font-weight:700;color:var(--blue);}
.pcbody{padding:9px 11px;}
.pctag{font-family:var(--f-body);font-size:.58rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;border-radius:5px;padding:2px 7px;display:inline-block;margin-bottom:4px;}
.pcname{font-family:var(--f-display);font-size:.83rem;font-weight:700;letter-spacing:-.02em;color:var(--ink);margin-bottom:2px;}
.pcmeta{font-family:var(--f-body);font-size:.65rem;font-weight:500;color:var(--ink-4);}
.pcfoot{display:flex;justify-content:space-between;align-items:center;padding:7px 11px;border-top:1px solid #EFF6FF;}
.pcseats{font-family:var(--f-body);font-size:.62rem;font-weight:500;color:var(--ink-3);}
.pcbtn{background:var(--blue);color:white;border:none;border-radius:7px;padding:4px 10px;font-family:var(--f-body);font-size:.65rem;font-weight:700;cursor:pointer;}

.fn{position:absolute;background:white;border-radius:13px;padding:9px 13px;box-shadow:0 8px 26px rgba(0,0,0,.11);border:1px solid var(--border);display:flex;align-items:center;gap:9px;animation:fy 6s ease-in-out infinite alternate;width:168px;}
.fn1{left:-62px;top:28%;}
.fn2{right:-62px;top:57%;animation-delay:-3s;}
@keyframes fy{from{transform:translateY(0)}to{transform:translateY(-13px)}}
.fnico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;}
.fnt{font-family:var(--f-display);font-size:.7rem;font-weight:700;letter-spacing:-.01em;color:var(--ink);}
.fns{font-family:var(--f-body);font-size:.62rem;font-weight:500;color:var(--ink-4);margin-top:1px;}

/* ── STATS BAND ── */
.stats{background:var(--blue);padding:2.25rem 6%;display:flex;justify-content:center;flex-wrap:wrap;}
.sitem{text-align:center;flex:1;min-width:130px;padding:.9rem 1.25rem;position:relative;}
.sitem:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;bottom:20%;width:1px;background:rgba(255,255,255,.18);}
.snum{
  font-family:var(--f-display);font-size:2.2rem;font-weight:800;
  letter-spacing:-.04em;color:white;line-height:1;margin-bottom:.3rem;
}
.snum span{color:#93C5FD;}
.slbl{font-family:var(--f-body);font-size:.78rem;font-weight:500;color:rgba(255,255,255,.58);}

/* ── SECTION SHARED ── */
.sec{padding:5.5rem 6%;}
.sec.alt{background:var(--bg);}
.sh{text-align:center;margin-bottom:3.5rem;}
.sh .t-overline{display:block;margin-bottom:.65rem;}
.sh .t-h2{margin-bottom:.85rem;}
.sh .t-lead{max-width:500px;margin:0 auto;}

/* ── ABOUT ── */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
.avis{background:linear-gradient(145deg,#EFF6FF,#DBEAFE);border-radius:24px;padding:2rem;min-height:360px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;}
.avis::before{content:'';position:absolute;width:200px;height:200px;border-radius:50%;background:rgba(37,99,235,.1);right:-40px;top:-40px;filter:blur(30px);}
.avis-pills{display:flex;gap:8px;flex-wrap:wrap;position:relative;z-index:1;}
.apill{background:white;border-radius:11px;padding:9px 13px;display:flex;align-items:center;gap:7px;font-family:var(--f-body);font-size:.8rem;font-weight:600;color:var(--ink);border:1px solid var(--border);box-shadow:0 2px 9px rgba(37,99,235,.06);}
.avis-mid{background:white;border-radius:18px;padding:1.35rem;text-align:center;border:1px solid var(--border);box-shadow:0 4px 20px rgba(37,99,235,.08);position:relative;z-index:1;}
.avis-icon{font-size:2.8rem;margin-bottom:.4rem;}
.avis-t{font-family:var(--f-display);font-size:.95rem;font-weight:700;letter-spacing:-.02em;color:var(--ink);}
.avis-s{font-family:var(--f-body);font-size:.75rem;font-weight:500;color:var(--ink-3);margin-top:3px;}
.avis-nums{display:flex;gap:8px;position:relative;z-index:1;}
.anum{flex:1;background:white;border-radius:11px;padding:11px;text-align:center;border:1px solid var(--border);box-shadow:0 2px 8px rgba(37,99,235,.05);}
.anum-n{font-family:var(--f-display);font-size:1.25rem;font-weight:800;letter-spacing:-.03em;color:var(--blue);}
.anum-l{font-family:var(--f-body);font-size:.7rem;font-weight:500;color:var(--ink-3);margin-top:2px;}

.atext .t-overline{display:block;margin-bottom:.65rem;}
.atext .t-h2{margin-bottom:1rem;}
.atext .t-lead{margin-bottom:.75rem;max-width:none;text-align:left;}
.abullets{display:flex;flex-direction:column;gap:.6rem;margin-top:1.5rem;}
.ab{display:flex;align-items:flex-start;gap:10px;}
.ab-txt{font-family:var(--f-body);font-size:.9rem;font-weight:500;color:var(--ink-2);line-height:1.5;}
.abck{width:20px;height:20px;border-radius:6px;background:var(--blue-soft);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;flex-shrink:0;margin-top:1px;}

/* ── FEATURES ── */
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
.fcard{background:white;border-radius:18px;padding:1.75rem;border:1px solid var(--border);transition:all .3s;cursor:default;position:relative;overflow:hidden;}
.fcard::after{content:'';position:absolute;bottom:0;left:1.75rem;right:1.75rem;height:2.5px;background:var(--blue);transform:scaleX(0);transition:transform .3s;transform-origin:left;border-radius:2px 2px 0 0;}
.fcard:hover{transform:translateY(-5px);box-shadow:0 16px 38px rgba(37,99,235,.10);}
.fcard:hover::after{transform:scaleX(1);}
.fico{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.1rem;}
.ft{font-family:var(--f-display);font-size:.98rem;font-weight:700;letter-spacing:-.02em;margin-bottom:.5rem;color:var(--ink);}
.fd{font-family:var(--f-body);font-size:.86rem;font-weight:400;color:var(--ink-3);line-height:1.7;}

/* ── HOW IT WORKS ── */
.hiw-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;position:relative;margin-top:.5rem;}
.hiw-line{position:absolute;top:35px;left:calc(12.5% + 35px);right:calc(12.5% + 35px);height:2px;background:linear-gradient(90deg,var(--blue),var(--orange));z-index:0;}
.hstep{text-align:center;position:relative;z-index:1;}
.hnum{width:70px;height:70px;border-radius:50%;margin:0 auto 1.2rem;display:flex;align-items:center;justify-content:center;font-family:var(--f-display);font-size:1.4rem;font-weight:800;letter-spacing:-.03em;box-shadow:0 5px 20px rgba(37,99,235,.14);}
.hstep:nth-child(odd) .hnum{background:var(--blue);color:white;}
.hstep:nth-child(even) .hnum{background:white;color:var(--blue);border:2px solid var(--blue);}
.ht{font-family:var(--f-display);font-size:.92rem;font-weight:700;letter-spacing:-.02em;margin-bottom:.4rem;color:var(--ink);}
.hd{font-family:var(--f-body);font-size:.83rem;font-weight:400;color:var(--ink-3);line-height:1.65;}

/* ── SCANNER ── */
.scanner{margin:0 6% 5rem;border-radius:26px;background:linear-gradient(130deg,#0B1120 0%,#1E3A8A 55%,#1D4ED8 100%);padding:4rem 5%;display:grid;grid-template-columns:1fr auto;gap:4rem;align-items:center;position:relative;overflow:hidden;}
.scanner::before{content:'';position:absolute;width:380px;height:380px;border-radius:50%;background:rgba(249,115,22,.12);filter:blur(70px);top:-100px;right:200px;pointer-events:none;}
.sctext{position:relative;z-index:1;}
.sctext .t-overline{color:#93C5FD;display:block;margin-bottom:.65rem;}
.sctext .t-h2{color:white;margin-bottom:.75rem;}
.sctext .t-lead{color:rgba(255,255,255,.62);text-align:left;max-width:none;}
.sclist{display:flex;flex-direction:column;gap:.85rem;margin-top:1.75rem;}
.scitem{display:flex;align-items:center;gap:11px;font-family:var(--f-body);font-size:.9rem;font-weight:500;color:rgba(255,255,255,.78);}
.scico{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.75rem;}

.qrwrap{position:relative;z-index:1;flex-shrink:0;padding-bottom:56px;}
.qrcard{width:190px;height:190px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 22px 55px rgba(0,0,0,.28);position:relative;}
.qrbody{width:144px;height:144px;position:relative;}
.qrc{position:absolute;width:24px;height:24px;border:4px solid var(--blue);}
.qrc.tl{top:0;left:0;border-right:none;border-bottom:none;border-radius:4px 0 0 0;}
.qrc.tr{top:0;right:0;border-left:none;border-bottom:none;border-radius:0 4px 0 0;}
.qrc.bl{bottom:0;left:0;border-right:none;border-top:none;border-radius:0 0 0 4px;}
.qrc.br{bottom:0;right:0;border-left:none;border-top:none;border-radius:0 0 4px 0;}
.qrsl{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--blue),transparent);animation:scan 2.4s ease-in-out infinite;}
@keyframes scan{0%{top:5%;opacity:0}15%{opacity:1}85%{opacity:1}100%{top:95%;opacity:0}}
.qrdots{display:grid;grid-template-columns:repeat(8,1fr);gap:3px;padding:12px;}
.qrd{aspect-ratio:1;border-radius:2px;}
.qrok{position:absolute;top:-13px;right:-13px;width:40px;height:40px;border-radius:50%;background:#16A34A;display:flex;align-items:center;justify-content:center;color:white;font-size:1.1rem;box-shadow:0 4px 14px rgba(22,163,74,.45);animation:pop .4s 1.2s both;}
@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
.qrlbl{position:absolute;bottom:-52px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 14px;color:white;font-size:.67rem;text-align:center;white-space:nowrap;}
.qrlbl strong{display:block;font-family:var(--f-body);font-weight:700;margin-bottom:1px;}
.qrlbl span{opacity:.5;}

/* ── ROLES ── */
.rgrid{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;margin-top:3.25rem;}
.rcard{border-radius:22px;padding:2.5rem;position:relative;overflow:hidden;}
.rcard.org{background:var(--blue);}
.rcard.att{background:white;border:1.5px solid var(--border);}
.rbadge{display:inline-flex;align-items:center;gap:6px;font-family:var(--f-body);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:20px;padding:4px 12px;margin-bottom:1.1rem;}
.org .rbadge{background:rgba(255,255,255,.14);color:white;}
.att .rbadge{background:var(--blue-soft);color:var(--blue);}
.rh{font-family:var(--f-display);font-size:1.4rem;font-weight:700;letter-spacing:-.03em;line-height:1.2;margin-bottom:.7rem;}
.org .rh{color:white;}
.att .rh{color:var(--ink);}
.rp{font-family:var(--f-body);font-size:.9rem;font-weight:400;line-height:1.75;margin-bottom:1.65rem;}
.org .rp{color:rgba(255,255,255,.65);}
.att .rp{color:var(--ink-3);}
.rperks{display:flex;flex-direction:column;gap:.55rem;margin-bottom:2rem;}
.rperk{display:flex;align-items:center;gap:9px;font-family:var(--f-body);font-size:.87rem;font-weight:500;}
.org .rperk{color:rgba(255,255,255,.82);}
.att .rperk{color:var(--ink-2);}
.rpck{width:17px;height:17px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:.62rem;flex-shrink:0;}
.org .rpck{background:rgba(255,255,255,.18);color:white;}
.att .rpck{background:var(--blue-soft);color:var(--blue);}
.rcta{padding:11px 24px;border-radius:10px;font-family:var(--f-body);font-size:.9rem;font-weight:700;cursor:pointer;border:none;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:all .2s;}
.org .rcta{background:white;color:var(--blue);box-shadow:0 4px 16px rgba(0,0,0,.1);}
.org .rcta:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.14);}
.att .rcta{background:var(--blue);color:white;box-shadow:0 4px 16px rgba(37,99,235,.28);}
.att .rcta:hover{background:var(--blue-dark);transform:translateY(-2px);}

/* ── BIG CTA ── */
.bcta{padding:6rem 6%;text-align:center;background:linear-gradient(155deg,#EFF6FF 0%,#F4F8FF 50%,#FAFBFF 100%);position:relative;overflow:hidden;}
.bcta::before{content:'';position:absolute;width:380px;height:380px;border-radius:50%;background:rgba(37,99,235,.06);filter:blur(60px);top:-100px;left:50%;transform:translateX(-50%);}
.bcta-in{position:relative;z-index:1;max-width:580px;margin:0 auto;}
.bcta-in .t-overline{display:block;margin-bottom:.7rem;}
.bcta-h{font-family:var(--f-display);font-size:clamp(2.2rem,4vw,3.4rem);font-weight:800;letter-spacing:-.05em;line-height:1.05;color:var(--ink);margin-bottom:1rem;}
.bcta-in .t-lead{margin:0 auto 2.5rem;}
.bcta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.bcta-fine{font-family:var(--f-body);font-size:.76rem;font-weight:500;color:var(--ink-4);margin-top:1.25rem;}

/* ── FOOTER ── */
.footer{background:var(--ink);padding:2.5rem 6%;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.25rem;}
.flogo{font-family:var(--f-display);font-weight:800;font-size:1.25rem;letter-spacing:-.04em;color:white;display:flex;align-items:center;gap:5px;}
.fcopy{font-family:var(--f-body);font-size:.8rem;font-weight:400;color:rgba(255,255,255,.4);}
.flinks{display:flex;gap:1.5rem;}
.flinks a{font-family:var(--f-body);font-size:.8rem;font-weight:500;color:rgba(255,255,255,.4);text-decoration:none;transition:color .2s;}
.flinks a:hover{color:white;}

@keyframes up{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero{flex-direction:column;text-align:center;padding-bottom:4rem;}
  .hero-lead,.atext .t-lead{margin-left:auto;margin-right:auto;}
  .ctas{justify-content:center;}
  .trust{justify-content:center;}
  .hero-r{width:100%;max-width:310px;}
  .fn1,.fn2{display:none;}
  .fgrid{grid-template-columns:repeat(2,1fr);}
  .hiw-steps{grid-template-columns:repeat(2,1fr);}
  .hiw-line{display:none;}
  .about-grid{grid-template-columns:1fr;}
  .atext .t-h2{text-align:left;}
  .scanner{grid-template-columns:1fr;text-align:center;gap:2.5rem;}
  .sctext .t-h2,.sctext .t-lead,.sctext .t-overline{text-align:center;}
  .sclist{align-items:center;}
  .qrwrap{display:flex;justify-content:center;}
  .rgrid{grid-template-columns:1fr;}
}
@media(max-width:768px){
  .nav-r{display:none;}
  .hb{display:flex;}
  .fgrid{grid-template-columns:1fr;}
  .hiw-steps{grid-template-columns:1fr;}
  .sitem:not(:last-child)::after{display:none;}
  .footer{flex-direction:column;text-align:center;}
  .scanner{padding:2.75rem 1.5rem;margin:0 4% 3.5rem;}
}
@media(max-width:480px){
  .ctas,.bcta-btns{flex-direction:column;align-items:center;}
  .btn-main,.btn-ghost{justify-content:center;}
}
`;

const QR = [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,0,1,1,0,0,0,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1,0,0,0,1,0,1,0,0,1,1,1,1,1,0,1,1,0,1,0];

const FEATS = [
  {bg:"#EFF6FF",e:"📋",t:"Create Events in Minutes",d:"Fill a simple form — name, date, venue, capacity, pricing. Your event page goes live instantly."},
  {bg:"#FFF4ED",e:"🎟️",t:"Digital QR E-Tickets",d:"Every registrant automatically gets a unique QR-coded ticket by email. Zero manual work."},
  {bg:"#F0FDF4",e:"📱",t:"Built-in QR Scanner",d:"Validate tickets at entry from any smartphone browser. No extra app or hardware needed."},
  {bg:"#FFF7ED",e:"💸",t:"Secure Payment Collection",d:"Accept UPI, cards, net banking. Funds settle directly to your account after the event."},
  {bg:"#F5F3FF",e:"📊",t:"Real-time Analytics",d:"Track registrations, check-ins, and revenue as they happen from a clean dashboard."},
  {bg:"#FFF1F2",e:"🔔",t:"Automated Reminders",d:"Attendees get event reminders automatically. Reduce no-shows without manual follow-up."},
];

export default function TickitUpLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="lp">

      {/* NAV */}
      <nav className={`nav ${scrolled ? "up" : ""}`}>
        <a className="logo" href="#"><span>TickitUp</span><span className="logo-pip" /></a>
        <div className="nav-r">
          <a onClick={() => navigate("/auth/login")} className="btn-in" href="#">Sign In</a>
          <a onClick={() => navigate("/auth/register")} className="btn-reg" href="#">Register Free</a>
        </div>
        <div className="hb" onClick={() => setMob(o => !o)}>
          <span style={mob ? {transform:"rotate(45deg) translate(5px,5px)"} : {}} />
          <span style={mob ? {opacity:0} : {}} />
          <span style={mob ? {transform:"rotate(-45deg) translate(5px,-5px)"} : {}} />
        </div>
      </nav>
      <div className={`mob ${mob ? "open" : ""}`}>
        <a className="btn-in" href="#" onClick={() => {setMob(false);navigate("/auth/login")}}>Sign In</a>
        <a  className="btn-reg" href="#" onClick={() => {setMob(false);navigate("/auth/register")}}>Register Free</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hblob hblob1" /><div className="hblob hblob2" />
        <div className="hero-l">
          <div className="chip"><span className="pdot" />Live across 50+ colleges in India</div>
          <h1 className="hero-title">
            The Smartest Way<br />to <em>Run</em> Campus<br /><span className="wave">Events</span>
          </h1>
          <p className="hero-lead">
            TickitUp lets college students create events, sell e-tickets, and validate attendees at the gate — all from one simple platform.
          </p>
          <div className="ctas">
            <a onClick={() => navigate("/auth/register")} className="btn-main" href="#">🎟️ Get Started Free</a>
            <a onClick={() => navigate("/auth/login")} className="btn-ghost" href="#">Sign In →</a>
          </div>
          <div className="trust">
            <div className="tavs">
              {[["#2563EB","AS"],["#16A34A","PK"],["#F97316","RV"],["#DB2777","SM"]].map(([c,l],i) => (
                <div key={i} className="tav" style={{background:c}}>{l}</div>
              ))}
            </div>
            <span className="trust-txt">Trusted by <strong>1,000</strong> students nationwide</span>
          </div>
        </div>

        <div className="hero-r">
          <div style={{position:"relative"}}>
            <div className="fn fn1">
              <div className="fnico" style={{background:"#DCFCE7"}}>✅</div>
              <div><div className="fnt">Ticket Validated</div><div className="fns">Arjun · HackSphere</div></div>
            </div>
            <div className="phone">
              <div className="pnotch" />
              <div className="pscreen">
                <div className="phead"><span className="plogo">TickitUp</span><span className="pbadge">Discover</span></div>
                {[
                  {bg:"linear-gradient(135deg,#1e3a5f,#2563eb)",e:"🎵",tag:"Concert",tc:"#DBEAFE",tk:"#1E40AF",name:"Resonance Fest",date:"Apr 12 · 6 PM",price:"₹149",seats:120},
                  {bg:"linear-gradient(135deg,#134e26,#16a34a)",e:"💻",tag:"Tech",tc:"#DCFCE7",tk:"#166534",name:"HackSphere 2026",date:"Apr 18 · 9 AM",price:"Free",seats:45},
                ].map((ev,i) => (
                  <div className="pcard" key={i}>
                    <div className="pctop" style={{background:ev.bg}}>{ev.e}<span className="pcprice">{ev.price}</span></div>
                    <div className="pcbody">
                      <span className="pctag" style={{background:ev.tc,color:ev.tk}}>{ev.tag}</span>
                      <div className="pcname">{ev.name}</div>
                      <div className="pcmeta">📅 {ev.date}</div>
                    </div>
                    <div className="pcfoot"><span className="pcseats">{ev.seats} seats left</span><button className="pcbtn">Book</button></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fn fn2">
              <div className="fnico" style={{background:"#FEF3C7"}}>🎉</div>
              <div><div className="fnt">New Registration</div><div className="fns">Priya just booked</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        {[["12K+","Events Hosted"],["3L+","Tickets Sold"],["50+","Colleges"],["4.9★","Avg Rating"]].map(([n,l],i) => (
          <div className="sitem" key={i}>
            <div className="snum">{n}</div>
            <div className="slbl">{l}</div>
          </div>
        ))}
      </div>

      {/* WHAT IS TICKITUP */}
      <section className="sec">
        <div className="about-grid">
          <div className="avis">
            <div className="avis-pills">
              {[["📋","Event Created"],["💳","Payment Received"],["📧","Ticket Sent"]].map(([ic,lb]) => (
                <div className="apill" key={lb}><span>{ic}</span>{lb}</div>
              ))}
            </div>
            <div className="avis-mid">
              <div className="avis-icon">🎟️</div>
              <div className="avis-t">Your E-Ticket is Ready</div>
              <div className="avis-s">Scan QR at the gate to enter</div>
            </div>
            <div className="avis-nums">
              {[["12K","Events"],["3L+","Tickets"],["₹0","to Start"]].map(([n,l]) => (
                <div className="anum" key={l}><div className="anum-n">{n}</div><div className="anum-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="atext">
            <span className="t-overline">What is TickitUp?</span>
            <h2 className="t-h2" style={{margin:".65rem 0 1rem"}}>Campus event management, built for students</h2>
            <p className="t-lead">TickitUp is a platform built exclusively for college communities. Whether you're an organizer running a cultural fest, or a student looking for the next campus event — TickitUp connects both sides seamlessly.</p>
            <p className="t-body" style={{marginTop:".75rem"}}>Organizers get powerful tools to publish events, collect registrations and payments, and validate tickets at entry. Attendees get a simple way to discover events and receive digital tickets instantly.</p>
            <div className="abullets">
              {["No technical setup — go live in 5 minutes","Works on any device, any browser","Completely free for ₹0-ticket events","Used at IITs, NITs, VIT, BITS and more"].map(b => (
                <div className="ab" key={b}><div className="abck">✓</div><span className="ab-txt">{b}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="sec alt">
        <div className="sh">
          <span className="t-overline">Platform Features</span>
          <h2 className="t-h2" style={{margin:".65rem 0 .85rem"}}>Everything in one place</h2>
          <p className="t-lead">From creating an event to scanning tickets at the gate — TickitUp handles the entire workflow so you can focus on making great events.</p>
        </div>
        <div className="fgrid">
          {FEATS.map((f,i) => (
            <div className="fcard" key={i}>
              <div className="fico" style={{background:f.bg}}>{f.e}</div>
              <div className="ft">{f.t}</div>
              <div className="fd">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sec">
        <div className="sh">
          <span className="t-overline">Simple Process</span>
          <h2 className="t-h2" style={{margin:".65rem 0 0"}}>Up and running in 4 steps</h2>
        </div>
        <div className="hiw-steps">
          <div className="hiw-line" />
          {[
            {n:"01",t:"Create Your Event",d:"Add details, set ticket pricing and capacity, upload a banner. Done."},
            {n:"02",t:"Share the Link",d:"Get a shareable link for WhatsApp, Instagram or your college notice board."},
            {n:"03",t:"Accept Registrations",d:"Students register and pay online. Each gets a unique QR e-ticket instantly."},
            {n:"04",t:"Scan at the Gate",d:"Use our mobile scanner to validate tickets in real time at the entrance."},
          ].map((s,i) => (
            <div className="hstep" key={i}>
              <div className="hnum">{s.n}</div>
              <div className="ht">{s.t}</div>
              <div className="hd">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QR SCANNER */}
      <div>
        <div className="scanner">
          <div className="sctext">
            <span className="t-overline">Built-in Technology</span>
            <h2 className="t-h2" style={{color:"white",margin:".65rem 0 .75rem"}}>Validate tickets in under a second</h2>
            <p className="t-lead" style={{color:"rgba(255,255,255,.62)"}}>No separate app, no hardware. Our built-in QR scanner works on any smartphone browser — scan, verify, and track attendance in real time.</p>
            <div className="sclist">
              {["Works on any Android or iPhone","Prevents duplicate scans & fraud","Shows live attendance count instantly","Offline mode for low-connectivity venues"].map(t => (
                <div className="scitem" key={t}><div className="scico">✓</div>{t}</div>
              ))}
            </div>
          </div>
          <div className="qrwrap">
            <div className="qrcard">
              <div className="qrbody">
                <div className="qrc tl" /><div className="qrc tr" />
                <div className="qrc bl" /><div className="qrc br" />
                <div className="qrsl" />
                <div className="qrdots">
                  {QR.map((v,i) => <div key={i} className="qrd" style={{background:v?"#0B1120":"transparent"}} />)}
                </div>
              </div>
              <div className="qrok">✓</div>
            </div>
            <div className="qrlbl">
              <strong>TKT177494152796…</strong>
              <span>Arjun Sharma · HackSphere 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* WHO IS IT FOR */}
      <section className="sec alt">
        <div className="sh">
          <span className="t-overline">Who is it for?</span>
          <h2 className="t-h2" style={{margin:".65rem 0 0"}}>Built for every side of campus events</h2>
        </div>
        <div className="rgrid">
          <div className="rcard org">
            <div className="rbadge">🎯 For Organizers</div>
            <h3 className="rh">Create and manage events with zero hassle</h3>
            <p className="rp">Running a club event, a college fest, or a workshop? TickitUp gives you everything to go from idea to live event in minutes.</p>
            <div className="rperks">
              {["Create unlimited events for free","Accept paid or free registrations","Manage attendees from a dashboard","Scan & validate tickets at entry"].map(p => (
                <div className="rperk" key={p}><div className="rpck">✓</div>{p}</div>
              ))}
            </div>
            <a className="rcta" href="#">Start Organizing →</a>
          </div>
          <div className="rcard att">
            <div className="rbadge">🎓 For Students</div>
            <h3 className="rh">Discover and attend campus events easily</h3>
            <p className="rp">Find upcoming fests, workshops, concerts and talks. Register in seconds and get your e-ticket instantly — no app needed.</p>
            <div className="rperks">
              {["Discover all events at your college","Register and pay securely online","Receive your QR ticket via email","One-tap entry at the event gate"].map(p => (
                <div className="rperk" key={p}><div className="rpck">✓</div>{p}</div>
              ))}
            </div>
            <a className="rcta" href="#">Register Now →</a>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="bcta">
        <div className="bcta-in">
          <span className="t-overline">Ready to start?</span>
          <h2 className="bcta-h" style={{marginTop:".65rem"}}>Run your next event<br />on TickitUp</h2>
          <p className="t-lead" style={{maxWidth:"440px",margin:"0 auto 2.5rem"}}>Join thousands of student organizers across India. Free to get started — no credit card required.</p>
          <div className="bcta-btns">
            <a className="btn-main" href="#">🎟️ Register Free</a>
            <a className="btn-ghost" href="#">Sign In</a>
          </div>
          <div className="bcta-fine" style={{marginTop:"1.25rem"}}>Free for ₹0 ticket events · No setup fee · Cancel anytime</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="flogo">TickitUp<span className="logo-pip" /></div>
        <div className="fcopy">© 2026 TickitUp. All rights reserved.</div>
        <div className="flinks">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}