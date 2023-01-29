package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.Author;

public interface AuthorRepository extends CrudRepository<Author, Integer> {


}