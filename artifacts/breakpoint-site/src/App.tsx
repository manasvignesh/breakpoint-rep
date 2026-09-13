import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, Copy, Instagram, Menu, Play, Plus, Sparkles, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import discoverImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.31_PM_(2)_1789308290814.jpeg';
import briefImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.30_PM_(3)_1789308290812.jpeg';
import reelsImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.32_PM_1789308290816.jpeg';
import spacesImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.32_PM_(1)_1789308290815.jpeg';
import connectImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.32_PM_(2)_1789308290816.jpeg';
import profileImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.33_PM_1789308290809.jpeg';
import savedImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.33_PM_(1)_1789308290817.jpeg';
import splashImage from '@assets/WhatsApp_Image_2026-09-13_at_7.26.29_PM_1789308290810.jpeg';

const queryClient = new QueryClient();
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ciedaily.app&pcampaignid=web_share';

const storyData = [
  { category: 'Startups', title: 'DocPharma raises $2M to build a more human supply chain', time: '2 min brief', image: briefImage },
  { category: 'AI & ML', title: 'The public internet is getting a voice', time: '4 min brief', image: discoverImage },
  { category: 'Campus', title: 'What young builders are making between classes', time: '3 min brief', image: savedImage },
];

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.bp-reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-1 ${light ? 'text-[#f5f0e8]' : 'text-[#f5f0e8]'}`} aria-label="Breakpoint">
      <span className="bp-display text-[21px] font-extrabold tracking-[-.08em]">BREAKP</span>
      <span className="relative inline-flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#ff5a1f]"><span className="absolute h-[5px] w-[5px] rounded-full bg-[#100d08]" /></span>
      <span className="bp-display text-[21px] font-extrabold tracking-[-.08em]">INT</span>
    </div>
  );
}

function Phone({ image, className = '', alt }: { image: string; className?: string; alt: string }) {
  return <div className={`bp-phone ${className}`}><img src={image} alt={alt} /></div>;
}

function Home() {
  useReveal();
  const [mobileNav, setMobileNav] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [category, setCategory] = useState('All');
  const [copied, setCopied] = useState(false);
  const [selectedStory, setSelectedStory] = useState(0);
  const categories = ['All', 'Startups', 'Tech', 'AI & ML', 'Campus'];
  const filteredStories = useMemo(
    () => category === 'All' ? storyData : storyData.filter((story) => story.category === category),
    [category],
  );

  const scrollTo = (id: string) => {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyCode = () => {
    navigator.clipboard?.writeText('MSDND-7SLP64');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="bp-site bp-noise min-h-screen">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-[#3a2c23]/70 bg-[#100d08]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 lg:px-10" aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo('top')} data-testid="button-home" className="cursor-pointer"><Logo /></button>
          <div className="hidden items-center gap-8 md:flex">
            <button type="button" onClick={() => scrollTo('discover')} data-testid="link-discover" className="bp-mono text-[10px] text-[#a89a8c] transition-colors hover:text-[#ff5a1f]">Discover</button>
            <button type="button" onClick={() => scrollTo('reels')} data-testid="link-reels" className="bp-mono text-[10px] text-[#a89a8c] transition-colors hover:text-[#ff5a1f]">Reels</button>
            <button type="button" onClick={() => scrollTo('connect')} data-testid="link-connect" className="bp-mono text-[10px] text-[#a89a8c] transition-colors hover:text-[#ff5a1f]">Connect</button>
          </div>
          <a href={playStoreUrl} target="_blank" rel="noreferrer" data-testid="button-join-header" className="bp-button bp-button-primary px-5 py-2.5 text-xs font-bold">Get the app <ArrowRight size={14} /></a>
          <button type="button" onClick={() => setMobileNav((value) => !value)} data-testid="button-menu" className="ml-3 rounded-full border border-[#4a382d] p-2.5 md:hidden">{mobileNav ? <X size={18} /> : <Menu size={18} />}</button>
        </nav>
        {mobileNav && <div className="border-t border-[#3a2c23] bg-[#15100c] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {['discover', 'reels', 'connect', 'spaces'].map((item) => <button key={item} type="button" onClick={() => scrollTo(item)} className="bp-mono text-left text-xs text-[#c7b8aa]">{item}</button>)}
          </div>
        </div>}
      </header>

      <section id="top" className="relative min-h-[780px] overflow-hidden px-5 pb-24 pt-40 lg:min-h-[900px] lg:px-12 lg:pt-48">
        <div className="bp-glow bp-pulse left-[48%] top-[22%] h-[360px] w-[360px] bg-[#ff5a1f]/20" />
        <div className="absolute right-[-8%] top-16 h-[600px] w-[65%] rounded-full border border-[#ff5a1f]/10 lg:right-[1%] lg:w-[45%]" />
        <div className="absolute left-[46%] top-16 h-[700px] w-px bg-gradient-to-b from-transparent via-[#6a4a37] to-transparent opacity-40" />
        <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="bp-reveal">
            <div className="mb-8 flex items-center gap-3"><span className="bp-mono text-[10px] text-[#ff7442]">A new kind of campus signal</span><span className="h-px w-16 bg-[#ff5a1f]" /></div>
            <h1 className="bp-display max-w-[690px] text-[clamp(4.2rem,10vw,9.5rem)] font-extrabold leading-[.85]">Worth<br /><span className="text-[#ff5a1f]">stopping</span><br />for.</h1>
            <p className="mt-9 max-w-[450px] text-lg leading-relaxed text-[#a99d91] lg:text-xl">Breakpoint is where curious minds find the story behind the story — and the people already thinking about it.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={playStoreUrl} target="_blank" rel="noreferrer" data-testid="button-join-hero" className="bp-button bp-button-primary px-7 py-4 text-sm font-bold">Find your signal <ArrowRight size={17} /></a>
              <button type="button" onClick={() => scrollTo('discover')} data-testid="button-explore" className="bp-button bp-button-ghost px-7 py-4 text-sm">See how it works <ArrowDown size={16} /></button>
            </div>
            <div className="mt-14 flex items-center gap-3 text-xs text-[#84766b]"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#70503b] text-[#ff5a1f]"><Sparkles size={14} /></span><span>Built for the beautifully curious.<br /><span className="text-[#f5f0e8]">No doomscrolling required.</span></span></div>
          </div>
          <div className="relative flex min-h-[520px] items-center justify-center lg:min-h-[650px]">
            <div className="absolute h-[440px] w-[440px] rounded-full border border-[#ff5a1f]/15 lg:h-[560px] lg:w-[560px]" />
            <div className="absolute h-[320px] w-[320px] rounded-full bg-[#ff5a1f]/10 blur-3xl" />
            <Phone image={splashImage} alt="Breakpoint loading screen" className="bp-float z-10 h-[470px] w-[245px] rotate-[5deg] lg:h-[600px] lg:w-[310px]" />
            <div className="absolute bottom-[8%] left-[2%] z-20 rounded-2xl border border-[#5e4534] bg-[#1b140f]/90 px-4 py-3 backdrop-blur-sm lg:left-0"><div className="bp-mono mb-1 text-[9px] text-[#ff7442]">THE FIRST SIGNAL</div><div className="text-sm font-semibold">Ideas that move you<br />somewhere new.</div></div>
            <div className="absolute right-[2%] top-[15%] z-20 rounded-full border border-[#5e4534] bg-[#1b140f] px-4 py-2 text-xs text-[#d3c1b2] lg:right-0"><span className="mr-2 text-[#ff5a1f]">●</span> 52 briefs today</div>
          </div>
        </div>
      </section>

      <div className="bp-marquee"><div className="bp-marquee-track bp-mono text-[10px]"><span>CURIOUS BY DEFAULT</span><span className="bp-orange">●</span><span>MAKE A BETTER RABBIT HOLE</span><span className="bp-orange">●</span><span>SHARE WHAT MOVES YOU</span><span className="bp-orange">●</span><span>CURIOUS BY DEFAULT</span><span className="bp-orange">●</span><span>MAKE A BETTER RABBIT HOLE</span><span className="bp-orange">●</span><span>SHARE WHAT MOVES YOU</span></div></div>

      <section id="discover" className="bp-section bp-grid">
        <div className="grid items-center gap-20 lg:grid-cols-[.82fr_1.18fr]">
          <div className="bp-reveal">
            <div className="bp-mono mb-6 text-[10px] text-[#ff7442]">01 / Discover</div>
            <h2 className="bp-display text-6xl font-bold leading-[.9] lg:text-8xl">The feed<br />has a <span className="text-[#ff5a1f]">point<br />of view.</span></h2>
            <p className="mt-8 max-w-[390px] text-base leading-7 text-[#a99d91]">No rage bait. No endless beige. Just sharp ideas, beautifully explained — from the lab, the street, and the space between.</p>
            <button type="button" onClick={() => setCategory('AI & ML')} data-testid="button-filter-ai" className="bp-button bp-button-ghost mt-8 px-5 py-3 text-xs">Show me something strange <ArrowRight size={14} /></button>
          </div>
          <div className="bp-reveal relative min-h-[620px]">
            <Phone image={discoverImage} alt="Breakpoint Discover feed" className="absolute left-[10%] top-10 h-[530px] w-[275px] rotate-[-8deg] lg:left-[16%]" />
            <Phone image={briefImage} alt="Breakpoint editorial briefs" className="absolute right-[6%] top-28 h-[470px] w-[245px] rotate-[7deg] lg:right-[14%]" />
            <div className="absolute bottom-5 left-[8%] rounded-xl bg-[#ff5a1f] px-4 py-3 text-[11px] font-bold text-[#170c06] shadow-2xl">Swipe into a better rabbit hole →</div>
          </div>
        </div>
      </section>

      <section className="bp-section !pt-20">
        <div className="bp-reveal mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><div className="bp-mono mb-5 text-[10px] text-[#ff7442]">A little editorial magic</div><h2 className="bp-display max-w-[670px] text-5xl font-bold leading-[.94] lg:text-7xl">Stories for the<br /><span className="text-[#ff5a1f]">in-between</span> moments.</h2></div>
          <p className="max-w-[280px] text-sm leading-6 text-[#9c8e83]">For the walk to class. The 2am rabbit hole. The question you can’t stop carrying.</p>
        </div>
        <div className="bp-reveal flex flex-wrap gap-2 border-b border-[#382b23] pb-5">
          {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} data-testid={`button-category-${item.toLowerCase().replaceAll(' ', '-')}`} className={`rounded-full border px-4 py-2 text-xs transition-all ${category === item ? 'border-[#ff5a1f] bg-[#ff5a1f] font-bold text-[#170c06]' : 'border-[#49382d] text-[#9e9085] hover:border-[#ff5a1f] hover:text-[#f5f0e8]'}`}>{item}</button>)}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {filteredStories.map((story, index) => <button type="button" key={story.title} onClick={() => setSelectedStory(index)} data-testid={`card-story-${index}`} className={`bp-shine group overflow-hidden rounded-2xl border text-left transition-all ${selectedStory === index ? 'border-[#ff5a1f] bg-[#21150f]' : 'border-[#3c3027] bg-[#17120e] hover:-translate-y-1 hover:border-[#79513b]'}`}>
            <div className="h-48 overflow-hidden"><img src={story.image} alt={story.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="p-5"><div className="bp-mono mb-4 text-[9px] text-[#ff7442]">{story.category}</div><h3 className="text-lg font-semibold leading-tight">{story.title}</h3><div className="mt-6 flex items-center justify-between text-xs text-[#8e8177]"><span>{story.time}</span><ArrowRight size={15} className="text-[#ff5a1f] transition-transform group-hover:translate-x-1" /></div></div>
          </button>)}
        </div>
        {filteredStories.length === 0 && <div className="rounded-2xl border border-dashed border-[#4e382c] p-12 text-center text-[#aa9b8e]">That rabbit hole is still being mapped. Try another signal.</div>}
      </section>

      <section id="reels" className="relative overflow-hidden border-y border-[#3b2d25] bg-[#17110d]">
        <div className="bp-glow right-[-5%] top-[10%] h-[400px] w-[400px] bg-[#ff5a1f]/15" />
        <div className="bp-section grid items-center gap-20 lg:grid-cols-[1fr_.9fr]">
          <div className="bp-reveal order-2 lg:order-1">
            <div className="bp-mono mb-6 text-[10px] text-[#ff7442]">02 / Reels</div>
            <h2 className="bp-display text-6xl font-bold leading-[.9] lg:text-8xl">Learn it<br />from a<br /><span className="text-[#ff5a1f]">human.</span></h2>
            <p className="mt-8 max-w-[420px] text-base leading-7 text-[#a99d91]">Short-form stories with a pulse. Meet the builders, thinkers, and beautiful weirdos putting their ideas out into the world.</p>
            <div className="mt-10 flex gap-8 border-t border-[#4a3527] pt-6"><div><div className="bp-display text-4xl font-bold">28s</div><div className="bp-mono mt-2 text-[9px] text-[#8f8175]">average reel</div></div><div><div className="bp-display text-4xl font-bold">0%</div><div className="bp-mono mt-2 text-[9px] text-[#8f8175]">noise tolerance</div></div></div>
          </div>
          <div className="bp-reveal order-1 flex justify-center lg:order-2"><div className="relative"><Phone image={reelsImage} alt="Breakpoint short-form reels" className="h-[590px] w-[302px] rotate-[4deg]" /><div className="absolute -left-10 bottom-12 rounded-xl border border-[#684833] bg-[#25170e] px-4 py-3 text-xs font-semibold shadow-xl"><span className="mr-2 text-[#ff5a1f]">●</span> tap into the good stuff</div></div></div>
        </div>
      </section>

      <section id="connect" className="bp-section">
        <div className="grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
          <div className="bp-reveal relative flex min-h-[560px] items-center justify-center">
            <div className="absolute h-[430px] w-[430px] rounded-full border border-[#ff5a1f]/15" />
            <div className="absolute h-[250px] w-[250px] rounded-full bg-[#ff5a1f]/12 blur-3xl" />
            <Phone image={connectImage} alt="Breakpoint campus connection screen" className="h-[560px] w-[286px] rotate-[-5deg]" />
            <div className="absolute right-0 top-14 rounded-xl border border-[#594432] bg-[#21160f] px-4 py-3"><div className="bp-mono text-[9px] text-[#ff7442]">YOUR PEOPLE ARE HERE</div><div className="mt-1 text-sm font-semibold">MSDND-7SLP64</div><button type="button" onClick={copyCode} data-testid="button-copy-code" className="mt-3 flex items-center gap-2 text-xs text-[#ff5a1f]">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'Copied' : 'Copy code'}</button></div>
          </div>
          <div className="bp-reveal">
            <div className="bp-mono mb-6 text-[10px] text-[#ff7442]">03 / Connect</div>
            <h2 className="bp-display text-6xl font-bold leading-[.9] lg:text-8xl">Your next<br /><span className="text-[#ff5a1f]">yes</span> is<br />nearby.</h2>
            <p className="mt-8 max-w-[410px] text-base leading-7 text-[#a99d91]">Find people who are into the things you’re quietly obsessed with. Start with a code. Stay for the conversation.</p>
            <div className="mt-9 space-y-4 text-sm text-[#d4c5b8]"><div className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1c15] text-[#ff5a1f]">01</span>Share your one-of-one connection code.</div><div className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1c15] text-[#ff5a1f]">02</span>Find your people across campus.</div><div className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1c15] text-[#ff5a1f]">03</span>Make the first move.</div></div>
          </div>
        </div>
      </section>

      <section id="spaces" className="bp-section border-t border-[#382b23] bg-[#21150f]">
        <div className="bp-reveal grid items-center gap-16 lg:grid-cols-[1.2fr_.8fr]">
          <div><div className="bp-mono mb-6 text-[10px] text-[#ff7442]">04 / Spaces</div><h2 className="bp-display max-w-[750px] text-6xl font-bold leading-[.88] lg:text-[7.8rem]">Make room<br />for the <span className="text-[#ff5a1f]">good<br />questions.</span></h2></div>
          <div className="space-y-5"><p className="text-lg leading-8 text-[#b8a99a]">Live sessions for curious people. Drop in when there’s something worth learning. Ask the question everyone else was thinking.</p><div className="overflow-hidden rounded-2xl border border-[#61432d] bg-[#17110d]"><img src={spacesImage} alt="Breakpoint live spaces" className="h-48 w-full object-cover object-top opacity-80" /><div className="p-5"><div className="bp-mono text-[9px] text-[#ff7442]">ON AIR WHEN IT MATTERS</div><div className="mt-3 flex items-center justify-between"><span className="text-lg font-semibold">Nothing live right now.</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff5a1f] text-[#180d07]"><Play size={14} fill="currentColor" /></span></div></div></div></div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-36 text-center lg:py-52">
        <div className="bp-glow bp-pulse left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-[#ff5a1f]/20" />
        <div className="relative z-10 bp-reveal mx-auto max-w-[900px]"><div className="bp-mono mb-7 text-[10px] text-[#ff7442]">A better place to begin</div><h2 className="bp-display text-6xl font-bold leading-[.86] lg:text-[9.5rem]">Don’t just<br /><span className="text-[#ff5a1f]">scroll.</span><br />arrive.</h2><p className="mx-auto mt-10 max-w-[450px] text-lg leading-7 text-[#aa9c90]">The next interesting thing is probably closer than you think.</p><a href={playStoreUrl} target="_blank" rel="noreferrer" data-testid="button-join-final" className="bp-button bp-button-primary mt-10 px-8 py-4 text-sm font-bold">Get on the signal <ArrowRight size={17} /></a></div>
      </section>

      <footer className="border-t border-[#3b2d25] px-5 py-10 lg:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><Logo /><p className="mt-3 text-xs text-[#82746a]">Worth stopping for.</p></div><div className="flex gap-5 text-xs text-[#8f8176]"><button type="button" onClick={() => setModalOpen(true)} data-testid="button-footer-join" className="transition-colors hover:text-[#ff5a1f]">Join the beta</button><button type="button" onClick={() => scrollTo('top')} data-testid="button-back-top" className="transition-colors hover:text-[#ff5a1f]">Back to top ↑</button><span className="flex items-center gap-2"><Instagram size={14} /> @breakpoint</span></div><div className="bp-mono text-[9px] text-[#61564e]">© 2025 BREAKPOINT / BY MANAS</div></div>
      </footer>

      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0806]/85 px-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Join Breakpoint beta">
        <div className="relative w-full max-w-[500px] rounded-3xl border border-[#63442e] bg-[#21150f] p-7 shadow-2xl lg:p-10"><button type="button" onClick={() => setModalOpen(false)} data-testid="button-close-modal" className="absolute right-5 top-5 rounded-full border border-[#624632] p-2 text-[#b19e8d] transition-colors hover:text-[#ff5a1f]"><X size={17} /></button>{joined ? <div className="py-8 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff5a1f] text-[#160b05]"><Check size={30} /></div><h3 className="bp-display mt-7 text-4xl font-bold">You’re on<br />the signal.</h3><p className="mt-4 text-[#ad9c8c]">We’ll let you know when the next good thing is ready.</p><button type="button" onClick={() => setModalOpen(false)} data-testid="button-done-modal" className="bp-button bp-button-ghost mt-8 px-6 py-3 text-sm">Close</button></div> : <><div className="bp-mono text-[10px] text-[#ff7442]">EARLY ACCESS / 01</div><h3 className="bp-display mt-5 text-5xl font-bold leading-[.9]">Keep a little<br /><span className="text-[#ff5a1f]">wonder</span> handy.</h3><p className="mt-5 max-w-[370px] text-sm leading-6 text-[#ad9c8c]">Join the first wave of people building a more interesting internet. No spam. No corporate newsletters. Just the good stuff.</p><form onSubmit={(event) => { event.preventDefault(); setJoined(true); }} className="mt-8 flex flex-col gap-3"><input type="email" required placeholder="your@curious.email" aria-label="Email address" data-testid="input-email" className="rounded-full border border-[#5b4030] bg-[#160f0b] px-5 py-4 text-sm text-[#f5f0e8] outline-none placeholder:text-[#76675e] focus:border-[#ff5a1f]" /><button type="submit" data-testid="button-submit-email" className="bp-button bp-button-primary px-5 py-4 text-sm font-bold">Save me a spot <ArrowRight size={16} /></button></form><div className="mt-5 flex items-center gap-2 text-[10px] text-[#76675e]"><Plus size={13} className="text-[#ff5a1f]" /> Early access, curious conversations, zero noise.</div></>}</div>
      </div>}
    </main>
  );
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={() => <div className="min-h-screen bg-[#100d08] p-10 text-[#f5f0e8]">Page not found.</div>} /></Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><ErrorBoundary resetKey={useLocation()[0]}><Router /></ErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;