package dev.unicas.aida.springboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class ResearchLang {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idResearchLang;

	private String title;

	private String description;

	private String language;

	@ManyToOne
	@JoinColumn(name = "id_research", nullable = false)
	@JsonBackReference
	private Research research;

	public ResearchLang() {
	}

	public ResearchLang(Integer idResearchLang, String title, String description, String language, Research research) {
		super();
		this.idResearchLang = idResearchLang;
		this.title = title;
		this.description = description;
		this.language = language;
		this.research = research;
	}

	public Integer getIdResearchLang() {
		return idResearchLang;
	}

	public void setIdResearchLang(Integer idResearchLang) {
		this.idResearchLang = idResearchLang;
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

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public Research getResearch() {
		return research;
	}

	public void setResearch(Research research) {
		this.research = research;
	}

}