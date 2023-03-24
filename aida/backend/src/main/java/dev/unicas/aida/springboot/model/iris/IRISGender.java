package dev.unicas.aida.springboot.model.iris;

import java.math.BigDecimal;

public class IRISGender {

	private BigDecimal id;

	private String description;

	public IRISGender() {
	}

	public IRISGender(BigDecimal id, String description) {
		super();
		this.id = id;
		this.description = description;
	}

	public BigDecimal getId() {
		return id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}