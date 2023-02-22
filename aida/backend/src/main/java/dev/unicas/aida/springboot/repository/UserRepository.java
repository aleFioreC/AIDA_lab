package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	User findUserByUsername(String username);

}