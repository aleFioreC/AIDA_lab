package dev.unicas.aida.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Research;
import dev.unicas.aida.springboot.model.ResearchFile;
import dev.unicas.aida.springboot.repository.ResearchFileRepository;
import dev.unicas.aida.springboot.repository.ResearchRepository;

@Service
public class ResearchService {

	@Autowired
	public ResearchRepository repository;

	@Autowired
	public ResearchFileRepository repositoryFile;

	public Research save(Research n) {
		this.repository.save(n);
		saveFiles(n);
		return n;
	}

	public Research edit(Research newR, Integer id) throws Exception {
		Optional<Research> research = findById(id);
		if (research.isPresent()) {
			Research r = research.get();
			deleteFiles(r);
			r.setTitle(newR.getTitle());
			r.setDescription(newR.getDescription());
			r.setYear(newR.getYear());
			r.setFiles(newR.getFiles());;
			saveFiles(r);
			return this.repository.save(r);
		} else {
			throw new Exception("Not found");
		}
	}

	private void saveFiles(Research newR) {
		for (ResearchFile file : newR.getFiles()) {
			file.setResearch(newR);
			this.repositoryFile.save(file);
		}
	}

	private void deleteFiles(Research old) {
		for (ResearchFile file : old.getFiles()) {
			this.repositoryFile.delete(file);
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

	public boolean delete(Integer id) 
	{
		Optional<Research> entity = this.repository.findById(id);
		this.deleteFiles(entity.get());
		this.repository.deleteById(id);
		return true;
	}
}
