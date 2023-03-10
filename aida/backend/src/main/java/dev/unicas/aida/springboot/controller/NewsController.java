package dev.unicas.aida.springboot.controller;

import java.util.Date;
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

import dev.unicas.aida.springboot.model.News;
import dev.unicas.aida.springboot.service.NewsService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/news")
public class NewsController {
	
	@Autowired
	private NewsService service;

    @GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<News> findAll() {
    	return service.findAll();
    }
    
    @GetMapping(value = "/findTop", produces = MediaType.APPLICATION_JSON_VALUE)
    public News findTopNews() {
    	return service.findTopNews();
    }

    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public News findById(@PathVariable Integer id) {
    	Optional<News> news  = service.findById(id);
    	if (news.isPresent()) return news.get();
    	return null;
    }

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public News save(@RequestBody News news) {
    	news.setCreationDate(new Date());
		return this.service.save(news);
    }
    
	@PutMapping(value = "/edit/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public News edit(@RequestBody News p,@PathVariable Integer id) throws Exception {
		return this.service.edit(p, id);
	}
    
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable Integer id) {
		return this.service.delete(id);
    }

}
