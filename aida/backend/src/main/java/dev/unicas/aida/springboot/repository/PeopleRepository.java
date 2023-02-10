package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.People;

public interface PeopleRepository extends CrudRepository<People, Integer> {


}