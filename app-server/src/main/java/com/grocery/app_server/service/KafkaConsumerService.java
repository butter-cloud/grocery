package com.grocery.app_server.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "test-topic", groupId = "test-consumer")
    public void consume(String message) {
        log.info("[KafkaConsumerService] Received message: {}", message);
    }
}
