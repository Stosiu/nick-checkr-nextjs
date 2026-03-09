'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// Large pool so 32 visible slots rarely repeat
const USERNAME_POOL = [
  'cooldev42', 'jane_doe', 'pixel_wizard', 'code_ninja',
  'dark_knight', 'n00bmaster', 'taken_already', 'try_again',
  'not_found', 'username123', 'the_real_one', 'just_a_nick',
  'hackerman', 'dev_null', 'root_user', 'ghost_writer',
  'byte_me', 'null_ptr', 'sudo_rm', 'git_push',
  'ctrl_alt_del', 'im_taken', 'pick_another', 'who_am_i',
  'error_404', 'name_taken', 'last_one', 'first_try',
  'xX_pro_Xx', 'mr_robot', 'neo_matrix', 'cloud9',
  // extra names to avoid duplicates
  'zer0day', 'overflow', 'stack_dev', 'open_src',
  'alice_dev', 'bob_coder', 'charlie_x', 'admin_nope',
  'test_user', 'john_doe', 'super_star', 'pro_gamer',
  'dark_mode', 'light_mode', 'vim_user', 'emacs_fan',
  'react_dev', 'next_ninja', 'type_safe', 'lint_free',
  'ship_it', 'hot_fix', 'zero_bugs', 'code_monk',
  'pixel_art', 'font_nerd', 'css_wizard', 'html_hero',
  'api_queen', 'data_dude', 'cloud_ops', 'dev_sec',
  'full_stack', 'back_end', 'front_end', 'mobile_dev',
  'ai_bot', 'ml_nerd', 'deep_learn', 'gpu_gang',
  'rust_fan', 'go_fast', 'py_snake', 'java_bean',
  'node_js', 'deno_run', 'bun_speed', 'ruby_gem',
  'swift_ui', 'kotlin_k', 'c_sharp', 'cpp_dev',
  'docker_whale', 'kube_lord', 'git_blame', 'ci_cd',
  'agile_af', 'scrum_lord', 'pr_review', 'merge_me',
  'npm_audit', 'yarn_add', 'pnpm_fast', 'turbo_repo',
  'vercel_ship', 'netlify_go', 'aws_lambda', 'gcp_run',
  'neon_glow', 'retro_wave', 'cyber_punk', 'vapor_wave',
  'lo_fi', 'hi_res', 'no_sleep', 'up_late',
  'coffee_code', 'tea_time', 'snack_dev', 'lunch_bug',
  'debug_duck', 'rubber_duck', 'quack_fix', 'duck_type',
];

type Color = 'white' | 'green' | 'red';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const COLS = 8;
const ROWS = 4;
const CELL_W = 100 / COLS;
const CELL_H = 100 / ROWS;
const SLOT_COUNT = COLS * ROWS;

// Global set of currently displayed names — no duplicates allowed
const activeNames = new Set<string>();

function pickUnique(exclude?: string): { name: string; color: Color } {
  let name: string;
  let attempts = 0;
  do {
    name = USERNAME_POOL[Math.floor(Math.random() * USERNAME_POOL.length)];
    attempts++;
  } while ((activeNames.has(name) || name === exclude) && attempts < 50);

  if (exclude) activeNames.delete(exclude);
  activeNames.add(name);

  const roll = Math.random();
  const color: Color = roll < 0.4 ? 'green' : roll < 0.7 ? 'red' : 'white';
  return { name, color };
}

// Assign initial names without duplicates
const initialNames: string[] = [];
for (let i = 0; i < SLOT_COUNT; i++) {
  let name: string;
  do {
    name = USERNAME_POOL[Math.floor(seededRandom(i * 47 + 13) * USERNAME_POOL.length)];
  } while (initialNames.includes(name));
  initialNames.push(name);
  activeNames.add(name);
}

const gridItems = initialNames.map((name, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const jitterX = seededRandom(i * 13 + 3) * 0.4 + 0.1;
  const jitterY = seededRandom(i * 7 + 1) * 0.4 + 0.2;

  return {
    initialName: name,
    index: i,
    top: row * CELL_H + jitterY * CELL_H,
    left: col * CELL_W + jitterX * CELL_W,
    baseOpacity: 0.08 + seededRandom(i * 11 + 5) * 0.10,
    size: 12 + Math.floor(seededRandom(i * 19 + 2) * 3),
    rotate: (seededRandom(i * 23 + 7) - 0.5) * 8,
    depth: 0.3 + seededRandom(i * 29 + 11) * 0.7,
    floatDelay: seededRandom(i * 31 + 13) * 6,
    floatDuration: 4 + seededRandom(i * 37 + 17) * 4,
    cycleInterval: 8000 + Math.floor(seededRandom(i * 41 + 19) * 12000), // 8-20s
  };
});

const colorMap: Record<Color, string> = {
  white: 'rgba(255, 255, 255, 1)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(248, 113, 113)',
};

export function HeroBackground({ loading }: { loading?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {gridItems.map((item) => (
        <FloatingUsername
          key={item.index}
          item={item}
          springX={springX}
          springY={springY}
        />
      ))}

      {loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="hero-scan-line absolute inset-0 opacity-[0.03]" />
          <div className="flex flex-col items-center gap-3 opacity-30">
            <div className="hero-pulse-ring h-12 w-12 rounded-full border-2 border-brand-400/40" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/30">
              Scanning...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingUsername({
  item,
  springX,
  springY,
}: {
  item: (typeof gridItems)[number];
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const [current, setCurrent] = useState({ name: item.initialName, color: 'white' as Color });
  const [typed, setTyped] = useState(item.initialName);
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cycle = useCallback(() => {
    const prev = current.name;
    const next = pickUnique(prev);
    setCurrent(next);

    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    let charIndex = 0;
    setTyped('');
    typeIntervalRef.current = setInterval(() => {
      charIndex++;
      setTyped(next.name.slice(0, charIndex));
      if (charIndex >= next.name.length) {
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
    }, 50 + Math.random() * 40);
  }, [current.name]);

  useEffect(() => {
    const timer = setInterval(cycle, item.cycleInterval);
    return () => {
      clearInterval(timer);
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, [cycle, item.cycleInterval]);

  const parallaxX = useTransform(springX, (v) => v * item.depth * 30);
  const parallaxY = useTransform(springY, (v) => v * item.depth * 20);

  return (
    <motion.span
      className="absolute select-none font-mono whitespace-nowrap"
      style={{
        top: `${item.top}%`,
        left: `${item.left}%`,
        fontSize: item.size,
        color: colorMap[current.color],
        opacity: item.baseOpacity,
        rotate: item.rotate,
        x: parallaxX,
        y: parallaxY,
      }}
      animate={{
        y: [0, -6, 0, 4, 0],
        x: [0, 3, 0, -2, 0],
      }}
      transition={{
        duration: item.floatDuration,
        delay: item.floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {typed}
      <span className="animate-pulse">|</span>
    </motion.span>
  );
}
