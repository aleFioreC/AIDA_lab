package dev.unicas.aida.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.People;
import dev.unicas.aida.springboot.repository.PeopleRepository;

@Service
public class PeopleService {

	@Autowired
	public PeopleRepository repository;

	public People save(People n) {
		this.repository.save(n);
		return n;
	}

	public List<People> findAll() {
		return (List<People>) this.repository.findAll();
	}
	
}
