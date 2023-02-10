package dev.unicas.aida.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.unicas.aida.springboot.model.People;
import dev.unicas.aida.springboot.service.PeopleService;

@RestController
@RequestMapping("/people")
@CrossOrigin(origins = "http://localhost:4200")
public class PeopleController {
	
	@Autowired
	private PeopleService service;

	@GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<People> findAll() {
		return service.findAll();
	}

	@PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public People save(@RequestBody People author) {
		return this.service.save(author);
	}
}
