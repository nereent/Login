// ===== Forget Password Logic =====

// جلب اللغة الحالية من localStorage
let currentLang = localStorage.getItem("lang") || "en";

// نصوص حسب اللغة
const texts = {
  en: {
    notRegistered: "This email is not registered!",
    resetTitle: "Reset Password",
    inputLabel: "Enter your new password",
    inputPlaceholder: "New password",
    save: "Save",
    cancel: "Cancel",
    successTitle: "Success",
    successText: "Password has been reset!",
    errorPassword: "Password must be at least 8 characters!"
  },
  ar: {
    notRegistered: "هذا البريد غير مسجل!",
    resetTitle: "إعادة تعيين كلمة المرور",
    inputLabel: "أدخل كلمة المرور الجديدة",
    inputPlaceholder: "كلمة المرور الجديدة",
    save: "حفظ",
    cancel: "إلغاء",
    successTitle: "تم بنجاح",
    successText: "تم إعادة تعيين كلمة المرور!",
    errorPassword: "يجب أن تكون كلمة المرور 8 أحرف على الأقل!"
  }
};

document.getElementById("forgetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const langText = texts[currentLang];
  let email = document.getElementById("forgetEmail").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email);

  // إذا كان البريد غير مسجل
  if (!user) {
    Swal.fire({
      icon: "error",
      title: langText.notRegistered
    });
    return;
  }

  // إدخال كلمة مرور جديدة
  Swal.fire({
    title: langText.resetTitle,
    input: "password",
    inputLabel: langText.inputLabel,
    inputPlaceholder: langText.inputPlaceholder,
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off"
    },
    showCancelButton: true,
    confirmButtonText: langText.save,
    cancelButtonText: langText.cancel,
    preConfirm: (password) => {
      if (!password || password.length < 8) {
        Swal.showValidationMessage(langText.errorPassword);
      }
      return password;
    }
  }).then(result => {
    if (result.isConfirmed) {
      user.password = result.value;
      localStorage.setItem("users", JSON.stringify(users));

      Swal.fire({
        icon: "success",
        title: langText.successTitle,
        text: langText.successText
      }).then(() => {
        // عدّل المسار حسب مكان صفحة تسجيل الدخول
        window.location.href = "../login/login.html";
      });
    }
  });
});
