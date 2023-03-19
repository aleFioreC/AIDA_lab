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

	private Integer year;

	private Date creation_date;

	@OneToMany(mappedBy = "research")
	private Set<ResearchLang> langs;

	@OneToMany(mappedBy = "research")
	private Set<ResearchFile> files;

	public Research() {
	}

	public Research(Integer idResearch, Integer year, Date creation_date, Set<ResearchLang> langs,
			Set<ResearchFile> files) {
		super();
		this.idResearch = idResearch;
		this.year = year;
		this.creation_date = creation_date;
		this.langs = langs;
		this.files = files;
	}

	public Integer getIdResearch() {
		return idResearch;
	}

	public void setIdResearch(Integer idResearch) {
		this.idResearch = idResearch;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Date getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(Date creation_date) {
		this.creation_date = creation_date;
	}

	public Set<ResearchLang> getLangs() {
		return langs;
	}

	public void setLangs(Set<ResearchLang> langs) {
		this.langs = langs;
	}

	public Set<ResearchFile> getFiles() {
		return files;
	}

	public void setFiles(Set<ResearchFile> files) {
		this.files = files;
	}

}