package dev.unicas.aida.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Research;
import dev.unicas.aida.springboot.repository.ResearchRepository;

@Service
public class ResearchService {

	@Autowired
	public ResearchRepository repository;

	public Research save(Research n) {
		this.repository.save(n);
		return n;
	}

	public List<Research> findAll() {
		return (List<Research>) this.repository.findAll();
	}
	
	public boolean delete(Integer id) {
		this.repository.deleteById(id);;
		return true;
	}
}
