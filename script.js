"use strict";
const siteLanguage = document.documentElement.lang === "vi" ? "vi" : "en";
const t = (vi, en) => (siteLanguage === "vi" ? vi : en);
const siteRoot = new URL("../", window.location.href);
try {
  localStorage.setItem("phat-language", siteLanguage);
} catch (_) {}

document.documentElement.classList.add("js");

// Drive chỉ nhận file trên drive.google.com; giữ resourcekey nếu link cần nó.
const drivePlayers = new Map();
function driveUrls(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "drive.google.com")
      return null;
    const id =
      url.pathname.match(/\/file\/d\/([A-Za-z0-9_-]+)/)?.[1] ||
      url.searchParams.get("id");
    if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) return null;
    const preview = new URL(
      "https://drive.google.com/file/d/" + id + "/preview",
    );
    const view = new URL("https://drive.google.com/file/d/" + id + "/view");
    const key = url.searchParams.get("resourcekey");
    if (key) {
      preview.searchParams.set("resourcekey", key);
      view.searchParams.set("resourcekey", key);
    }
    return { preview: preview.href, view: view.href };
  } catch (_) {
    return null;
  }
}
function unloadDrivePlayers() {
  drivePlayers.forEach((reset) => reset());
}
function prepareDrive(mount, urls, kind, title) {
  mount.className = "drive-mount";
  mount.dataset.kind = kind || "video";
  function reset() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button drive-play";
    button.textContent = t("Phát trên trang", "Play here");
    button.addEventListener("click", () => {
      document
        .querySelectorAll("audio, video")
        .forEach((media) => media.pause());
      unloadDrivePlayers();
      const iframe = document.createElement("iframe");
      iframe.src = urls.preview;
      iframe.title = title;
      iframe.allow = "autoplay; fullscreen";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      mount.replaceChildren(iframe);
    });
    mount.replaceChildren(button);
  }
  drivePlayers.set(mount, reset);
  reset();
}
function setDriveLink(element, urls) {
  element.replaceChildren();
  element.hidden = !urls;
  if (!urls) return;
  const link = document.createElement("a");
  link.href = urls.view;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = t("Mở trên Google Drive ↗", "Open in Google Drive ↗");
  element.append(link);
}

// Accessible mobile navigation; full navigation remains available without JS.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
function closeMenu() {
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = t("Danh mục +", "Menu +");
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  menuButton.textContent = open
    ? t("Đóng −", "Close −")
    : t("Danh mục +", "Menu +");
});
navigation
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 961px)").addEventListener("change", closeMenu);

// Native controls provide seeking, volume and keyboard support.
// Only one media item can play at a time.
const mediaItems = [...document.querySelectorAll("audio, video")];
mediaItems.forEach((media) => {
  media.addEventListener("play", () => {
    unloadDrivePlayers();
    mediaItems.forEach((other) => {
      if (other !== media) other.pause();
    });
  });
  const showError = () => {
    const message = document.getElementById(
      media.getAttribute("data-error-id"),
    );
    if (message) message.hidden = false;
  };
  media.addEventListener("error", showError);
  media
    .querySelectorAll("source")
    .forEach((source) => source.addEventListener("error", showError));
});

// Static-site contact flow. No fabricated success messages or server dependency.
const config = window.PHAT_CONFIG || {};
const email = String(config.contactEmail || "").trim();
const hasEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/[\r\n]/.test(email);
const formEndpoint = String(config.formEndpoint || "").trim();
const canSend = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(formEndpoint);
document.querySelectorAll(".direct-contact").forEach((element) => {
  if (!hasEmail) return;
  const link = document.createElement("a");
  link.href = "mailto:" + email;
  link.className = "text-link";
  link.textContent = email;
  element.replaceChildren(link);
  element.hidden = false;
});

