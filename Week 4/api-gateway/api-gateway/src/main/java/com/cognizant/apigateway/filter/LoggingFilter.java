package com.cognizant.apigateway.filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class LoggingFilter {

    @Bean
    public HandlerFilterFunction<ServerResponse, ServerResponse> logFilter() {

        return (request, next) -> {

            System.out.println("Incoming Request : "
                    + request.method()
                    + " "
                    + request.uri());

            return next.handle(request);

        };
    }
}