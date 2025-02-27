package com.grocery.app_server.controller;

import com.grocery.app_server.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    @PostMapping("/send")
    public void sendMessage(@RequestParam String message) {
        log.info("[KafkaController] Sending message to topic: {}, message: {}", "test-topic", message);
        kafkaProducerService.sendMessage("test-topic", message);
    }
}
