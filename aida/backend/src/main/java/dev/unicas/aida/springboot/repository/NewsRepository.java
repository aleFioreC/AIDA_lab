package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.News;


public interface NewsRepository extends CrudRepository<News, Integer> {
	
}
