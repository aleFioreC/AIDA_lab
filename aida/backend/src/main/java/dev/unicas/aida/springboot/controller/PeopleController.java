package dev.unicas.aida.springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public People findById(@PathVariable Integer id) {
    	Optional<People> people  = service.findById(id);
    	if (people.isPresent()) return people.get();
    	return null;
    }

	@PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public People save(@RequestBody People p) {
		return this.service.save(p);
	}
	
	@PutMapping(value = "/edit/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public People save(@RequestBody People p,@PathVariable Integer id) throws Exception {
		return this.service.edit(p,id);
	}
	
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable Integer id) {
		return this.service.delete(id);
    }
}
