package dev.unicas.aida.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.unicas.aida.springboot.model.User;
import dev.unicas.aida.springboot.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService service;

	@PostMapping(path = "/login")
	public String login(@RequestBody User user) {
		return service.getEncodedPsw(user.getUsername());
	}

}
