package dev.unicas.aida.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.News;
import dev.unicas.aida.springboot.repository.NewsRepository;

@Service
public class NewsService {

	@Autowired
	public NewsRepository repository;

	public News save(News n) {
		this.repository.save(n);
		return n;
	}

	public List<News> findAll() {
		return (List<News>) this.repository.findAll();
	}
}