document.querySelectorAll(".contact-form").forEach((form) => {
  const submit = form.querySelector('[type="submit"]');
  const note = form.querySelector(".form-note");
  const status = form.querySelector(".form-status");
  const downloadButton = form.querySelector(".download-brief");
  const draftLabel =
    form.dataset.kind === "coaching"
      ? t("Lưu nhu cầu học ↓", "Save my learning brief ↓")
      : t("Lưu yêu cầu dự án ↓", "Save my project brief ↓");
  submit.disabled = false;
  submit.textContent = canSend
    ? t("Gửi yêu cầu", "Send inquiry")
    : hasEmail
    ? t("Soạn email liên hệ", "Continue in email")
    : draftLabel;
  note.textContent = canSend
    ? t(
        "Yêu cầu được gửi thẳng đến Phát. Phát sẽ trả lời qua email bạn điền, thường trong vòng 24 giờ.",
        "Your inquiry goes straight to Phát, who will reply to the email you entered, usually within 24 hours.",
      )
    : hasEmail
    ? t(
        "Nút này mở ứng dụng email với nội dung bạn đã điền. Hãy kiểm tra và bấm gửi trong ứng dụng email. Biểu mẫu này không tự gửi thông tin.",
        "This opens your email app. Review and send the email there. Nothing is submitted by this form.",
      )
    : t(
        "Lưu nội dung của bạn thành file văn bản. Bản xem thử chưa bật gửi liên hệ; yêu cầu của bạn sẽ chưa được gửi đi.",
        "Save your details as a text file. Online contact is not available on this preview; your brief will not be sent.",
      );
  downloadButton.hidden = !hasEmail || canSend;
  if (canSend && !form.querySelector('[name="_gotcha"]')) {
    // Ô bẫy chống thư rác: người thật không thấy, bot thường điền vào.
    const trap = document.createElement("input");
    trap.type = "text"; trap.name = "_gotcha"; trap.tabIndex = -1; trap.autocomplete = "off";
    trap.setAttribute("aria-hidden", "true");
    trap.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0";
    form.append(trap);
  }

  function makeBrief() {
    const data = new FormData(form);
    const labels = {
      name: t("Họ tên", "Name"),
      email: "Email",
      company: t("Công ty / Đơn vị thu âm", "Company / studio"),
      project: t("Nhu cầu", "Interest"),
      deadline: t("Thời gian dự kiến", "Timeline"),
      message: t("Nội dung", "Details"),
    };
    let brief = "PHÁT — " + form.dataset.title + "\n\n";
    for (const [key, label] of Object.entries(labels)) {
      const value = String(data.get(key) || "").trim();
      if (value) brief += label + ": " + value + "\n\n";
    }
    return brief;
  }
  function saveBrief() {
    const blob = new Blob([makeBrief()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "phat-" + form.dataset.kind + "-yeu-cau.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = t(
      "Nội dung đã được tạo để tải về. Yêu cầu chưa được gửi đến Phát.",
      "Your brief is ready to download. It has not been sent to Phát.",
    );
  }
  async function sendForm() {
    const data = new FormData(form);
    data.set("_subject", form.dataset.title + " — " + String(data.get("name") || "").trim());
    data.set("page", location.href);
    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = t("Đang gửi…", "Sending…");
    status.textContent = "";
    try {
      const response = await fetch(formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      status.textContent = t(
        "Đã gửi! Cảm ơn bạn, Phát sẽ trả lời qua email sớm nhất có thể.",
        "Sent! Thank you — Phát will reply by email as soon as possible.",
      );
    } catch (_) {
      status.textContent =
        t("Chưa gửi được. Vui lòng thử lại hoặc email trực tiếp đến ", "Could not send. Please try again or email ") +
        (hasEmail ? email : "Phát") + ".";
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  }
  downloadButton.addEventListener("click", () => {
    if (form.reportValidity()) saveBrief();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (canSend) {
      sendForm();
      return;
    }
    if (!hasEmail) {
      saveBrief();
      return;
    }
    const subject =
      form.dataset.title + " — " + form.elements.name.value.trim();
    const mailto =
      "mailto:" +
      email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(makeBrief());
    if (mailto.length > 1800) {
      saveBrief();
      window.location.href =
        "mailto:" + email + "?subject=" + encodeURIComponent(subject);
      status.textContent =
        t(
          "Nội dung đã được tạo để tải về. Hãy đính kèm file trong ứng dụng email và gửi đến ",
          "Your brief is ready to download. Attach it in your email app and send it to ",
        ) +
        email +
        t(
          ". Chưa có thông tin nào được gửi đi.",
          ". Nothing has been sent yet.",
        );
    } else {
      window.location.href = mailto;
      status.textContent =
        t(
          "Tiếp tục trong ứng dụng email và bấm Gửi. Nếu ứng dụng không mở, hãy lưu nội dung ra file rồi gửi email đến ",
          "Continue in your email app and press Send. If it does not open, save your brief and email it to ",
        ) +
        email +
        ".";
    }
  });
});

// Thông báo kiểm tra biểu mẫu bằng tiếng Việt, độc lập với ngôn ngữ trình duyệt.
document
  .querySelectorAll(".contact-form input, .contact-form textarea")
  .forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
    field.addEventListener("invalid", () => {
      field.setCustomValidity("");
      if (field.validity.valueMissing)
        field.setCustomValidity(
          t("Vui lòng điền thông tin này.", "Please fill in this field."),
        );
      else if (field.validity.typeMismatch)
        field.setCustomValidity(
          t(
            "Vui lòng nhập địa chỉ email hợp lệ.",
            "Please enter a valid email address.",
          ),
        );
    });
  });

// Dùng lại phần tử video để giữ chức năng dừng audio/video khi phát mục khác.
(() => {
  const gallery = document.getElementById("project-carousel");
  if (!gallery) return;
  const projects = Array.isArray(window.PHAT_PROJECTS)
    ? window.PHAT_PROJECTS.filter((item) => !item.languages || item.languages.includes(siteLanguage)).map((item) => ({
        ...item,
        ...(item[siteLanguage] || {}),
      })).filter(
        (item) =>
          item &&
          ((typeof item.video === "string" && item.video.trim()) ||
            (item.provider === "drive" && driveUrls(item.driveLink))),
      )
    : [];
  if (!projects.length) {
    gallery.closest("section").hidden = true;
    gallery.querySelector("video")?.pause();
    const empty = document.createElement("p");
    empty.className = "media-empty";
    empty.textContent = t("Chưa có video mẫu tiếng Việt. Bạn có thể nghe mẫu giọng ở đầu trang.", "English video samples are not available yet. Listen to the English voice sample above.");
    gallery.replaceChildren(empty);
    gallery.removeAttribute("aria-roledescription");
    return;
  }
  gallery.closest("section").hidden = false;
  const video = document.getElementById("project-video");
  const prev = document.getElementById("project-prev");
  const next = document.getElementById("project-next");
  const counter = document.getElementById("project-counter");
  let index = Math.max(
    0,
    projects.findIndex(
      (item) => item.id === new URLSearchParams(location.search).get("video"),
    ),
  );
  function renderProject() {
    const item = projects[index];
    gallery.dataset.projectId = item.id || "";
    unloadDrivePlayers();
    const stage = document.getElementById("project-media-stage");
    let embed = document.getElementById("project-embed");
    if (!embed) {
      embed = document.createElement("div");
      embed.id = "project-embed";
      stage.append(embed);
    }
    const drive = item.provider === "drive" ? driveUrls(item.driveLink) : null;
    video.hidden = Boolean(drive);
    embed.hidden = !drive;
    const driveLink = document.getElementById("project-drive-link");
    if (driveLink) setDriveLink(driveLink, drive);
    if (drive)
      prepareDrive(embed, drive, item.kind || "video", item.title || "Media");
    video.pause();
    const error = document.getElementById("video-error");
    if (error) error.hidden = true;
    const source = video.querySelector("source");
    if (!drive) window.PhatMedia.load(video, new URL(item.video, siteRoot).href, item.playlist ? new URL(item.playlist, siteRoot).href : null);
    else window.PhatMedia.cancel();
    if (item.poster)
      video.setAttribute("poster", new URL(item.poster, siteRoot).href);
    else video.removeAttribute("poster");
    video.setAttribute(
      "aria-label",
      t("Video sản phẩm: ", "Project video: ") +
        (item.title || t("Chưa đặt tên", "Untitled")),
    );
    // A source changes only when selecting another project, never when seeking.
    for (const key of [
      "title",
      "category",
      "description",
      "role",
      "studio",
      "language",
      "format",
    ]) {
      document.getElementById("project-" + key).textContent = item[key] || "—";
    }
    counter.textContent =
      String(index + 1).padStart(2, "0") +
      " / " +
      String(projects.length).padStart(2, "0");
    counter.setAttribute(
      "aria-label",
      t("Sản phẩm ", "Project ") +
        (index + 1) +
        t(" trên ", " of ") +
        projects.length +
        ": " +
        (item.title || t("Chưa đặt tên", "Untitled")),
    );
    prev.disabled = next.disabled = projects.length < 2;
  }
  function move(step) {
    index = (index + step + projects.length) % projects.length;
    renderProject();
  }
  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  // Chỉ dùng phím mũi tên khi đang đặt focus ở cụm điều hướng.
  gallery
    .querySelector(".project-controls")
    .addEventListener("keydown", (event) => {
      if (projects.length < 2) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
  // Cho phép phần khác của trang (ví dụ logo thương hiệu) mở đúng một video.
  window.PhatShowProject = (id) => {
    const found = projects.findIndex((item) => item.id === id);
    if (found < 0) return false;
    index = found;
    renderProject();
    gallery.closest("section").scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };
  renderProject();
  gallery.querySelector(".project-controls").hidden = false;
})();

// Chuyển đúng trang và giữ mục đang đọc; URL được dùng để chia sẻ trực tiếp.
document.querySelectorAll("[data-language]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.dataset.language === siteLanguage) {
      event.preventDefault();
      return;
    }
    const sections = [...document.querySelectorAll("main section[id]")];
    const anchor = sections.reduce(
      (best, section) => {
        const rect = section.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 105),
        );
        return visible > best.visible ? { section, visible } : best;
      },
      { section: sections[0], visible: 0 },
    ).section;
    const target = new URL(link.href);
    target.hash = anchor?.id || "";
    const projectId =
      document.getElementById("project-carousel")?.dataset.projectId;
    if (projectId) target.searchParams.set("video", projectId);
    link.href = target.href;
    try {
      localStorage.setItem("phat-language", link.dataset.language);
    } catch (_) {}
  });
});

