package com.company.platform.client.auth;

import com.company.platform.application.auth.AuthApplicationService;
import com.company.platform.application.auth.command.LoginCommand;
import com.company.platform.application.auth.command.RegisterCommand;
import com.company.platform.client.auth.dto.LoginRequest;
import com.company.platform.client.auth.dto.LoginResponse;
import com.company.platform.client.auth.dto.RegisterRequest;
import com.company.platform.client.security.JwtTokenProvider;
import com.company.platform.domain.user.model.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthApplicationService authApplicationService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(AuthApplicationService authApplicationService, JwtTokenProvider jwtTokenProvider) {
        this.authApplicationService = authApplicationService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@Validated @RequestBody RegisterRequest request) {
        RegisterCommand command = new RegisterCommand();
        command.setUsername(request.getUsername());
        command.setPassword(request.getPassword());
        authApplicationService.register(command);
        return Map.of("success", true);
    }

    @PostMapping("/login")
    public LoginResponse login(@Validated @RequestBody LoginRequest request) {
        LoginCommand command = new LoginCommand();
        command.setUsername(request.getUsername());
        command.setPassword(request.getPassword());
        User user = authApplicationService.login(command);
        String token = jwtTokenProvider.generateToken(user);
        return new LoginResponse(token, user.getUsername(), user.getRole());
    }

    @GetMapping("/profile")
    public Map<String, Object> profile(Principal principal) {
        return Map.of(
                "username", principal.getName()
        );
    }
}


