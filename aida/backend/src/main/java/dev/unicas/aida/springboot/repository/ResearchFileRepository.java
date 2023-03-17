package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.ResearchFile;

public interface ResearchFileRepository extends CrudRepository<ResearchFile, Integer> {

}