// Demo MP3 có thể dùng file trực tiếp hoặc trình xem của Drive.
(() => {
  const mount = document.getElementById("demo-mount");
  if (!mount) return;
  const demos = window.PHAT_DEMO || {};
  const demo = demos[siteLanguage] || demos;
  const urls = demo.provider === "drive" ? driveUrls(demo.driveLink) : null;
  if (urls) {
    mount.querySelector("audio")?.pause();
    prepareDrive(mount, urls, "audio", t("Mẫu giọng đọc", "Voice demo"));
    setDriveLink(document.getElementById("demo-drive-link"), urls);
    document.getElementById("demo-download").hidden = true;
  } else if (demo.source) {
    const audio = mount.querySelector("audio");
    audio.querySelector("source").src = new URL(demo.source, siteRoot).href;
    audio.querySelector("source").type = demo.type || "audio/mpeg";
    audio.load();
    document.getElementById("demo-download").href = new URL(
      demo.download || demo.source,
      siteRoot,
    ).href;
    buildVoicePlayer(audio, demo.peaks);
  }
})();

// Trình phát riêng: nút phát lớn, sóng âm bấm để tua, thời gian. Thẻ <audio> gốc vẫn giữ để phát.
function buildVoicePlayer(audio, peaks) {
  if (!audio || audio.dataset.custom) return;
  audio.dataset.custom = "1";
  const bars = Array.isArray(peaks) && peaks.length ? peaks : Array.from({ length: 72 }, () => 0.5);
  const fmt = (s) => (isFinite(s) ? Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0") : "0:00");
  const player = document.createElement("div");
  player.className = "vo-player";
  const play = document.createElement("button");
  play.type = "button";
  play.className = "vo-play";
  const wave = document.createElement("div");
  wave.className = "vo-wave";
  wave.tabIndex = 0;
  wave.setAttribute("role", "slider");
  wave.setAttribute("aria-label", t("Tua mẫu giọng", "Seek voice demo"));
  wave.setAttribute("aria-valuemin", "0");
  for (const v of bars) {
    const bar = document.createElement("span");
    bar.style.height = Math.max(8, Math.round(v * 100)) + "%";
    wave.append(bar);
  }
  const time = document.createElement("span");
  time.className = "vo-time";
  player.append(play, wave, time);
  audio.after(player);
  audio.classList.add("vo-native");
  const spans = [...wave.children];
  const head = document.createElement("i");
  head.className = "vo-head";
  head.setAttribute("aria-hidden", "true");
  wave.append(head);
  let lit = -1;
  let dragFrac = null; // khi đang kéo: vị trí con trỏ (0–1), giao diện chạy theo tay kéo
  const paint = () => {
    const d = audio.duration;
    const c = dragFrac !== null && d ? dragFrac * d : audio.currentTime || 0;
    const p = d ? Math.min(Math.max(c / d, 0), 1) : 0;
    const n = Math.round(p * spans.length);
    if (n !== lit) { spans.forEach((b, i) => b.classList.toggle("on", i < n)); lit = n; }
    head.style.left = (p * 100).toFixed(2) + "%";
    time.textContent = fmt(c) + " / " + fmt(d);
    wave.setAttribute("aria-valuemax", String(Math.round(d || 0)));
    wave.setAttribute("aria-valuenow", String(Math.round(c)));
    wave.setAttribute("aria-valuetext", fmt(c));
    const playing = !audio.paused && !audio.ended;
    player.classList.toggle("is-playing", playing);
    play.setAttribute("aria-label", playing ? t("Tạm dừng", "Pause") : t("Phát mẫu giọng", "Play voice demo"));
  };
  // Dự phòng: nếu máy chủ không hỗ trợ tải từng đoạn (Range) thì trình duyệt không tua được.
  // Khi đó, lần đầu khách bấm, tải trọn file MP3 vào bộ nhớ rồi đổi sang bản đó để tua tự do.
  let local = null;
  const canSeek = () => audio.duration > 0 && audio.seekable.length > 0 && audio.seekable.end(0) >= audio.duration - 1;
  const ensureLocal = () => local || (local = (async () => {
    if (location.protocol === "file:" || canSeek()) return;
    try {
      const blob = await (await fetch(audio.currentSrc || audio.querySelector("source").src)).blob();
      const at = audio.currentTime, wasPlaying = !audio.paused;
      audio.src = URL.createObjectURL(blob);
      await new Promise((resolve) => audio.addEventListener("loadedmetadata", resolve, { once: true }));
      audio.currentTime = at;
      if (wasPlaying) audio.play().catch(() => {});
    } catch (_) {}
  })());
  play.addEventListener("click", () => {
    if (audio.paused) { audio.play().catch(() => {}); ensureLocal(); }
    else audio.pause();
  });
  const seekTo = async (fraction) => {
    if (!audio.duration) await new Promise((resolve) => { audio.addEventListener("loadedmetadata", resolve, { once: true }); audio.load(); });
    await ensureLocal();
    audio.currentTime = Math.min(Math.max(fraction, 0), 1) * audio.duration;
    paint();
  };
  // Kéo trên sóng âm: phần đỏ, vạch con trỏ và âm thanh chạy theo tay kéo theo thời gian thực.
  const fracAt = (event) => {
    const r = wave.getBoundingClientRect();
    return Math.min(Math.max((event.clientX - r.left) / r.width, 0), 1);
  };
  let frame = 0;
  const scrubAudio = () => {
    frame = 0;
    if (dragFrac !== null && audio.duration && canSeek()) audio.currentTime = dragFrac * audio.duration;
  };
  wave.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    wave.focus({ preventScroll: true });
    wave.setPointerCapture(event.pointerId);
    player.classList.add("is-scrubbing");
    dragFrac = fracAt(event);
    paint();
    if (!audio.duration) { audio.addEventListener("loadedmetadata", paint, { once: true }); audio.load(); }
    ensureLocal();
    if (!frame) frame = requestAnimationFrame(scrubAudio);
  });
  wave.addEventListener("pointermove", (event) => {
    if (dragFrac === null) return;
    dragFrac = fracAt(event);
    paint();
    if (!frame) frame = requestAnimationFrame(scrubAudio);
  });
  const endDrag = (event, commit) => {
    if (dragFrac === null) return;
    const f = event && commit ? fracAt(event) : dragFrac;
    dragFrac = null;
    player.classList.remove("is-scrubbing");
    if (commit) seekTo(f).then(() => { if (audio.paused) audio.play().catch(() => {}); });
    else paint();
  };
  wave.addEventListener("pointerup", (event) => endDrag(event, true));
  wave.addEventListener("pointercancel", () => endDrag(null, false));
  wave.addEventListener("keydown", (event) => {
    if (!audio.duration) return;
    const step = event.key === "ArrowRight" ? 5 : event.key === "ArrowLeft" ? -5 : 0;
    if (step) { event.preventDefault(); seekTo((audio.currentTime + step) / audio.duration); }
    else if (event.key === " " || event.key === "Enter") { event.preventDefault(); play.click(); }
  });
  ["timeupdate", "play", "pause", "ended", "loadedmetadata", "durationchange", "emptied"].forEach((e) => audio.addEventListener(e, paint));
  paint();
}

