package dev.unicas.aida.springboot.service;

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
			return this.repository.save(p);
		} else {
			throw new Exception("Not found");
		}
	}

	public List<Research> findAll() {
		try {
			List<Research> research = (List<Research>) this.repository.findAll();
			return research;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

	public Optional<Research> findById(Integer id) {
		return this.repository.findById(id);
	}

	public boolean delete(Integer id) {
		this.repository.deleteById(id);
		;
		return true;
	}
}
