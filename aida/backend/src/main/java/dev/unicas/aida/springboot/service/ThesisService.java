package dev.unicas.aida.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Thesis;
import dev.unicas.aida.springboot.model.ThesisLang;
import dev.unicas.aida.springboot.repository.ThesisLangRepository;
import dev.unicas.aida.springboot.repository.ThesisRepository;

@Service
public class ThesisService {

	@Autowired
	public ThesisRepository repository;
	
	@Autowired
	public ThesisLangRepository langRepository;

	public Thesis save(Thesis n) {
		this.repository.save(n);
		saveLanguages(n);
		return n;
	}

	public Thesis edit(Thesis n, Integer id) throws Exception {
		Optional<Thesis> thesis = findById(id);
		if (thesis.isPresent()) {
			Thesis p = thesis.get();
			deleteLanguages(n);
			p.setFile(n.getFile());
			p.setLangs(n.getLangs());
			saveLanguages(p);
			return this.repository.save(p);
		} else {
			throw new Exception("Not found");
		}
	}
	
	private void saveLanguages(Thesis thesis) {
		for (ThesisLang lang : thesis.getLangs()) {
			lang.setThesis(thesis);
			this.langRepository.save(lang);
		}
	}

	private void deleteLanguages(Thesis thesis) {
		for (ThesisLang lang : thesis.getLangs()) {
			this.langRepository.delete(lang);
		}
	}

	public List<Thesis> findAll() {
		return (List<Thesis>) this.repository.findAllByOrderByCreationDateDesc();
	}

	public Optional<Thesis> findById(Integer id) {
		return this.repository.findById(id);
	}

	public boolean delete(Integer id) {
		Optional<Thesis> entity = this.repository.findById(id);
		this.deleteLanguages(entity.get());
		this.repository.deleteById(id);
		return true;
	}
}