// Nút lên đầu trang: chỉ xuất hiện khi đã cuộn khỏi vị trí đầu.
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  function updateBackToTop() {
    backToTop.hidden = window.scrollY <= 80;
  }
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  window.addEventListener("pageshow", updateBackToTop);
  updateBackToTop();
  backToTop.addEventListener("click", () => {
    // Đưa focus về đầu để tiếp tục điều hướng bằng bàn phím khi nút ẩn.
    const logo = document.querySelector(".site-header .logo");
    logo?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  });
}

// Enlarged role artwork, with native modal keyboard behavior.
(() => {
 const dialog = document.querySelector('.artwork-dialog');
 if (!dialog) return;
 let opener;
 document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const img = dialog.querySelector('img');
  img.src = button.dataset.lightbox;
  img.alt = button.querySelector('img').alt;
  dialog.showModal();
  document.body.classList.add('modal-open');
 }));
 dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
 dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
})();

// Studio reel: continuous drift, direct dragging and an explicit pause control.
document.querySelectorAll('.studio-section').forEach(section => {
 const viewport = section.querySelector('.studio-marquee');
 const track = section.querySelector('.studio-track');
 const group = track.querySelector('.studio-group');
 const button = section.querySelector('.studio-motion');
 const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
 let width = group.getBoundingClientRect().width;
 let offset = 0, lastTime = 0, hovered = false, focused = false, dragging = null;
 let userPaused = false, visible = true;
 const wrap = x => width ? ((x % width) + width) % width : 0;
 const paint = () => { track.style.transform = `translate3d(${-offset}px, 0, 0)`; };
 const resize = () => {
  const next = group.getBoundingClientRect().width;
  offset = width ? offset / width * next : 0;
  width = next; paint();
 };
 new ResizeObserver(resize).observe(group);
 new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(viewport);
 viewport.querySelectorAll('img').forEach(img => { img.draggable = false; });
 const updateMotion = () => {
  button.hidden = reduce.matches;
  if (reduce.matches) { offset = 0; paint(); }
 };
 updateMotion(); reduce.addEventListener('change', updateMotion);
 button.addEventListener('click', () => {
  userPaused = !userPaused;
  section.classList.toggle('is-paused', userPaused);
  button.setAttribute('aria-pressed', String(userPaused));
  button.textContent = userPaused ? t('Tiếp tục', 'Resume') : t('Tạm dừng', 'Pause');
 });
 viewport.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hovered = true; });
 viewport.addEventListener('pointerleave', () => { hovered = false; });
 viewport.addEventListener('focus', () => { focused = viewport.matches(':focus-visible'); });
 viewport.addEventListener('blur', () => { focused = false; });
 viewport.addEventListener('pointerdown', e => {
  if (reduce.matches || !e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
  if (e.pointerType === 'mouse') e.preventDefault();
  dragging = { id: e.pointerId, x: e.clientX, offset };
  viewport.setPointerCapture(e.pointerId);
  viewport.classList.add('is-dragging');
 });
 viewport.addEventListener('pointermove', e => {
  if (!dragging || e.pointerId !== dragging.id) return;
  offset = wrap(dragging.offset + dragging.x - e.clientX); paint();
 });
 const endDrag = e => {
  if (!dragging || dragging.id !== e.pointerId) return;
  dragging = null; viewport.classList.remove('is-dragging');
  if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
  const box = viewport.getBoundingClientRect();
  hovered = e.pointerType === 'mouse' && e.clientX >= box.left && e.clientX <= box.right && e.clientY >= box.top && e.clientY <= box.bottom;
 };
 viewport.addEventListener('pointerup', endDrag);
 viewport.addEventListener('pointercancel', endDrag);
 viewport.addEventListener('lostpointercapture', e => { if (dragging?.id === e.pointerId) { dragging = null; viewport.classList.remove('is-dragging'); } });
 viewport.addEventListener('keydown', e => {
  if (reduce.matches || !['ArrowLeft','ArrowRight'].includes(e.key)) return;
  e.preventDefault(); offset = wrap(offset + (e.key === 'ArrowRight' ? 220 : -220)); paint();
 });
 const frame = now => {
  const delta = lastTime ? Math.min(now - lastTime, 64) : 0; lastTime = now;
  if (!reduce.matches && visible && !userPaused && !hovered && !focused && !dragging) {
   offset = wrap(offset + delta * 0.043); paint();
  }
  requestAnimationFrame(frame);
 };
 requestAnimationFrame(frame);
});

