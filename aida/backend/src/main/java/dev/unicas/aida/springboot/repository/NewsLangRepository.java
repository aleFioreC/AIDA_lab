package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.NewsLang;

public interface NewsLangRepository extends CrudRepository<NewsLang, Integer> {

}