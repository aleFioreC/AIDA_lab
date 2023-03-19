package dev.unicas.aida.springboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class ThesisLang {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idThesisLang;

	private String title;

	private String description;

	private String language;

	@ManyToOne
	@JoinColumn(name = "id_thesis", nullable = false)
	@JsonBackReference
	private Thesis thesis;

	public ThesisLang() {
	}

	public ThesisLang(Integer idThesisLang, String title, String description, String language, Thesis thesis) {
		super();
		this.idThesisLang = idThesisLang;
		this.title = title;
		this.description = description;
		this.language = language;
		this.thesis = thesis;
	}

	public Integer getIdThesisLang() {
		return idThesisLang;
	}

	public void setIdThesisLang(Integer idThesisLang) {
		this.idThesisLang = idThesisLang;
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

	public Thesis getThesis() {
		return thesis;
	}

	public void setThesis(Thesis thesis) {
		this.thesis = thesis;
	}

}