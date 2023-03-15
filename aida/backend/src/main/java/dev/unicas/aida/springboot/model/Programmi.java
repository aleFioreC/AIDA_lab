package dev.unicas.aida.springboot.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Programmi {

	@Id
	private String name;

	private String code;

	private String help;

	public Programmi() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getHelp() {
		return help;
	}

	public void setHelp(String help) {
		this.help = help;
	}

}