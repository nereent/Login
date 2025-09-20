let form = document.getElementById("Register");

// ✅ Regex (إنجليزي أو عربي – أول حرف حرف ثم 3 حروف أو أكثر)
let nameRegX = /^[\p{L}][\p{L}\s]{2,}$/u;
let emailRegX = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
let passRegX  = /^.{8,}$/;

// ✅ جلب اللغة الحالية (افتراضي: إنجليزي)
let currentLang = localStorage.getItem("lang") || "en";

// ✅ النصوص
const texts = {
  en: {
    titleError: "Error",
    titleSuccess: "Success",
    firstNameError: "First name must start with a letter and be at least 3 letters!",
    lastNameError: "Last name must start with a letter and be at least 3 letters!",
    emailError: "Please enter a valid email!",
    passError: "Password must be at least 8 characters!",
    emailRegistered: "Email already registered!",
    success: "Account created successfully!"
  },
  ar: {
    titleError: "خطأ",
    titleSuccess: "نجاح",
    firstNameError: "يجب أن يبدأ الاسم الأول بحرف ويكون 3 أحرف على الأقل!",
    lastNameError: "يجب أن يبدأ اسم العائلة بحرف ويكون 3 أحرف على الأقل!",
    emailError: "الرجاء إدخال بريد إلكتروني صالح!",
    passError: "يجب أن تكون كلمة المرور 8 أحرف على الأقل!",
    emailRegistered: "هذا البريد مسجل بالفعل!",
    success: "تم إنشاء الحساب بنجاح!"
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let FN    = document.getElementById("FN").value.trim();
  let LN    = document.getElementById("LN").value.trim();
  let email = document.getElementById("email").value.trim();
  let pass  = document.getElementById("pass").value;

  const t = texts[currentLang];

  // ✅ التحقق من المدخلات
  if (!nameRegX.test(FN))
    return Swal.fire(t.titleError, t.firstNameError, "error");

  if (!nameRegX.test(LN))
    return Swal.fire(t.titleError, t.lastNameError, "error");

  if (!emailRegX.test(email))
    return Swal.fire(t.titleError, t.emailError, "error");

  if (!passRegX.test(pass))
    return Swal.fire(t.titleError, t.passError, "error");

  // ✅ التحقق من الإيميل
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email))
    return Swal.fire(t.titleError, t.emailRegistered, "error");

  // ✅ حفظ الحساب
  users.push({ firstName: FN, lastName: LN, email, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  // ✅ نجاح وإنهاء
  Swal.fire(t.titleSuccess, t.success, "success").then(() => {
    // تأكدي من المسار حسب مكان ملفاتك
    window.location.href = "../login/login.html";
  });
});