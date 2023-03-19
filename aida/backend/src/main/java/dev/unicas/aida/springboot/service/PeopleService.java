package dev.unicas.aida.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.unicas.aida.springboot.model.People;
import dev.unicas.aida.springboot.repository.PeopleRepository;

@Service
public class PeopleService {

	@Autowired
	public PeopleRepository repository;

	public People save(People n) {
		this.repository.save(n);
		return n;
	}

	public People edit(People n, Integer id) throws Exception {
		Optional<People> people = findById(id);
		if (people.isPresent()) {
			People p = people.get();
			p.setName(n.getName());
			p.setSurname(n.getSurname());
			p.setEmail(n.getEmail());
			p.setNumber(n.getNumber());
			p.setAdditionalInfo(n.getAdditionalInfo());
			p.setFile(n.getFile());
			p.setRole(n.getRole());
			p.setRoleGroup(n.getRoleGroup());
			return this.repository.save(p);
		} else {
			throw new Exception("Not found");
		}
	}

	public List<People> findAll() {
		return (List<People>) this.repository.findAllByOrderByIdPeopleDesc();
	}

	public Optional<People> findById(Integer id) {
		return this.repository.findById(id);
	}

	public boolean delete(Integer id) {
		this.repository.deleteById(id);
		return true;
	}
}
