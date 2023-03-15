package dev.unicas.aida.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.Programmi;
import dev.unicas.aida.springboot.repository.ProgrammiRepository;

@Service
public class ProgrammiService {

	@Autowired
	public ProgrammiRepository repository;

	public List<Programmi> findAll() {
		return (List<Programmi>) this.repository.findAll();
	}

}
