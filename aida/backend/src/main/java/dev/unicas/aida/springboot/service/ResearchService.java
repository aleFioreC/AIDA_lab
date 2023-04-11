package dev.unicas.aida.springboot.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Research;
import dev.unicas.aida.springboot.model.ResearchFile;
import dev.unicas.aida.springboot.model.ResearchLang;
import dev.unicas.aida.springboot.repository.ResearchFileRepository;
import dev.unicas.aida.springboot.repository.ResearchLangRepository;
import dev.unicas.aida.springboot.repository.ResearchRepository;

@Service
public class ResearchService {

	@Autowired
	public ResearchRepository repository;

	@Autowired
	public ResearchFileRepository repositoryFile;

	@Autowired
	public ResearchLangRepository langRepository;
	
	public Research save(Research n) {
		this.repository.save(n);
		saveFiles(n);
		saveLanguages(n);
		return n;
	}

	public Research edit(Research res, Integer id) throws Exception {
		Optional<Research> research = findById(id);
		if (research.isPresent()) {
			this.delete(id);
			res.setCreation_date(new Date());
			this.repository.save(res);
			saveFiles(res);
			saveLanguages(res);
			return res;
		} else {
			throw new Exception("Not found");
		}
	}

	private void saveFiles(Research research) {
		for (ResearchFile file : research.getFiles()) {
			file.setResearch(research);
			this.repositoryFile.save(file);
		}
	}

	private void deleteFiles(Research research) {
		for (ResearchFile file : research.getFiles()) {
			this.repositoryFile.delete(file);
		}
	}
	
	private void saveLanguages(Research research) {
		for (ResearchLang lang : research.getLangs()) {
			lang.setResearch(research);
			this.langRepository.save(lang);
		}
	}

	private void deleteLanguages(Research research) {
		for (ResearchLang lang : research.getLangs()) {
			this.langRepository.delete(lang);
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
		this.deleteLanguages(entity.get());
		this.repository.deleteById(id);
		return true;
	}
}
