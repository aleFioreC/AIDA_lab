package dev.unicas.aida.springboot.model.iris;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IRISPublication {

	@JsonProperty("search.legacyid_i")
	private BigDecimal legacyid_i;

	private String handle;

	@JsonProperty("dateIssued.year")
	private BigDecimal year;

	@JsonProperty("dc.date.issued_dt")
	private String issued_dt;

	@JsonProperty("dc.identifier.doi")
	private String doi;

	@JsonProperty("dc.subject.keywords")
	private String keywords;

	@JsonProperty("dc.title")
	private String title;

	private String descriptionAbstractAll;

	@JsonProperty("dc.type.miur")
	private String miur;

	private BigDecimal score;

	private String collection;

	private String citation;

	private String authors;

	private String dateIssued;

	private String language;

	private IRISJournal journal;

	private String fulltextPresence;

	private String ssd;

	private String lastModified;

	private IRISCitation citationCount;

	private List<IRISPerson> person;

	private String stato;

	public IRISPublication() {
	}

	public IRISPublication(BigDecimal legacyid_i, String handle, BigDecimal year, String issued_dt, String doi,
			String keywords, String title, String descriptionAbstractAll, String miur, BigDecimal score,
			String collection, String citation, String authors, String dateIssued, String language, IRISJournal journal,
			String fulltextPresence, String ssd, String lastModified, IRISCitation citationCount, List<IRISPerson> person,
			String stato) {
		super();
		this.legacyid_i = legacyid_i;
		this.handle = handle;
		this.year = year;
		this.issued_dt = issued_dt;
		this.doi = doi;
		this.keywords = keywords;
		this.title = title;
		this.descriptionAbstractAll = descriptionAbstractAll;
		this.miur = miur;
		this.score = score;
		this.collection = collection;
		this.citation = citation;
		this.authors = authors;
		this.dateIssued = dateIssued;
		this.language = language;
		this.journal = journal;
		this.fulltextPresence = fulltextPresence;
		this.ssd = ssd;
		this.lastModified = lastModified;
		this.citationCount = citationCount;
		this.person = person;
		this.stato = stato;
	}

	public BigDecimal getLegacyid_i() {
		return legacyid_i;
	}

	public void setLegacyid_i(BigDecimal legacyid_i) {
		this.legacyid_i = legacyid_i;
	}

	public String getHandle() {
		return handle;
	}

	public void setHandle(String handle) {
		this.handle = handle;
	}

	public BigDecimal getYear() {
		return year;
	}

	public void setYear(BigDecimal year) {
		this.year = year;
	}

	public String getIssued_dt() {
		return issued_dt;
	}

	public void setIssued_dt(String issued_dt) {
		this.issued_dt = issued_dt;
	}

	public String getDoi() {
		return doi;
	}

	public void setDoi(String doi) {
		this.doi = doi;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescriptionAbstractAll() {
		return descriptionAbstractAll;
	}

	public void setDescriptionAbstractAll(String descriptionAbstractAll) {
		this.descriptionAbstractAll = descriptionAbstractAll;
	}

	public String getMiur() {
		return miur;
	}

	public void setMiur(String miur) {
		this.miur = miur;
	}

	public BigDecimal getScore() {
		return score;
	}

	public void setScore(BigDecimal score) {
		this.score = score;
	}

	public String getCollection() {
		return collection;
	}

	public void setCollection(String collection) {
		this.collection = collection;
	}

	public String getCitation() {
		return citation;
	}

	public void setCitation(String citation) {
		this.citation = citation;
	}

	public String getAuthors() {
		return authors;
	}

	public void setAuthors(String authors) {
		this.authors = authors;
	}

	public String getDateIssued() {
		return dateIssued;
	}

	public void setDateIssued(String dateIssued) {
		this.dateIssued = dateIssued;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public IRISJournal getJournal() {
		return journal;
	}

	public void setJournal(IRISJournal journal) {
		this.journal = journal;
	}

	public String getFulltextPresence() {
		return fulltextPresence;
	}

	public void setFulltextPresence(String fulltextPresence) {
		this.fulltextPresence = fulltextPresence;
	}

	public String getSsd() {
		return ssd;
	}

	public void setSsd(String ssd) {
		this.ssd = ssd;
	}

	public String getLastModified() {
		return lastModified;
	}

	public void setLastModified(String lastModified) {
		this.lastModified = lastModified;
	}

	public IRISCitation getCitationCount() {
		return citationCount;
	}

	public void setCitationCount(IRISCitation citationCount) {
		this.citationCount = citationCount;
	}

	public List<IRISPerson> getPerson() {
		return person;
	}

	public void setPerson(List<IRISPerson> person) {
		this.person = person;
	}

	public String getStato() {
		return stato;
	}

	public void setStato(String stato) {
		this.stato = stato;
	}

}