// Career milestones: native modal focus handling and cancellable, Unicode-safe typing.
(() => {
 const dialog = document.querySelector('.journey-dialog');
 if (!dialog) return;
 const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
 const typed = dialog.querySelector('.journey-typed');
 const skip = dialog.querySelector('.journey-skip');
 const buttons = Array.from(document.querySelectorAll('.journey-year'));
 const next = dialog.querySelector('.journey-next');
 const thanks = dialog.querySelector('.journey-thanks');
 let current = 0;
 let opener, frame = 0, closeTimer = 0, text = '', characters = [];
 const finish = () => {
  cancelAnimationFrame(frame);
  typed.textContent = text;
  typed.classList.remove('is-typing');
  skip.hidden = true;
 };
 const close = () => {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  cancelAnimationFrame(frame);
  if (reduce.matches) { dialog.close(); return; }
  dialog.classList.add('is-closing');
  closeTimer = setTimeout(() => dialog.close(), 220);
 };
 const showMilestone = (button, navigating = false) => {
  cancelAnimationFrame(frame);
  clearTimeout(closeTimer);
  if (!navigating) opener = button;
  current = buttons.indexOf(button);
  const following = buttons[current + 1];
  next.hidden = !following;
  thanks.hidden = Boolean(following);
  if (following) {
   const year = following.querySelector('.journey-date').textContent;
   next.querySelector('.journey-next-year').textContent = year;
   next.setAttribute('aria-label', document.documentElement.lang === 'vi' ? `Đến năm ${year}` : `Continue to ${year}`);
  }
  text = button.parentElement.querySelector('template').content.textContent.trim();
  characters = typeof Intl.Segmenter === 'function'
   ? Array.from(new Intl.Segmenter(document.documentElement.lang, {granularity:'grapheme'}).segment(text), part => part.segment)
   : Array.from(text);
  dialog.querySelector('.journey-modal-year').textContent = button.querySelector('.journey-date').textContent;
  dialog.querySelector('#journey-title').textContent = button.querySelector('.journey-caption').textContent;
  dialog.querySelector('#journey-description').textContent = text;
  dialog.querySelector('.journey-measure').textContent = text;
  typed.textContent = '';
  typed.classList.add('is-typing');
  skip.hidden = false;
  dialog.classList.remove('is-closing');
  if (!dialog.open) dialog.showModal();
  if (navigating && !following) dialog.querySelector('.journey-close').focus({preventScroll:true});
  document.body.classList.add('modal-open');
  if (reduce.matches) { finish(); return; }
  let start;
  const type = now => {
   if (start === undefined) start = now;
   const count = Math.min(characters.length, Math.floor((now - start) / 19));
   typed.textContent = characters.slice(0,count).join('');
   if (count < characters.length) frame = requestAnimationFrame(type);
   else finish();
  };
  frame = requestAnimationFrame(type);
 };
 buttons.forEach(button => button.addEventListener('click', () => showMilestone(button)));
 next.addEventListener('click', () => { if (buttons[current + 1]) showMilestone(buttons[current + 1], true); });
 skip.addEventListener('click', finish);
 dialog.querySelector('.journey-close').addEventListener('click', close);
 dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
 let outsideDown = false;
 const outside = event => { const r=dialog.getBoundingClientRect(); return event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom; };
 dialog.addEventListener('pointerdown', event => { outsideDown = event.target === dialog && outside(event); });
 dialog.addEventListener('click', event => { if (outsideDown && event.target === dialog && outside(event)) close(); outsideDown=false; });
 dialog.addEventListener('close', () => {
  cancelAnimationFrame(frame); clearTimeout(closeTimer);
  dialog.classList.remove('is-closing');
  document.body.classList.remove('modal-open');
  opener?.focus({preventScroll:true});
 });
 reduce.addEventListener('change', () => { if (dialog.open && reduce.matches) finish(); });
})();

