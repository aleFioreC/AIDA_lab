package dev.unicas.aida.springboot.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Publication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idPublication;

	private String title;

	private String description;

	private Date creation_date;

	@ManyToMany(mappedBy = "publications")
	private Set<People> people;

	public Publication() {
	}

	public Publication(Integer idPublication, String title, String description, Date creation_date) {
		super();
		this.idPublication = idPublication;
		this.title = title;
		this.description = description;
		this.creation_date = creation_date;
	}

	public Integer getIdPublication() {
		return idPublication;
	}

	public void setIdPublication(Integer idPublication) {
		this.idPublication = idPublication;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(Date creation_date) {
		this.creation_date = creation_date;
	}

	public Set<People> getPeople() {
		return people;
	}

	public void setPeople(Set<People> people) {
		this.people = people;
	}

}
