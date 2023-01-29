package dev.unicas.aida.springboot.repository;

import dev.unicas.aida.springboot.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

	User findUtenteByUsernameAndPassword(String username, String password);

}