/* Mark the featured player when the current video is vertical, so CSS can fill the side bars. */
(() => {
  const video = document.getElementById('project-video');
  const stage = video && video.closest('.video-stage');
  if (!stage) return;
  const update = () => {
    const portrait = video.videoHeight > video.videoWidth;
    stage.classList.toggle('is-portrait', portrait);
    const poster = video.getAttribute('poster');
    if (portrait && poster) stage.style.setProperty('--stage-backdrop', `url("${new URL(poster, location.href).href}")`);
    else stage.style.removeProperty('--stage-backdrop');
  };
  video.addEventListener('loadedmetadata', update);
  video.addEventListener('emptied', () => stage.classList.remove('is-portrait'));
})();

/* Logo thương hiệu có TVC trong phần Sản phẩm tiêu biểu: bấm để xem đúng video đó. */
(() => {
  const map = { "TH true FOOD": "th-true-food", "vivo": "vivo-y39", "Traveloka": "traveloka" };
  if (typeof window.PhatShowProject !== "function") return;
  document.querySelectorAll(".brands-grid .logo-cell img").forEach((img) => {
    const id = map[img.alt];
    if (!id) return;
    const cell = img.closest(".logo-cell");
    cell.classList.add("has-video");
    cell.setAttribute("role", "button");
    cell.tabIndex = 0;
    const label = t("Xem TVC ", "Watch the ") + img.alt + t("", " TV spot");
    cell.setAttribute("aria-label", label);
    cell.title = label;
    const open = () => window.PhatShowProject(id);
    cell.addEventListener("click", open);
    cell.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });
})();
