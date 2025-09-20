document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("langToggleContainer");
  if (!container) return;

  // إنشاء زرار اللغة وإضافته
  const btn = document.createElement("button");
  btn.id = "langToggle";
  btn.style.cssText = "position:fixed;top:10px;right:10px;padding:6px 12px;cursor:pointer;z-index:9999;";

  // اللغة الحالية من localStorage أو افتراضياً إنجليزي
  let currentLang = localStorage.getItem("lang") || "en";
  btn.textContent = currentLang === "en" ? "AR" : "EN";
  container.appendChild(btn);

  // تطبيق اللغة
  function applyLanguage(lang) {
    // اتجاه الصفحة
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // تغيير النصوص
    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    // تغيير الـ placeholder
    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
      el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });
  }

  applyLanguage(currentLang);

  // عند الضغط على الزر
  btn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
    btn.textContent = currentLang === "en" ? "AR" : "EN";
  });
});
