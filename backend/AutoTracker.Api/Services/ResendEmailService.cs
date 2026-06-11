using Resend;

namespace AutoTracker.Api.Services;

public class ResendEmailService
{
    private readonly IResend _resend;

    public ResendEmailService(IResend resend)
    {
        _resend = resend;
    }

    public async Task SendEmailAsync(
        string toEmail,
        string subject,
        string body)
    {
        var message = new EmailMessage
        {
            From = "AutoTracker <onboarding@resend.dev>",
            Subject = subject,
            HtmlBody = body
        };

        message.To.Add(toEmail);

        var result = await _resend.EmailSendAsync(message);

        Console.WriteLine("RESEND EMAIL SENT");
    }
}