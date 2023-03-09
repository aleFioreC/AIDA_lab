package dev.unicas.aida.springboot.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
	
	public Research edit(Research n, Integer id) throws Exception {
		Optional<Research> research = findById(id);
		if (research.isPresent()) {
			Research p = research.get();
			p = new Research(n.getTitle(), n.getDescription(), n.getYear(), n.getFile(), new Date());
			return this.repository.save(p);
		} else {
			throw new Exception("Not found");
		}
	}

	public List<Research> findAll() {
		return (List<Research>) this.repository.findAll();
	}
	
	public Optional<Research> findById(Integer id) {
		return this.repository.findById(id);
	}
	
	public boolean delete(Integer id) {
		this.repository.deleteById(id);;
		return true;
	}
}
