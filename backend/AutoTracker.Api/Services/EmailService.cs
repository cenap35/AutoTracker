using MailKit.Net.Smtp;
using MailKit.Security;
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
        var fromEmail = _config["MailSettings:Email"];
        var host = _config["MailSettings:Host"];
        var port = int.Parse(_config["MailSettings:Port"]!);
        var password = _config["MailSettings:Password"];

        Console.WriteLine($"SMTP CONFIG => host:{host}, port:{port}, from:{fromEmail}, passwordExists:{!string.IsNullOrWhiteSpace(password)}");

        var email = new MimeMessage();

        email.From.Add(MailboxAddress.Parse(fromEmail!));
        email.To.Add(MailboxAddress.Parse(toEmail));
        email.Subject = subject;

        email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = body
        };

        using var smtp = new SmtpClient();

        try
        {
            Console.WriteLine("SMTP STEP 1: Connecting...");

            await smtp.ConnectAsync(
                host,
                port,
                SecureSocketOptions.Auto
            );

            Console.WriteLine("SMTP STEP 2: Connected");

            Console.WriteLine("SMTP STEP 3: Authenticating...");

            await smtp.AuthenticateAsync(
                fromEmail,
                password
            );

            Console.WriteLine("SMTP STEP 4: Authenticated");

            Console.WriteLine("SMTP STEP 5: Sending email...");

            await smtp.SendAsync(email);

            Console.WriteLine("SMTP STEP 6: EMAIL SENT TO: " + toEmail);

            await smtp.DisconnectAsync(true);

            Console.WriteLine("SMTP STEP 7: Disconnected");
        }
        catch (Exception ex)
        {
            Console.WriteLine("EMAIL ERROR:");
            Console.WriteLine(ex.ToString());
            throw;
        }
    }
}