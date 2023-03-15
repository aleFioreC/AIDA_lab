package dev.unicas.aida.springboot.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Thesis;
import dev.unicas.aida.springboot.repository.ThesisRepository;

@Service
public class ThesisService {

	@Autowired
	public ThesisRepository repository;

	public Thesis save(Thesis n) {
		this.repository.save(n);
		return n;
	}

	public Thesis edit(Thesis n, Integer id) throws Exception {
		Optional<Thesis> thesis = findById(id);
		if (thesis.isPresent()) {
			Thesis p = thesis.get();
			p = new Thesis(n.getTitle(), n.getDescription(), n.getFile(), new Date());
			return this.repository.save(p);
		} else {
			throw new Exception("Not found");
		}
	}

	public List<Thesis> findAll() {
		return (List<Thesis>) this.repository.findAllByOrderByCreationDateDesc();
	}

	public Optional<Thesis> findById(Integer id) {
		return this.repository.findById(id);
	}

	public boolean delete(Integer id) {
		this.repository.deleteById(id);
		;
		return true;
	}
}
