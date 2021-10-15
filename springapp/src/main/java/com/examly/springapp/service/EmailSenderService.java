package com.examly.springapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendSimpleEmail(String toEmail,
                                String body,
                                String subject) throws MessagingException {
        // SimpleMailMessage message = new SimpleMailMessage();

        // message.setFrom("rakeshardhani@gmail.com");
        // message.setTo(toEmail);
        // message.setText(body,true);
        // message.setSubject(subject);

        // mailSender.send(message);
        // System.out.println("Mail Send...");
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        mimeMessage.setContent(body, "text/html"); /** Use this or below line **/
        helper.setText(body, true); // Use this or above line.
        helper.setTo(toEmail);
        helper.setSubject("This is the test message for testing gmail smtp server using spring mail");
        helper.setFrom("rakeshardhani@gmail.com");
        mailSender.send(mimeMessage);
        return("email sent...");
    }

    public String  sendEmailWithAttachment(String toEmail,
                                        String body,
                                        String subject,
                                        String attachment) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper
                = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("rakeshardhani@gmail.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setText(body);
        mimeMessageHelper.setSubject(subject);

        FileSystemResource fileSystem
                = new FileSystemResource(new File(attachment));

        mimeMessageHelper.addAttachment(fileSystem.getFilename(),
                fileSystem);

        mailSender.send(mimeMessage);
        System.out.println("Mail Send...");
        return("email sent..");

    }
}

