package dev.unicas.aida.springboot.controller;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.unicas.aida.springboot.model.User;
import dev.unicas.aida.springboot.model.dto.UserDto;
import dev.unicas.aida.springboot.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService service;

	@PostMapping(path = "/login")
	public ResponseEntity<UserDto> login(@RequestBody User input) {
		String psw = service.getEncodedPsw(input.getUsername());
		if (psw == null)
		    return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		if (input.getPassword() == null)
		    return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		byte[] pswDecoded = Base64.getDecoder().decode(psw);
		if (input.getPassword().equalsIgnoreCase(new String(pswDecoded))) {
			User user = service.getUser(input.getUsername());
		    UserDto userDto = new UserDto(user.getName(), user.getSurname());
			return new ResponseEntity<>(userDto, HttpStatus.OK);
		}
	    return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
	}

}
