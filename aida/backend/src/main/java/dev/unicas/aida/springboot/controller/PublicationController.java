package dev.unicas.aida.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.unicas.aida.springboot.model.dto.PublicationDto;
import dev.unicas.aida.springboot.service.PublicationService;

@RestController
@RequestMapping("/publication")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicationController {
	
	@Autowired
	private PublicationService service;

	@GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PublicationDto> findAll() {
		return service.findAll();
	}

}
