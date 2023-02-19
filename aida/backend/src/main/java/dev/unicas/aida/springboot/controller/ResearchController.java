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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.unicas.aida.springboot.model.Research;
import dev.unicas.aida.springboot.service.ResearchService;

@RestController
@RequestMapping("/research")
@CrossOrigin(origins = "http://localhost:4200")
public class ResearchController {
	
	@Autowired
	private ResearchService service;

	@GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Research> findAll() {
		return service.findAll();
	}
	
    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Research findById(@PathVariable Integer id) {
    	Optional<Research> research  = service.findById(id);
    	if (research.isPresent()) return research.get();
    	return null;
    }

	@PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public Research save(@RequestBody Research r) {
		return this.service.save(r);
	}
	
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable Integer id) {
		return this.service.delete(id);
    }
}
