package fi.ikari.rock.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fi.ikari.rock.model.Greeting;

@RestController
public class GreetingController {
    private static final String TEMPLATE = "Hello, %s";

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "Stranger") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(TEMPLATE, name));
    }
}
