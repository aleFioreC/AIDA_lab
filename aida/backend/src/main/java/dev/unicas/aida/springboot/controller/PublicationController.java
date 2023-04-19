package dev.unicas.aida.springboot.controller;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import dev.unicas.aida.springboot.service.PublicationService;

@RestController
@RequestMapping("/publication")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicationController {
	
	@Autowired
	private PublicationService service;

	@GetMapping(value = "/findAll/{year}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String findAll(@PathVariable String year) throws JsonParseException, JsonMappingException, IOException, KeyManagementException, NoSuchAlgorithmException {
		return service.findAll(year);
	}

}
