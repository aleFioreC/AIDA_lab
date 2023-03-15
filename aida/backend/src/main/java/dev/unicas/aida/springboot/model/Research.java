package dev.unicas.aida.springboot.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Research {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idResearch;

	private String title;

	private String description;

	private Integer year;

	private Date creation_date;

    @OneToMany(mappedBy="research")
	private Set<ResearchFile> files;

	public Research() {
	}

	public Integer getIdResearch() {
		return idResearch;
	}

	public void setIdResearch(Integer idResearch) {
		this.idResearch = idResearch;
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

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Set<ResearchFile> getFiles() {
		return files;
	}

	public void setFiles(Set<ResearchFile> files) {
		this.files = files;
	}

}