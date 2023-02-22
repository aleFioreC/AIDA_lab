package dev.unicas.aida.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;

	public String getEncodedPsw(String username) {
		return this.repository.findUserByUsername(username).getPassword();
	}

}
