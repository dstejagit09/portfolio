/* Totobot Widget — saitejadasari.com */
(function () {
  'use strict';

  /* ── Base URL (captured before any async) ── */
  var _src = document.currentScript ? document.currentScript.src : '';
  var BASE_URL = _src ? _src.replace(/\/widget\.js(\?.*)?$/, '') : 'https://chat-saitejadasari.vercel.app';

  var ACCENT       = '#C8E64A';
  var ACCENT_BG    = 'rgba(200,230,74,0.08)';
  var ACCENT_BORD  = 'rgba(200,230,74,0.2)';

  var QUICK_ACTIONS = [
    'Best projects for robotics roles',
    'What makes him different?',
    'UAV & drone experience',
    'Controls expertise',
    'Work at Honeywell',
    'ROS2 projects',
    'Education at ASU',
    'Python & MATLAB skills',
    'Teaching assistant role',
    'GPA & certifications',
    'Is he available to hire?',
    'How to contact him'
  ];

  var FALLBACK = {
    'Best projects for robotics roles': 'For robotics roles, his three strongest projects are: (1) **Fault-Tolerant Crazyflie** — motor failure recovery in <50ms showing deep controls expertise, (2) **Multi-Robot Task Allocation** — 5 TurtleBots with Hungarian & A* at 99% success showing ROS2 autonomy, (3) **Autonomous Drone Landing** — 8cm precision showing vision & controls integration. [View projects](https://saitejadasari.com/#bio)',
    'What makes him different?': 'Three things: (1) He bridges sim-to-hardware — every project goes from MATLAB/Gazebo to real robots, (2) He spans the full stack — controls, perception, planning, and embedded, (3) His Honeywell externship shows industry-grade aerospace work alongside academic research. [View experience](https://saitejadasari.com/#experience)',
    'UAV & drone experience': 'Hands-on UAV experience across three platforms: Crazyflie 2.1 (fault-tolerant control), Parrot Mambo (autonomous vision landing), and P80 heavy-payload multirotor (ArduPilot PID tuning at Marut Drones). Works with ArduPilot, Mission Planner, and direct PWM control. [View projects](https://saitejadasari.com/#bio)',
    'Controls expertise': 'Controls is his deepest area — PID for UAV stabilization, FDI with <50ms recovery, controller reconfiguration for degraded actuators, and LQR in simulation. He also teaches PID control and systems analysis to 90+ students as ASU TA. [View specs](https://saitejadasari.com/#telemetry)',
    'Work at Honeywell': "At Honeywell Aerospace, he's architecting Sky Speak — an AI pilot training platform for the Anthem avionics ecosystem. Integrates voice stress analysis with CBTA competency grading to assess pilot cognitive load during ATC communications. Built a React instructor dashboard with real-time analytics. [View experience](https://saitejadasari.com/#experience)",
    'ROS2 projects': 'Uses ROS2 across multiple projects: multi-robot coordination with Nav2 for 5 TurtleBots, YOLOv8 inference as ROS nodes on ROSMaster X3, and a ROS2 test harness for automated Crazyflie flight scenarios. Works with Gazebo, TF2, and custom launch files. [View projects](https://saitejadasari.com/#bio)',
    'Education at ASU': '**MS Robotics and Autonomous Systems** at Arizona State University (Aug 2024–May 2026), GPA **3.89/4.0**. Coursework includes Aerial Robotics, Mechatronics, Multi-Robot Systems, and Controls & Systems. He is also a TA for MATLAB Programming and Controls labs. [View specs](https://saitejadasari.com/#telemetry)',
    'Python & MATLAB skills': 'Python is his primary language — ROS2 nodes, CV pipelines (OpenCV, YOLOv8), path planning (A*, Hungarian), and data analysis. MATLAB/Simulink is used for control design and digital twin simulation (drone landing, PID/LQR). He also teaches MATLAB to 90+ students. [View specs](https://saitejadasari.com/#telemetry)',
    'Teaching assistant role': 'ASU Teaching Assistant (Jan 2025–present) for 90+ students across 5 lab sections: **Intro to MATLAB Programming** and **Controls & Systems Lab** at Fulton Schools of Engineering. Runs review sessions, office hours, and grades labs on PID control and systems analysis. [View experience](https://saitejadasari.com/#experience)',
    'GPA & certifications': 'GPA: **3.89/4.0** (MS Robotics, ASU). Certifications: **Universal Robots e-Series** (Core & Pro), **MathWorks AI** (ML & DL), **Hugging Face RL**, and **Udemy ROS/ROS2**. Publication: *SCADA-Based Substation Control Panel & Operations*. [View manifest](https://saitejadasari.com/#manifest)',
    'Is he available to hire?': 'Yes — Saiteja is **open to full-time roles, internships, research positions, and collaboration**. Target roles: Robotics Engineer, Controls Engineer, Autonomy Engineer, UAV Systems, Robotics SWE. Based in Tempe, AZ — graduating May 2026. [Get in touch](https://saitejadasari.com/#contact)',
    'How to contact him': 'Email: **totobotplus@gmail.com** | LinkedIn: [linkedin.com/in/sdasar38](https://www.linkedin.com/in/sdasar38/) | GitHub: [github.com/dstejagit09](https://github.com/dstejagit09). You can also use the contact form or download his CV from the Contact section. [Go to contact](https://saitejadasari.com/#contact)'
  };
  var FALLBACK_DEFAULT = "I can help with questions about Saiteja's projects, experience (Honeywell, ASU, Marut Drones), or technical skills (ROS2, controls, vision, UAV). What interests you?";

  /* ── Markdown mini-parser ── */
  function md(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  }

  /* ── Styles (injected into shadow DOM) ── */
  var CSS = '\
    :host { all: initial; font-size: 16px; }\
    *, *::before, *::after { box-sizing: border-box; }\
    \
    .btn {\
      position: fixed; bottom: 80px; right: 24px; z-index: 2147483640;\
      width: 52px; height: 52px; border-radius: 12px;\
      background: ' + ACCENT + '; border: none; cursor: pointer;\
      display: flex; align-items: center; justify-content: center;\
      box-shadow: 0 4px 20px rgba(200,230,74,0.25);\
      transition: transform 0.2s ease, box-shadow 0.2s ease;\
    }\
    .btn:hover { transform: scale(1.08); box-shadow: 0 6px 30px rgba(200,230,74,0.35); }\
    \
    .panel {\
      position: fixed; bottom: 144px; right: 24px; z-index: 2147483639;\
      width: 380px; max-height: 540px;\
      background: #111111; border: 1px solid #1e1e1a; border-radius: 16px;\
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);\
      display: flex; flex-direction: column; overflow: hidden;\
      transform: translateY(20px) scale(0.97); opacity: 0; pointer-events: none;\
      transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;\
    }\
    .panel.open { transform: translateY(0) scale(1); opacity: 1; pointer-events: all; }\
    \
    .hdr {\
      padding: 12px 14px; border-bottom: 1px solid #1e1e1a;\
      display: flex; align-items: center; gap: 10px; flex-shrink: 0;\
    }\
    .avatar {\
      width: 36px; height: 36px; border-radius: 8px;\
      background: #1a1a14; border: 1px solid ' + ACCENT + ';\
      display: flex; align-items: center; justify-content: center;\
      font-family: Outfit, sans-serif; font-weight: 700; font-size: 0.68rem;\
      color: ' + ACCENT + '; flex-shrink: 0; letter-spacing: 0.05em;\
    }\
    .hdr-info { flex: 1; min-width: 0; }\
    .hdr-name {\
      font-family: Outfit, sans-serif; font-weight: 600; font-size: 0.84rem;\
      color: #e8e4d9; margin: 0 0 2px;\
    }\
    .hdr-sub {\
      font-family: "JetBrains Mono", monospace; font-size: 0.58rem;\
      color: #4a4840; margin: 0; line-height: 1.3;\
    }\
    .badge {\
      font-family: "JetBrains Mono", monospace; font-size: 0.54rem;\
      color: #4ade80; background: rgba(74,222,128,0.1);\
      border: 1px solid rgba(74,222,128,0.2);\
      padding: 2px 7px; border-radius: 4px; flex-shrink: 0;\
    }\
    \
    .msgs {\
      flex: 1; overflow-y: auto; padding: 14px 12px;\
      display: flex; flex-direction: column; gap: 10px; min-height: 0;\
    }\
    .msgs::-webkit-scrollbar { width: 3px; }\
    .msgs::-webkit-scrollbar-track { background: transparent; }\
    .msgs::-webkit-scrollbar-thumb { background: #252520; border-radius: 2px; }\
    \
    .welcome { text-align: center; padding: 6px 0 12px; }\
    .wicon {\
      width: 38px; height: 38px; border-radius: 10px;\
      background: #1a1a14; border: 1px solid #252520;\
      display: inline-flex; align-items: center; justify-content: center;\
      margin-bottom: 10px;\
    }\
    .wtxt {\
      font-family: Outfit, sans-serif; font-size: 0.76rem; color: #5a5650;\
      line-height: 1.55; margin: 0;\
    }\
    \
    .qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }\
    .qa-btn {\
      font-family: "JetBrains Mono", monospace; font-size: 0.6rem;\
      color: #6a6660; background: transparent;\
      border: 1px solid #1e1e1a; border-radius: 6px;\
      padding: 7px 8px; cursor: pointer; text-align: left;\
      transition: all 0.15s ease; line-height: 1.35;\
    }\
    .qa-btn:hover { border-color: ' + ACCENT + '; color: ' + ACCENT + '; background: rgba(200,230,74,0.05); }\
    \
    .msg { display: flex; flex-direction: column; max-width: 90%; }\
    .msg.user { align-self: flex-end; align-items: flex-end; }\
    .msg.bot  { align-self: flex-start; align-items: flex-start; }\
    .bubble {\
      font-family: Outfit, sans-serif; font-size: 0.77rem; line-height: 1.6;\
      padding: 9px 12px; border-radius: 10px;\
    }\
    .msg.user .bubble { background: ' + ACCENT_BG + '; border: 1px solid ' + ACCENT_BORD + '; color: #d8d4c9; }\
    .msg.bot  .bubble { background: #181818; border: 1px solid #1e1e1a; color: #8a8677; }\
    .bubble strong { color: ' + ACCENT + '; font-weight: 600; }\
    .bubble a { color: ' + ACCENT + '; text-decoration: none; }\
    .bubble a:hover { text-decoration: underline; }\
    \
    .typing { background: #181818; border: 1px solid #1e1e1a; border-radius: 10px; padding: 10px 14px; display: flex; gap: 5px; align-items: center; }\
    .dot { width: 5px; height: 5px; border-radius: 50%; background: ' + ACCENT + '; opacity: 0.3; animation: bounce 1.2s ease-in-out infinite; }\
    .dot:nth-child(2) { animation-delay: 0.2s; }\
    .dot:nth-child(3) { animation-delay: 0.4s; }\
    @keyframes bounce { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }\
    \
    .inp-row {\
      padding: 10px 12px; border-top: 1px solid #1e1e1a; flex-shrink: 0;\
      display: flex; gap: 8px; align-items: flex-end;\
    }\
    .inp {\
      flex: 1; background: #0a0a0a; border: 1px solid #1e1e1a; border-radius: 8px;\
      padding: 8px 11px; font-family: "JetBrains Mono", monospace;\
      font-size: 0.7rem; color: #e8e4d9; outline: none; resize: none;\
      min-height: 36px; max-height: 80px; line-height: 1.45;\
      transition: border-color 0.15s;\
    }\
    .inp:focus { border-color: ' + ACCENT + '; }\
    .inp::placeholder { color: #3a3830; }\
    .send {\
      background: ' + ACCENT + '; border: none; border-radius: 8px;\
      width: 36px; height: 36px; cursor: pointer; flex-shrink: 0;\
      display: flex; align-items: center; justify-content: center;\
      transition: opacity 0.15s;\
    }\
    .send:hover { opacity: 0.85; }\
    .send:disabled { opacity: 0.35; cursor: not-allowed; }\
    \
    .footer { text-align: center; padding: 5px 0 10px; }\
    .close {\
      font-family: "JetBrains Mono", monospace; font-size: 0.6rem;\
      color: #3a3830; background: none; border: none; cursor: pointer;\
      transition: color 0.15s; letter-spacing: 0.1em;\
    }\
    .close:hover { color: #6a6660; }\
    \
    @media (max-width: 420px) {\
      .panel { width: calc(100vw - 32px); right: 16px; bottom: 136px; }\
      .btn   { right: 16px; bottom: 72px; }\
    }\
  ';

  /* ── SVGs ── */
  var CHAT_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#0a0a0a"/></svg>';
  var SEND_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="#0a0a0a"/></svg>';
  var BOT_SVG  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="' + ACCENT + '" opacity="0.15"/><path d="M12 6v6l4 2" stroke="' + ACCENT + '" stroke-width="1.5" stroke-linecap="round"/></svg>';

  /* ── Bootstrap fonts in host document ── */
  function loadFonts() {
    if (document.getElementById('sai-gfonts')) return;
    var l = document.createElement('link');
    l.id = 'sai-gfonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(l);
  }

  /* ── Widget init ── */
  function init() {
    if (document.getElementById('sai-chat-host')) return;
    loadFonts();

    /* Host element + shadow root */
    var host = document.createElement('div');
    host.id = 'sai-chat-host';
    document.body.appendChild(host);
    var shadow = host.attachShadow({ mode: 'open' });

    /* Inject style */
    var styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    shadow.appendChild(styleEl);

    /* ── Trigger button ── */
    var btn = document.createElement('button');
    btn.className = 'btn';
    btn.setAttribute('aria-label', 'Open Totobot');
    btn.innerHTML = CHAT_SVG;
    shadow.appendChild(btn);

    /* ── Panel ── */
    var panel = document.createElement('div');
    panel.className = 'panel';

    /* Header */
    var hdr = document.createElement('div');
    hdr.className = 'hdr';
    hdr.innerHTML = '\
      <div class="avatar">T.B</div>\
      <div class="hdr-info">\
        <p class="hdr-name">Totobot</p>\
        <p class="hdr-sub">Guide to Saiteja\'s work &amp; experience</p>\
      </div>\
      <span class="badge">ONLINE</span>';
    panel.appendChild(hdr);

    /* Messages area */
    var msgs = document.createElement('div');
    msgs.className = 'msgs';

    /* Welcome */
    var welcome = document.createElement('div');
    welcome.className = 'welcome';
    welcome.innerHTML = '\
      <div class="wicon">' + BOT_SVG + '</div>\
      <p class="wtxt">Hey! I\'m Totobot, Saiteja\'s portfolio guide.<br>Ask me about projects, experience, or skills.</p>';
    msgs.appendChild(welcome);

    /* Quick actions */
    var qaGrid = document.createElement('div');
    qaGrid.className = 'qa-grid';
    QUICK_ACTIONS.forEach(function (q) {
      var b = document.createElement('button');
      b.className = 'qa-btn';
      b.textContent = q;
      b.addEventListener('click', function () { send(q); });
      qaGrid.appendChild(b);
    });
    msgs.appendChild(qaGrid);

    panel.appendChild(msgs);

    /* Input row */
    var inpRow = document.createElement('div');
    inpRow.className = 'inp-row';

    var inp = document.createElement('textarea');
    inp.className = 'inp';
    inp.placeholder = 'Ask about Saiteja...';
    inp.rows = 1;

    var sendBtn = document.createElement('button');
    sendBtn.className = 'send';
    sendBtn.setAttribute('aria-label', 'Send');
    sendBtn.innerHTML = SEND_SVG;

    inpRow.appendChild(inp);
    inpRow.appendChild(sendBtn);
    panel.appendChild(inpRow);

    /* Footer close */
    var footer = document.createElement('div');
    footer.className = 'footer';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.textContent = 'Close';
    footer.appendChild(closeBtn);
    panel.appendChild(footer);

    shadow.appendChild(panel);

    /* ── State ── */
    var open = false;
    var busy = false;
    var welcomeHidden = false;

    function togglePanel() {
      open = !open;
      panel.classList.toggle('open', open);
      if (open) { setTimeout(function () { inp.focus(); }, 250); }
    }

    function hideWelcome() {
      if (welcomeHidden) return;
      welcomeHidden = true;
      welcome.style.display = 'none';
      qaGrid.style.display = 'none';
    }

    function scrollBottom() {
      msgs.scrollTop = msgs.scrollHeight;
    }

    function addMsg(role, html, bubble) {
      hideWelcome();
      var wrap = document.createElement('div');
      wrap.className = 'msg ' + role;
      var b = bubble || document.createElement('div');
      if (!bubble) {
        b.className = 'bubble';
        b.innerHTML = html;
      }
      wrap.appendChild(b);
      msgs.appendChild(wrap);
      scrollBottom();
      return b;
    }

    function showTyping() {
      var wrap = document.createElement('div');
      wrap.className = 'msg bot';
      wrap.id = 'sai-typing';
      var t = document.createElement('div');
      t.className = 'typing';
      t.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
      wrap.appendChild(t);
      msgs.appendChild(wrap);
      scrollBottom();
    }

    function removeTyping() {
      var t = shadow.getElementById('sai-typing');
      if (t) t.remove();
    }

    function send(text) {
      text = (text || inp.value).trim();
      if (!text || busy) return;

      addMsg('user', md(text));
      inp.value = '';
      inp.style.height = 'auto';
      busy = true;
      sendBtn.disabled = true;
      showTyping();

      fetch(BASE_URL + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      .then(function (res) {
        if (!res.ok || !res.body) throw new Error('bad response');
        removeTyping();

        var botBubble = document.createElement('div');
        botBubble.className = 'bubble';
        addMsg('bot', '', botBubble);

        var full = '';
        var reader = res.body.getReader();
        var dec = new TextDecoder();
        var buf = '';

        function pump() {
          return reader.read().then(function (chunk) {
            if (chunk.done) {
              busy = false;
              sendBtn.disabled = false;
              return;
            }
            buf += dec.decode(chunk.value, { stream: true });
            var lines = buf.split('\n');
            buf = lines.pop(); // keep incomplete line
            lines.forEach(function (line) {
              if (!line.startsWith('data: ')) return;
              var payload = line.slice(6).trim();
              if (payload === '[DONE]') return;
              try {
                var d = JSON.parse(payload);
                if (d.text) {
                  full += d.text;
                  botBubble.innerHTML = md(full);
                  scrollBottom();
                }
              } catch (_) {}
            });
            return pump();
          });
        }
        return pump();
      })
      .catch(function () {
        removeTyping();
        var fb = FALLBACK[text] || FALLBACK_DEFAULT;
        addMsg('bot', md(fb));
        busy = false;
        sendBtn.disabled = false;
      });
    }

    /* ── Events ── */
    btn.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', togglePanel);
    sendBtn.addEventListener('click', function () { send(inp.value); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inp.value); }
    });
    inp.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 80) + 'px';
    });
  }

  /* ── Run ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
