using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace AutoTracker.Api.Services;

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var email = new MimeMessage();

        email.From.Add(MailboxAddress.Parse("test@autotracker.com"));
        email.To.Add(MailboxAddress.Parse(toEmail));

        email.Subject = subject;

        email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = body
        };

        using var smtp = new SmtpClient();

        await smtp.ConnectAsync(
            _config["MailSettings:Host"],
            int.Parse(_config["MailSettings:Port"]),
            false
        );

        await smtp.AuthenticateAsync(
            _config["MailSettings:Email"],
            _config["MailSettings:Password"]
        );

        await smtp.SendAsync(email);
        Console.WriteLine("EMAIL SENT TO: " + toEmail);

        await smtp.DisconnectAsync(true);
    }
}