// ======== Login Logic ========

let form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("pass").value;
  let remember = document.getElementById("rememberMe").checked;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === pass);

  if (!user) {
    Swal.fire("Error", "Invalid email or password!", "error");
  } else {
    Swal.fire("Success", "Login successful!", "success").then(() => {

      // حفظ المستخدم الحالي
      localStorage.setItem("currentUser", JSON.stringify(user));

      // تذكر الإيميل
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      // الانتقال لصفحة البروفايل
      window.location.href = "https://sweetalert2.github.io/";
    });
  }
});

// ✅ Auto-fill email if "Remember Me" used
window.addEventListener("DOMContentLoaded", () => {
  let rememberedEmail = localStorage.getItem("rememberEmail");
  if (rememberedEmail) {
    document.getElementById("email").value = rememberedEmail;
    document.getElementById("rememberMe").checked = true;
  }

  // 🔄 تطبيق اللغة المحفوظة
  let lang = localStorage.getItem("lang") || "en";
  applyLang(lang);
});

// ======== Delete Account ========
document.getElementById("deleteAccount").addEventListener("click", () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    Swal.fire("Error", "No user is logged in!", "error");
    return;
  }

  Swal.fire({
    title: "هل أنت متأكد؟",
    text: "سيتم حذف الحساب نهائيًا!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e63946",
    cancelButtonColor: "var(--main-color)",
    confirmButtonText: "نعم، احذف الحساب",
    cancelButtonText: "إلغاء"
  }).then((result) => {
    if (result.isConfirmed) {
      // حذف المستخدم من مصفوفة users
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users = users.filter(u => u.email !== currentUser.email);
      localStorage.setItem("users", JSON.stringify(users));

      // حذف المستخدم الحالي
      localStorage.removeItem("currentUser");

      Swal.fire({
        title: "تم الحذف!",
        text: "تم حذف الحساب بنجاح.",
        icon: "success",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        // إعادة توجيه لصفحة تسجيل الدخول
        window.location.href = "login.html";
      });
    }
  });
});

// ======== Multi Language Support ========
function applyLang(lang) {
  // placeholders
  document.querySelectorAll("[data-en-placeholder]").forEach(el => {
    el.placeholder = el.dataset[`${lang}Placeholder`];
  });

  // النصوص
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
}
