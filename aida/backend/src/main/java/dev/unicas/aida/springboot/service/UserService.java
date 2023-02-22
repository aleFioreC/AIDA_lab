package dev.unicas.aida.springboot.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.User;
import dev.unicas.aida.springboot.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;

	public String getEncodedPsw(String username) {
		Optional<User> user = this.repository.findUserByUsername(username);
		if (user.isPresent())
			return user.get().getPassword();
		return null;
	}

	public User getUser(String username) {
		Optional<User> user = this.repository.findUserByUsername(username);
		if (user.isPresent())
			return user.get();
		return null;
	}

}
