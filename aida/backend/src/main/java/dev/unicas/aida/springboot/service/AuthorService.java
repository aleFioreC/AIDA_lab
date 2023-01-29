package dev.unicas.aida.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Author;
import dev.unicas.aida.springboot.repository.AuthorRepository;

@Service
public class AuthorService {

	@Autowired
	public AuthorRepository repository;

	public Author save(Author n) {
		this.repository.save(n);
		return n;
	}

	public List<Author> findAll() {
		return (List<Author>) this.repository.findAll();
	}
	
}
