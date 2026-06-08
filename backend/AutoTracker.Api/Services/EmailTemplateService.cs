namespace AutoTracker.Api.Services;

public class EmailTemplateService
{
  public string BuildEmailConfirmationTemplate(
      string fullName,
      string confirmationLink)
  {
    return BuildTemplate(
        "E-posta Adresinizi Doğrulayın",
        $"Merhaba {fullName},",
        "AutoTracker hesabınızı aktifleştirmek için aşağıdaki butona tıklayın.",
        "E-postamı Doğrula",
        confirmationLink,
        "Bu işlemi siz başlatmadıysanız bu e-postayı yok sayabilirsiniz."
    );
  }

  public string BuildPasswordResetTemplate(
      string fullName,
      string resetLink)
  {
    return BuildTemplate(
        "Şifre Sıfırlama Talebi",
        $"Merhaba {fullName},",
        "Yeni şifre belirlemek için aşağıdaki butona tıklayın.",
        "Şifremi Sıfırla",
        resetLink,
        "Bu işlemi siz başlatmadıysanız hesabınız güvendedir."
    );
  }

  private string BuildTemplate(
    string title,
    string greeting,
    string message,
    string buttonText,
    string buttonUrl,
    string footer)
  {
    return $@"
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
</head>
<body style='margin:0;padding:0;background:#eef4ff;font-family:Arial,Helvetica,sans-serif;'>

<table width='100%' cellpadding='0' cellspacing='0' style='background:#eef4ff;padding:40px 16px;'>
<tr>
<td align='center'>

<table width='100%' cellpadding='0' cellspacing='0'
style='max-width:620px;background:#ffffff;border-radius:22px;overflow:hidden;border:1px solid #dfe7ff;box-shadow:0 14px 40px rgba(40,65,133,.14);'>

<tr>
<td align='center' style='padding:34px 28px;background:linear-gradient(135deg,#3b60c5,#314286);'>
  <div style='font-size:42px;margin-bottom:10px;'>🚗</div>
  <h1 style='margin:0;color:#ffe082;font-size:30px;letter-spacing:.5px;'>AutoTracker</h1>
  <p style='margin:8px 0 0;color:#ffffff;font-size:14px;'>Araç Takip ve Masraf Yönetimi</p>
</td>
</tr>

<tr>
<td style='padding:38px 34px;text-align:left;'>

  <h2 style='margin:0 0 18px;color:#284185;font-size:25px;line-height:1.3;'>
    {title}
  </h2>

  <p style='margin:0 0 12px;color:#1c3967;font-size:16px;font-weight:bold;'>
    {greeting}
  </p>

  <p style='margin:0 0 28px;color:#4a5b75;font-size:15px;line-height:1.75;'>
    {message}
  </p>

  <div style='text-align:center;margin:34px 0;'>
    <a href='{buttonUrl}'
       style='display:inline-block;background:#3b60c5;color:#ffe082;text-decoration:none;font-weight:bold;padding:15px 30px;border-radius:14px;border:2px solid #f7d358;font-size:15px;'>
      {buttonText}
    </a>
  </div>

  <div style='background:#f7faff;border:1px solid #e3eafb;border-radius:14px;padding:16px 18px;margin-top:28px;'>
    <p style='margin:0;color:#6b7c93;font-size:13px;line-height:1.6;'>
      {footer}
    </p>
  </div>

</td>
</tr>

<tr>
<td align='center' style='padding:20px 24px;background:#f8fbff;color:#8a97aa;font-size:12px;border-top:1px solid #edf2ff;'>
  © AutoTracker — Vehicle Management Platform
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>";
  }
}