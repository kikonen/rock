package fi.ikari.rock.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import fi.ikari.rock.message.HelloMessage;
import fi.ikari.rock.model.Greeting;

@Controller
public class MessageController {
    private static final String TEMPLATE = "Hello, %s";

    private final AtomicLong counter = new AtomicLong();

    @MessageMapping("/hello")
    @SendTo("/topic/messages")
    public Greeting greeting(HelloMessage message) throws Exception {
        // simulated delay
        Thread.sleep(1000);

        String safeName = HtmlUtils.htmlEscape(message.getName());
        return new Greeting(counter.incrementAndGet(),
                            String.format(TEMPLATE, safeName));
    }
}
