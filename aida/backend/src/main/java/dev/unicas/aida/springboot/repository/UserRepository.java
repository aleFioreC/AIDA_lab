package dev.unicas.aida.springboot.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findUserByUsername(String username);

}