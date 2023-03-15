package dev.unicas.aida.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.unicas.aida.springboot.model.Programmi;
import dev.unicas.aida.springboot.service.ProgrammiService;

@RestController
@RequestMapping("/programmi")
@CrossOrigin(origins = "http://localhost:4200")
public class ProgrammiController {
	
	@Autowired
	private ProgrammiService service;

	@GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Programmi> findAll() {
		return service.findAll();
	}

}
